import { combineReducers } from 'redux';

import { itemsReducers as items } from './items';

export default combineReducers({
  items,
});
