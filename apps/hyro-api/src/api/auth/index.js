import express from 'express';

import { joiValidation } from '../../middlewares';
import authController from './controller';
import { authenticateValidation, userSignUpValidation } from './validation';
import wrapper from '../../utils/wrapper';

const router = express.Router({ mergeParams: true });

router.post('/', joiValidation({ body: authenticateValidation }), wrapper(authController.signIn));

router.post(
  '/admin/register',
  joiValidation({ body: userSignUpValidation }),
  wrapper(authController.adminSignUp),
);

export default router;
