import * as express from 'express';

import auth from './auth';
import items from './items';
import users from './users';

const router = express.Router({ mergeParams: true });

router.use('/api/auth', auth);
router.use('/api/items', items);
router.use('/api/users', users);

export default router;
