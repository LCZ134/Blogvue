export const formatUrlParams = (obj) => {
  var parmsStr = Object.keys(obj)
    .filter(key => filterEmply(obj[key]))
    .map(key => `${key}=${obj[key]}`)
    .join('&');
  return parmsStr ? `?${parmsStr}` : '';
}

function filterEmply(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  } else {
    return !!value;
  }
}