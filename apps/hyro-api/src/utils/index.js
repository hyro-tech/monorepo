export const normalizeString = (str) =>
  str
    ? str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    : '';

export function diffInHours(dt2, dt1) {
  if (!dt2 || !dt1) return null;
  const diff = dt2.getTime() - dt1.getTime();
  return Math.abs(Math.round(diff / 1000 / 60 / 60));
}

export const getSecondUtilEndOfDay = () => {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  return 24 * 60 * 60 - h * 60 * 60 - m * 60 - s;
};
