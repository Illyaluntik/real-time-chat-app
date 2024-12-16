function generateUserColor(username: string) {
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < username.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export default generateUserColor;
