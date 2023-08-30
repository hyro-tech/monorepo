import callApi from '../middlewares/callApi';

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export async function getItemsFiltered(filter) {
  try {
    const items = await callApi({
      method: 'GET',
      url: `/items/all`,
      query: filter,
    });

    return {
      type: GET_ITEMS_SUCCESS,
      response: items,
    };
  } catch (err) {
    return {
      type: GET_ITEMS_FAILURE,
    };
  }
}

export async function getItemsRelated(itemId) {
  try {
    const items = await callApi({
      method: 'GET',
      url: `/items/${itemId}/related`,
    });

    return items;
  } catch (err) {
    return [];
  }
}

export const GET_ITEMS_PICTURES_SUCCESS = 'GET_ITEMS_PICTURES_SUCCESS';
export const GET_ITEMS_PICTURES_FAILURE = 'GET_ITEMS_PICTURES_FAILURE';

export async function getItemsPictures(itemId) {
  try {
    const pictures = await callApi({
      method: 'GET',
      url: `/items/${itemId}/pictures`,
    });

    return {
      type: GET_ITEMS_PICTURES_SUCCESS,
      response: pictures,
    };
  } catch (err) {
    return {
      type: GET_ITEMS_PICTURES_FAILURE,
      response: [],
    };
  }
}
