import * as express from 'express';
import multer from 'multer';

import wrapper from '../../utils/wrapper';
import itemsController from './controller';
import { tokenMiddleware } from '../../middlewares';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router({ mergeParams: true });

router.get('/', wrapper(itemsController.getFiltered));

router.get('/:itemId', wrapper(itemsController.getById));

router.get('/:itemId/pictures', wrapper(itemsController.getPictures));

router.patch('/:itemId', tokenMiddleware, wrapper(itemsController.updateById));

router.post('/', tokenMiddleware, wrapper(itemsController.create));

router.post('/:itemId/place/:place', tokenMiddleware, wrapper(itemsController.updatePlaceById));

router.post(
  '/:itemId/picture',
  tokenMiddleware,
  upload.single('file'),
  wrapper(itemsController.uploadPicture),
);

router.delete(
  '/:itemId/picture/:pictureId',
  tokenMiddleware,
  wrapper(itemsController.removePicture),
);

export default router;
