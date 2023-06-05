import httpStatus from 'http-status';
import { userRolesType } from 'lib-enums';

import { updateHack, getHack } from '../../repositories';

async function get(req, res) {
  const hack = await getHack();

  return res.send(hack);
}

async function update(req, res) {
  const { user } = req.locals;

  if (user.role !== userRolesType.admin) {
    return res.status(httpStatus.FORBIDDEN).end();
  }

  const hack = await updateHack(req.body);

  return res.send(hack);
}

export default {
  get,
  update,
};
