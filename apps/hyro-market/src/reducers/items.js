import { GET_ITEMS_SUCCESS } from '../actions/items';

export function itemsReducers(state = null, action) {
  switch (action.type) {
    case GET_ITEMS_SUCCESS: {
      return action.response;
    }
    default:
      return state;
  }
}
