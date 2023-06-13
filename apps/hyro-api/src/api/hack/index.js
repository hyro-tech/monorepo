import * as express from 'express';

import wrapper from '../../utils/wrapper';
import hackController from './controller';
import { tokenMiddleware } from '../../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', wrapper(hackController.get));

router.post('/', tokenMiddleware, wrapper(hackController.update));

export default router;
