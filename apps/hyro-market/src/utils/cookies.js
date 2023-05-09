import JsCookies from 'js-cookie';

export const COOKIES_NAMES = {
  token: 'token',
  app_password: 'app_password',
};

export function setCookie(name, value, expires) {
  return JsCookies.set(name, value, { expires });
}

export function getCookie(name) {
  return JsCookies.get(name);
}

export function removeCookie(name) {
  return JsCookies.remove(name);
}

export function actionWithTokenOnly(action) {
  if (!getCookie(COOKIES_NAMES.token)) return false;
  return action();
}
