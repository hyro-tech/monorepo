import { COOKIES_NAMES, getCookie } from '../utils';
import callApi from '../middlewares/callApi';

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
