import { compile } from 'vue-template-compiler'
import { Message } from 'element-ui';

// 配置API接口地址
var root = '/api'
  // 引用axios
var axios = require('axios')
  // 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios(method, url, params, success, failure) {
  axios({
      method: method,
      url: url,
      params: method == 'GET' || method == 'DELETE' ? params : null,
      data: method == 'POST' || method == 'PUT' || method == 'Patch' ? params : null,
      baseURL: root,
      withCredentials: false,
    })
    .then(function(res) {
      success(res.data);
    })
    .catch(function(err) {
      let res = err.response
      if (err) {
        // Message({ message: `请求出错${ res.status}`, type: 'error' });

        // if (failure == null || typeof failure === 'undefined' || typeof failure !== 'function') {
        //   Message({ message: `请求出错`, type: 'error' });
        // } else {
        if (typeof failure === 'function') failure(res);
        // }
      }
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function(url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function(url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  patch: function(url, params, success, failure) {
    return apiAxios('Patch', url, params, success, failure)
  },
  put: function(url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function(url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}