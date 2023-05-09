import { UNAUTHORIZED, FORBIDDEN } from 'http-status';
import _ from 'lodash';

import { getUserById } from '../repositories';
import { decodeToken } from '../services';

const TOKEN_REGEX = new RegExp('^Bearer (.*)$');

export async function tokenMiddleware(req, res, next) {
  try {
    const headerAuth = req.get('Authorization');

    const accessToken = _.get(req, 'query.access_token');

    delete req.query.access_token;

    let token = accessToken;

    if (!accessToken && !headerAuth) {
      return res.status(UNAUTHORIZED).end();
    }

    if (!token) {
      // eslint-disable-next-line prefer-destructuring
      token = headerAuth.match(TOKEN_REGEX)[1];
    }

    if (!token) {
      return res.status(UNAUTHORIZED).end();
    }

    const identity = await decodeToken(token);

    if (!identity) {
      return res.status(FORBIDDEN).end();
    }

    const user = await getUserById(identity.user_id);
    if (!user) {
      return res.status(FORBIDDEN).end();
    }

    if (!req.locals) {
      req.locals = {};
    }

    req.locals.user = user;
    req.locals.user_identity = identity;
    req.locals.token = token;
  } catch (error) {
    return res.status(UNAUTHORIZED).send({ message: error.message });
  }

  return next();
}

export default tokenMiddleware;
