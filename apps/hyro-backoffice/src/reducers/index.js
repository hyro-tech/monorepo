import { combineReducers } from 'redux';

import { adminReducers as admin } from './admin';
import { itemsReducers as items } from './items';

export default combineReducers({ admin, items });
