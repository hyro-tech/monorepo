import { getHackModel } from '../models';

export function updateHack(changes) {
  const HackModel = getHackModel();

  return HackModel.findOneAndUpdate({ _id: '647e5d94466933ec2c994912' }, changes, {
    new: true,
  }).lean();
}

export async function getHack() {
  const HackModel = getHackModel();

  return HackModel.findById('647e5d94466933ec2c994912').lean();
}
