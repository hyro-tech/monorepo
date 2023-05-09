export function displayDate(moment) {
  const date = new Date(moment);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  return day + '/' + month + '/' + year;
}

export function displayDay(moment, explicit = false) {
  const date = new Date(moment).setHours(0, 0, 0, 0);

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const day = new Date(date).getDay();

  if (explicit && new Date(date).toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  }

  return (
    ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][day] +
    ' ' +
    new Date(date).getDate()
  );
}

export function isSameDay(date1, date2) {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  ) {
    return true;
  } else {
    return false;
  }
}

export function getTimeFromHourAndDuration(startHour = 0, startMin = 0, durationInMin = 0) {
  const hourInMin = startHour * 60 + startMin;
  const hour = hourInMin + durationInMin;

  return `${Math.floor(hour / 60)}:${hour % 60 === 0 ? '00' : hour % 60}`;
}
