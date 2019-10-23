import api from '@/api/index'
import { formatUrlParams } from '@/utils'
import { Message } from 'element-ui';

function SubmintFromData({ url, data, methods, success }) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  api[methods](
    url,
    formData,
    res => {
      if (res.statusCode != 0) {
        Message({ message: res.result, type: 'error' });
      } else {
        if (typeof success === 'function')
          success(res);
      }
    }
  )
}

export default {
  SubmintFromData
}