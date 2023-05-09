import * as express from 'express';

import wrapper from '../../utils/wrapper';
import usersController from './controller';
import { joiValidation, tokenMiddleware } from '../../middlewares';
import { createAdminValidation } from './validation';

const router = express.Router({ mergeParams: true });

router.get('/me', tokenMiddleware, wrapper(usersController.me));

router.post(
  '/admin',
  tokenMiddleware,
  joiValidation({ body: createAdminValidation }),
  wrapper(usersController.createAdmin),
);

export default router;
