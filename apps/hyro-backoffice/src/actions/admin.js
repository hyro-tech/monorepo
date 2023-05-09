import { COOKIES_NAMES, getCookie, removeCookie } from '../utils';
import callApi from '../middlewares/callApi';

export const GET_ADMIN_SUCCESS = 'GET_ADMIN_SUCCESS';
export const GET_ADMIN_FAILURE = 'GET_ADMIN_FAILURE';

export async function getAdmin() {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const user = await callApi({
        method: 'GET',
        url: '/users/me',
      });

      return {
        type: GET_ADMIN_SUCCESS,
        response: user,
      };
    } else {
      removeCookie(COOKIES_NAMES.token);

      return {
        type: GET_ADMIN_FAILURE,
      };
    }
  } catch (err) {
    removeCookie(COOKIES_NAMES.token);

    return {
      type: GET_ADMIN_FAILURE,
    };
  }
}

export const DISCONNECT_ADMIN = 'DISCONNECT_ADMIN';

export function disconnectAdmin() {
  removeCookie(COOKIES_NAMES.token);

  return {
    type: DISCONNECT_ADMIN,
  };
}
