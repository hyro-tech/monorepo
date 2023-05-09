// Converts numeric degrees to radians
function toRad(value) {
  return (value * Math.PI) / 180;
}

export function calcDistance(_lat1, lon1, _lat2, lon2) {
  const R = 6371; // km
  const dLat = toRad(_lat2 - _lat1);
  const dLon = toRad(lon2 - lon1);
  const lat1 = toRad(_lat1);
  const lat2 = toRad(_lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
