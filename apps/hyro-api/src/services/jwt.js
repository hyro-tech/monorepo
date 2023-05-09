import jwt from 'jsonwebtoken';

import configs from '../configs';

/**
 * Method to create a json web token
 * crypts and places infos in the jwt payload
 * returns the token
 *
 * @param {object} infos
 * @return {string}
 */
export function createToken({ issuerId, userId, role, givenName }) {
  return jwt.sign(
    {
      issuer_id: String(issuerId || userId),
      user_id: String(userId),
      role,
      givenName,
    },
    configs.services.jwt.secret,
    {
      issuer: 'noname-api',
      audience: 'noname-front',
      expiresIn: configs.services.jwt.duration,
    },
  );
}

/**
 * Method to verify a token
 * returns the token payload if the token is valid
 * else throws an error
 *
 * @param {string} token
 * @return {object} payload or error
 */
export function verifyToken(token) {
  return jwt.verify(token, configs.services.jwt.secret);
}

/**
 * Decode token
 *
 * @param {string} token
 * @return {object}
 */
export function decodeToken(token) {
  return jwt.decode(token);
}

/**
 * Check if a token is expired
 *
 * @param {string} token
 * @return {boolean}
 */
export function isExpiredToken(token) {
  const payload = jwt.decode(token);
  return new Date() >= payload.exp * 1000;
}
