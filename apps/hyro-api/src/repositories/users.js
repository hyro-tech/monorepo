import _ from 'lodash';
import { userRolesType } from 'lib-enums';

import { getUsersModel } from '../models';

function parseUser(user, pick = []) {
  if (user) {
    return {
      ..._.omit(user, ['password']),
      ..._.pick(user, pick),
    };
  }
  return null;
}

export async function getUser(filter, pick) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.findOne(filter).lean();

  return parseUser(user, pick);
}

export async function getUserById(id) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.findById(id).lean();

  return parseUser(user);
}

export async function createUserAdmin(payload) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.create({
    first_name: payload.first_name,
    last_name: payload.last_name,
    password: payload.password,
    email: payload.email,
    role: userRolesType.admin,
  });

  return parseUser(user);
}

export async function updateUserById(id, changes) {
  const UsersModel = getUsersModel();

  const user = await UsersModel.findOneAndUpdate({ _id: id }, changes, { new: true });

  return parseUser(user);
}
