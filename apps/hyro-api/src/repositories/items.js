import { getItemsModel } from '../models';

async function createItem(payload) {
  const ItemsModel = getItemsModel();

  return ItemsModel.create({
    ...payload,
    images: [],
  });
}

async function getFiltered() {
  const ItemsModel = getItemsModel();

  return ItemsModel.find({}).lean();
}

async function getById(itemId) {
  const ItemsModel = getItemsModel();

  return ItemsModel.findById(itemId).lean();
}

async function updateById(itemId, changes) {
  const ItemsModel = getItemsModel();

  return ItemsModel.findOneAndUpdate({ _id: itemId }, changes, { new: true }).lean();
}

export const ItemsRepository = {
  createItem,
  getFiltered,
  getById,
  updateById,
};
