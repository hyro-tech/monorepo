import Joi from 'joi';

export const createAdminValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});
