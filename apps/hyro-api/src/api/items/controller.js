import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

import { ItemsRepository } from '../../repositories';
import { S3Service } from '../../services';
import { getSecondUtilEndOfDay } from '../../utils';
import { getItemsModel } from '../../models';
import { isPositiveInteger } from '../../services/number';

async function getAll(req, res) {
  const items = await ItemsRepository.getAll();

  return res.send(items);
}

async function getAllPaginated(req, res) {
  const page = req.query.page ? Number(req.query.page) : 1;
  const count = req.query.count ? Number(req.query.count) : 10;

  if (!isPositiveInteger(page)) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ error: 'page should be a positive integer!' });
  }

  if (!isPositiveInteger(count)) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ error: 'count should be a positive integer!' });
  }

  const categories = req.query.categories ? req.query.categories.split(',') : [];
  const brands = req.query.brands ? req.query.brands.split(',') : [];
  const sizes = req.query.sizes ? req.query.sizes.split(',') : [];
  const colors = req.query.colors ? req.query.colors.split(',') : [];

  const limit = count;
  const skip = (page - 1) * count;

  const filter = {};

  if (categories.length > 0) {
    filter.categories = { $in: categories };
  }

  if (brands.length > 0) {
    filter.brands = { $in: brands };
  }

  if (sizes.length > 0) {
    filter.sizes = { $in: sizes };
  }

  if (colors.length > 0) {
    filter.colors = { $in: colors };
  }

  const ItemsModel = getItemsModel();

  const [data, allDataCount] = await Promise.all([
    ItemsModel.find(filter).limit(limit).skip(skip).sort({ place: 1 }).lean(),
    ItemsModel.find(filter).count(),
  ]);

  const maxPage = Math.ceil(allDataCount / count);

  res.send({
    data,
    maxPage,
  });
}

async function getFiltered(req, res) {
  const items = await ItemsRepository.getFiltered();

  return res.send(items);
}

async function getRelatedItemsById(req, res) {
  const item = await ItemsRepository.getById(req.params.itemId);

  console.log(item);

  if (!item || !item.related_items || item.related_items.split(',').length < 1) {
    return res.status(httpStatus.NOT_FOUND).end();
  }

  const items = [];
  for await (const relatedRef of item.related_items.split(',')) {
    const relatedItem = await ItemsRepository.getByReference(relatedRef);

    const pic = await await S3Service.S3GetPath(relatedItem.images[0].path);

    items.push({ ...relatedItem, picture: pic });
  }

  return res.send(items);
}

async function getById(req, res) {
  const item = await ItemsRepository.getById(req.params.itemId);

  return res.send(item);
}

async function deleteById(req, res) {
  await ItemsRepository.deleteById(req.params.itemId);

  return res.status(httpStatus.OK).end();
}

async function updateById(req, res) {
  const item = await ItemsRepository.updateById(req.params.itemId, req.body);

  return res.send(item);
}

async function updatePlaceById(req, res) {
  const newPlace = parseInt(req.params.place); // Convertir en nombre entier
  const itemId = req.params.itemId;

  const itemToUpdate = await ItemsRepository.getById(itemId);
  const currentPlace = itemToUpdate.place;

  if (newPlace === currentPlace) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ error: 'New place value is the same as the current place' });
  }

  // Mettre à jour les places des autres items
  if (newPlace > currentPlace) {
    // Déplacer l'item vers le bas
    await ItemsRepository.updateMany(
      { place: { $gt: currentPlace, $lte: newPlace } },
      { $inc: { place: -1 } },
    );
  } else {
    // Déplacer l'item vers le haut
    await ItemsRepository.updateMany(
      { place: { $gte: newPlace, $lt: currentPlace } },
      { $inc: { place: 1 } },
    );
  }

  // Mettre à jour la place de l'item spécifique
  await ItemsRepository.updateById(itemId, { place: newPlace });

  const items = await ItemsRepository.getFiltered();

  return res.send(items);
}

async function create(req, res) {
  const place = await ItemsRepository.getMaxPlace();

  const item = await ItemsRepository.createItem({ ...req.body, place });

  await ItemsRepository.updateMany({ place: { $gt: place, $lte: 1 } }, { $inc: { place: -1 } });

  const updatedItem = await ItemsRepository.getById(item._id);

  return res.send(updatedItem);
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
  create,
  getAll,
  getAllPaginated,
  getFiltered,
  getRelatedItemsById,
  getPictures,
  getById,
  deleteById,
  uploadPicture,
  removePicture,
  updateById,
  updatePlaceById,
};
