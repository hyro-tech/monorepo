import { COOKIES_NAMES, getCookie } from '../utils';
import callApi from '../middlewares/callApi';

export async function getHack() {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const hack = await callApi({
        method: 'GET',
        url: `/hack`,
      });

      return hack;
    }
  } catch (err) {
    return null;
  }
}

export async function updateHack(changes) {
  try {
    const token = getCookie(COOKIES_NAMES.token);

    if (token) {
      const hack = await callApi({
        method: 'POST',
        url: `/hack`,
        data: changes,
      });

      return hack;
    }
  } catch (err) {
    return [];
  }
}
