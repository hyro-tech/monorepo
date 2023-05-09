export * from './cookies';
export * from './date';
export * from './imagesLinks';
export * from './paths';

export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

export function diffInHours(dt2, dt1) {
  if (!dt2 || !dt1) return null;
  const diff = dt2.getTime() - dt1.getTime();
  return Math.abs(Math.round(diff / 1000 / 60 / 60));
}

export function datesAreOnSameDay(first, second) {
  if (first.getFullYear() !== second.getFullYear()) return false;
  if (first.getMonth() !== second.getMonth()) return false;
  return first.getDate() === second.getDate();
}

export function removeNullInObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== ''),
  );
}

export const daysList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function monthsMapper(month) {
  return [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ][month];
}
