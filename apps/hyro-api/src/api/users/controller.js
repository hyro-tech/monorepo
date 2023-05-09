import httpStatus from 'http-status';
import { userRolesType } from 'lib-enums';

import { createUserAdmin } from '../../repositories';
import { encode } from '../../services';

async function me(req, res) {
  return res.send(req.locals.user);
}

async function createAdmin(req, res) {
  const { user } = req.locals;

  if (user.role !== userRolesType.admin) {
    return res.status(httpStatus.FORBIDDEN).end();
  }

  const passwordHash = await encode(req.body.password);

  const admin = await createUserAdmin({ ...req.body, password: passwordHash });
  if (!admin) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.send(admin);
}

export default {
  me,
  createAdmin,
};
