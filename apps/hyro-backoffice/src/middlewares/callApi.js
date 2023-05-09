import axios from 'axios';
import merge from 'lodash/merge';

import { COOKIES_NAMES, getCookie } from '../utils';

export const CALL_API = 'call_api';

export function commonAxiosOptions() {
  return {
    baseURL: process.env.apiUrl,
    timeout: 15000,
    headers: {
      Authorization: `Bearer ${getCookie(COOKIES_NAMES.token)}`,
    },
  };
}

export async function callApi(options) {
  //TODO INTERCEPT FORBIDDEN AND REDIRECT

  const { data } = await axios(merge(commonAxiosOptions(), options));

  return data;
}

export default callApi;
