function isPlural(interval: number, format: string): string {
  return Math.floor(interval) > 1 ? format + 's' : format;
}

function dateFormatter(date: string, now: number) {
  const msgDate = new Date(date).valueOf();
  const ms: number = now - msgDate;

  let interval = ms / 31536000000;

  if (interval > 1)
    return `${Math.floor(interval)} ${isPlural(interval, 'year')} ago`;

  interval = ms / 2592000000;
  if (interval > 1)
    return `${Math.floor(interval)} ${isPlural(interval, 'month')} ago`;

  interval = ms / 86400000;
  if (interval > 1)
    return `${Math.floor(interval)} ${isPlural(interval, 'day')} ago`;

  interval = ms / 3600000;
  if (interval > 1)
    return `${Math.floor(interval)} ${isPlural(interval, 'hour')} ago`;

  interval = ms / 60000;
  if (interval > 1)
    return `${Math.floor(interval)} ${isPlural(interval, 'minute')} ago`;

  // interval = ms / 1000;
  // if (interval > 1)
  //   return `${Math.floor(interval)} ${isPlural(interval, 'second')} ago`;

  return 'Just now';
}

export default dateFormatter;
