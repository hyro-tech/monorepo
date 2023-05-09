import Joi from 'joi';

export const updateMeValidation = Joi.object({
  pseudo: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  phone: Joi.string(),
});
