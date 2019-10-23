export const formatUrlParams = (obj) => {

  obj = obj || {};
  var result = {};

  Object.keys(obj).forEach(key => {
    result[key] = key != 'pageIndex' ? obj[key] : obj[key] - 1;
  });

  var parmsStr = Object.keys(result)
    .filter(key => filterEmply(result[key]))
    .map(key => `${key}=${result[key]}`)
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