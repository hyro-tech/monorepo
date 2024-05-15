import { getItemsModel } from '../models';

function createItem(payload) {
  const ItemsModel = getItemsModel();

  return ItemsModel.create({
    ...payload,
    images: [],
  });
}

function get(filter) {
  const ItemsModel = getItemsModel();

  return ItemsModel.find(filter).sort({ place: 1 }).lean();
}

function getAll() {
  const ItemsModel = getItemsModel();

  return ItemsModel.find({}).sort({ place: 1 }).lean();
}

function getFiltered() {
  const ItemsModel = getItemsModel();

  return ItemsModel.find({
    $or: [{ is_hidden: false }, { is_hidden: { $exists: false } }],
  })
    .sort({ place: 1 })
    .lean();
}

function getByReference(ref) {
  const ItemsModel = getItemsModel();

  return ItemsModel.findOne({ reference: ref }).lean();
}

function getById(itemId) {
  const ItemsModel = getItemsModel();

  return ItemsModel.findById(itemId).lean();
}

function deleteById(itemId) {
  const ItemsModel = getItemsModel();

  return ItemsModel.findOneAndDelete({ _id: itemId });
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

function searchItem(q) {
  const ItemsModel = getItemsModel();

  return ItemsModel.find({ $text: { $search: q } })
    .limit(10)
    .lean();
}

export const ItemsRepository = {
  get,
  createItem,
  getAll,
  getFiltered,
  deleteById,
  getMaxPlace,
  getById,
  getByReference,
  updateById,
  updateMany,
  searchItem,
};
