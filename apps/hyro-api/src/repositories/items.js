import { getItemsModel } from '../models';

function createItem(payload) {
  const ItemsModel = getItemsModel();

  return ItemsModel.create({
    ...payload,
    images: [],
  });
}

function getFiltered() {
  const ItemsModel = getItemsModel();

  return ItemsModel.find({}).lean();
}

function getById(itemId) {
  const ItemsModel = getItemsModel();

  return ItemsModel.findById(itemId).lean();
}

async function getMaxPlace() {
  const ItemsModel = getItemsModel();

  const maxPlaceItem = await ItemsModel.findOne({}, { place: 1 }).sort({ place: -1 }).limit(1);

  return maxPlaceItem ? maxPlaceItem.place + 1 : 1;
}

function updateById(itemId, changes) {
  const ItemsModel = getItemsModel();

  return ItemsModel.findOneAndUpdate({ _id: itemId }, changes, { new: true }).lean();
}

function updateMany(filter, changes) {
  const ItemsModel = getItemsModel();

  return ItemsModel.updateMany(filter, changes).lean();
}

export const ItemsRepository = {
  createItem,
  getFiltered,
  getMaxPlace,
  getById,
  updateById,
  updateMany,
};
