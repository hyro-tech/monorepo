import {
  GET_ITEMS_SUCCESS,
  ADD_ITEMS_PICTURE_SUCCESS,
  REMOVE_ITEMS_PICTURE_SUCCESS,
} from '../actions/items';

export function itemsReducers(state = null, action) {
  switch (action.type) {
    case ADD_ITEMS_PICTURE_SUCCESS:
    case REMOVE_ITEMS_PICTURE_SUCCESS:
    case GET_ITEMS_SUCCESS: {
      return action.response || state;
    }
    default:
      return state;
  }
}
