import {
  GET_ITEMS_SUCCESS,
  ADD_ITEMS_PICTURE_SUCCESS,
  REMOVE_ITEMS_PICTURE_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  CREATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from '../actions/items';

export function itemsReducers(state = { data: [], maxPage: 1 }, action) {
  switch (action.type) {
    case ADD_ITEMS_PICTURE_SUCCESS:
    case REMOVE_ITEMS_PICTURE_SUCCESS: {
      return {
        ...state,
        data: action.response || state.data,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return action.response || state;
    }
    case UPDATE_ITEM_SUCCESS: {
      if (!action.response) return state;
      return {
        ...state,
        data: state.data.map((item) => (item._id === action.response._id ? action.response : item)),
      };
    }
    case DELETE_ITEM_SUCCESS: {
      if (!action.response?._id) return state;
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.response._id),
      };
    }
    case CREATE_ITEM_SUCCESS: {
      if (!action.response) return state;
      return {
        ...state,
        data: [action.response, ...state.data],
      };
    }
    default:
      return state;
  }
}
