import bcrypt from 'bcrypt';

import configs from '../configs';

export function encode(value) {
  return bcrypt.hash(value, parseInt(configs.services.bcrypt.salt_rounds, 10));
}

export function compare(value, hash) {
  return bcrypt.compare(value, hash);
}
