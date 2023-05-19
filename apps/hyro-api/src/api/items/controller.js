import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

import { ItemsRepository } from '../../repositories';
import { S3Service } from '../../services';
import { getSecondUtilEndOfDay } from '../../utils';

async function getFiltered(req, res) {
  const items = await ItemsRepository.getFiltered();

  return res.send(items);
}

async function getById(req, res) {
  const item = await ItemsRepository.getById(req.params.itemId);

  return res.send(item);
}

async function updateById(req, res) {
  const item = await ItemsRepository.updateById(req.params.itemId, req.body);

  return res.send(item);
}

async function getPictures(req, res) {
  const item = await ItemsRepository.getById(req.params.itemId);
  if (!item) {
    return res.status(httpStatus.NOT_FOUND).end();
  }

  const pictures = [];
  for await (const image of item.images) {
    const path = await S3Service.S3GetPath(image.path);
    pictures.push({ ...image, path });
  }

  return res.send(pictures);
}

async function uploadPicture(req, res) {
  const file = req.file;

  const item = await ItemsRepository.getById(req.params.itemId);
  if (!item) {
    return res.status(httpStatus.NOT_FOUND).end();
  }

  if (!file) {
    return res.status(httpStatus.BAD_REQUEST).end();
  }

  const pictureId = await uuidv4();

  const documentKey = `items/${req.params.itemId}/picture/${pictureId}`;

  await S3Service.S3Upload(file, documentKey);

  const newImages = item.images;
  newImages.push({
    name: file.name,
    path: documentKey,
  });

  const updatedItem = await ItemsRepository.updateById(req.params.itemId, {
    images: newImages,
  });

  return res.send(updatedItem);
}

async function removePicture(req, res) {
  const item = await ItemsRepository.getById(req.params.itemId);
  if (!item) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Item not found' });
  }

  const picture = item.images.find((pic) => String(pic._id) === req.params.pictureId);
  if (!picture) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Picture not found' });
  }

  await S3Service.S3Remove(picture.path, getSecondUtilEndOfDay());

  const newPictures = item.images.filter((pic) => String(pic._id) !== req.params.pictureId);

  const updatedItem = await ItemsRepository.updateById(req.params.itemId, {
    images: newPictures,
  });

  return res.send(updatedItem);
}

export default {
  getFiltered,
  getPictures,
  getById,
  uploadPicture,
  removePicture,
  updateById,
};
