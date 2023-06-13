import {
  GET_ITEMS_SUCCESS,
  ADD_ITEMS_PICTURE_SUCCESS,
  REMOVE_ITEMS_PICTURE_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  CREATE_ITEM_SUCCESS,
} from '../actions/items';

export function itemsReducers(state = null, action) {
  switch (action.type) {
    case ADD_ITEMS_PICTURE_SUCCESS:
    case REMOVE_ITEMS_PICTURE_SUCCESS:
    case GET_ITEMS_SUCCESS: {
      return action.response || state;
    }
    case UPDATE_ITEM_SUCCESS: {
      if (!action.response) return state;
      return state.map((item) => (item._id === action.response._id ? action.response : item));
    }
    case CREATE_ITEM_SUCCESS: {
      if (!action.response) return state;
      return [action.response, ...state];
    }
    default:
      return state;
  }
}
