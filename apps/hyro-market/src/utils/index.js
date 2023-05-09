export * from './distances';
export * from './cookies';
export * from './ctx';
export * from './date';
export * from './imagesLinks';
export * from './paths';

export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

export const daysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function calculAverage(a) {
  if (!a) return 0;

  let b = a.length,
    c = 0,
    i;
  for (i = 0; i < b; i++) {
    c += Number(a[i]);
  }
  return c / b;
}
