import { COOKIES_NAMES, getCookie } from '../utils';
import callApi from '../middlewares/callApi';

export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export async function createItem(data) {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const item = await callApi({
        method: 'POST',
        url: `/items`,
        data,
      });

      return {
        type: UPDATE_ITEM_SUCCESS,
        response: item,
      };
    }
  } catch (err) {
    return {
      type: UPDATE_ITEM_FAILURE,
    };
  }
}

export async function updateItem(itemId, data) {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const item = await callApi({
        method: 'PATCH',
        url: `/items/${itemId}`,
        data,
      });

      return {
        type: UPDATE_ITEM_SUCCESS,
        response: item,
      };
    }
  } catch (err) {
    return {
      type: UPDATE_ITEM_FAILURE,
    };
  }
}

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export async function getItemsFiltered(filter) {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const items = await callApi({
        method: 'GET',
        url: `/items`,
        query: filter,
      });

      return {
        type: GET_ITEMS_SUCCESS,
        response: items,
      };
    }
  } catch (err) {
    return {
      type: GET_ITEMS_FAILURE,
    };
  }
}

export const GET_ITEMS_PICTURES_SUCCESS = 'GET_ITEMS_PICTURES_SUCCESS';
export const GET_ITEMS_PICTURES_FAILURE = 'GET_ITEMS_PICTURES_FAILURE';

export async function getItemsPictures(itemId) {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const pictures = await callApi({
        method: 'GET',
        url: `/items/${itemId}/pictures`,
      });

      return {
        type: GET_ITEMS_PICTURES_SUCCESS,
        response: pictures,
      };
    }
  } catch (err) {
    return {
      type: GET_ITEMS_PICTURES_FAILURE,
      response: [],
    };
  }
}

export const ADD_ITEMS_PICTURE_SUCCESS = 'ADD_ITEMS_PICTURE_SUCCESS';
export const ADD_ITEMS_PICTURE_FAILURE = 'ADD_ITEMS_PICTURE_FAILURE';

export async function addItemsPicture(itemId, data) {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const item = await callApi({
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        url: `/items/${itemId}/picture`,
        data,
      });

      return {
        type: ADD_ITEMS_PICTURE_SUCCESS,
        response: item,
      };
    }
  } catch (err) {
    return {
      type: ADD_ITEMS_PICTURE_FAILURE,
      response: null,
    };
  }
}

export const REMOVE_ITEMS_PICTURE_SUCCESS = 'REMOVE_ITEMS_PICTURE_SUCCESS';
export const REMOVE_ITEMS_PICTURE_FAILURE = 'REMOVE_ITEMS_PICTURE_FAILURE';

export async function removeItemsPicture(itemId, pictureId) {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const item = await callApi({
        method: 'DELETE',
        url: `/items/${itemId}/picture/${pictureId}`,
      });

      return {
        type: REMOVE_ITEMS_PICTURE_SUCCESS,
        response: item,
      };
    }
  } catch (err) {
    return {
      type: REMOVE_ITEMS_PICTURE_FAILURE,
      response: null,
    };
  }
}
