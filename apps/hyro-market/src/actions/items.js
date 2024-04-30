import callApi from '../middlewares/callApi';

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export async function getItemsFiltered(filter, page) {
  const params = {
    page,
    count: 12,
  }

  if (filter.categories.length > 0) {
    params.categories = filter.categories.join(',');
  }

  if (filter.brands.length > 0) {
    params.brands = filter.brands.join(',');
  }

  if (filter.sizes.length > 0) {
    params.sizes = filter.sizes.join(',');
  }

  if (filter.colors.length > 0) {
    params.colors = filter.colors.join(',');
  }

  try {
    const items = await callApi({
      method: 'GET',
      url: `/items/paginated`,
      params,
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
