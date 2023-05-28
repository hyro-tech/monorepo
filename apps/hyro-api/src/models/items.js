import { Schema, model } from 'mongoose';

const ItemsSchema = new Schema(
  {
    reference: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    brands: {
      type: [String],
      required: false,
    },
    categories: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    sizes: {
      type: [String],
      required: false,
    },
    colors: {
      type: [String],
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    rental_price: {
      type: Number,
      required: false,
    },
    commentary: {
      type: String,
      required: false,
    },
    images: {
      type: [
        {
          name: String,
          path: String,
        },
      ],
      required: false,
    },
    available: {
      type: Boolean,
      required: false,
    },
    created_at: {
      type: Date,
      default: () => new Date(),
    },
    updated_at: {
      type: Date,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false },
);

let ItemsModel;
export const connectItemsModel = () => {
  ItemsModel = model('items', ItemsSchema);
  return ItemsModel;
};

export const getItemsModel = () => ItemsModel || connectItemsModel();
