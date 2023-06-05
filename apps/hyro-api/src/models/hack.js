import { Schema, model } from 'mongoose';

const HackSchema = new Schema(
  {
    brands: {
      type: [String],
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
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

let HackModel;
export const connectHackModel = () => {
  HackModel = model('hack', HackSchema);
  return HackModel;
};

export const getHackModel = () => HackModel || connectHackModel();
