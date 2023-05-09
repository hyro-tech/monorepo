import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';

// eslint-disable-next-line
export function errorHandler(err, req, res, next) {
  if (err.isJoi) {
    console.log(err.details);

    return res.status(BAD_REQUEST).send({
      from: 'Joi',
      ...err.details,
    });
  }

  console.log(err.toString());

  return res.status(err.status || INTERNAL_SERVER_ERROR).send({ err: err.toString() });
}
