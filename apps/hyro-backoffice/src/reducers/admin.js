import Router from 'next/router';

import { DISCONNECT_ADMIN, GET_ADMIN_SUCCESS, GET_ADMIN_FAILURE } from '../actions/admin';

export function adminReducers(state = null, action) {
  switch (action.type) {
    case GET_ADMIN_SUCCESS: {
      return { ...action.response, fetch: true } || state;
    }
    case GET_ADMIN_FAILURE: {
      return { fetch: true };
    }
    case DISCONNECT_ADMIN: {
      Router.reload();
      return null;
    }
    default:
      return state;
  }
}
