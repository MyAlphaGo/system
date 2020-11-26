import axios from "axios";
// import qs from 'qs'
import { notification, message } from "ant-design-vue";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
  521: "用户没有权限（令牌、用户名、密码错误）。"
};

var Axios = axios.create();
Axios.defaults.baseURL = "http://101.37.76.80:9001/os/";
Axios.defaults.withCredentials = true;
Axios.defaults.timeout = 1000;
// Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.headers["Content-Type"] = "application/json";
// 请求拦截
Axios.interceptors.request.use(
  config => {
    config.withCredentials = true;
    if (config.method === "post") {
      config.data = JSON.stringify(config.data);
      // config.params = JSON.stringify(config.params);
      // config.json = JSON.stringify(config.data);
    }

    return config;
  },
  err => {
    Promise.reject(err);
  }
);
// 响应拦截
Axios.interceptors.response.use(
  config => {
    if (config.data.code === 29) {
      //特殊判断
      window.location.href = `${window.location.origin}/login`;
      message.success("用户未登录，请先登录");
      return;
    }
    return { ...config?.data };
  },
  error => {
    const { response } = error;

    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, url } = response;
      if (status === 521) {
        window.location.href = `${window.location.origin}/login`;
        return;
      }
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText
      });
    } else if (!response) {
      notification.error({
        description: "您的网络发生异常，无法连接服务器",
        message: "网络异常"
      });
    }
    // Promise.reject(err);
  }
);
// get封装
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      params,
      method: "get"
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// post封装
export function post(url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method: "post",
      params,
      data
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// delete封装
export function del(url, params = {}, data = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method: "delete",
      params,
      data
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
//   Blob封装,resopnseType:Blob一般是用于文件下载
export function getBlob(url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      method: "get",
      params,
      responseType: "blob"
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  get,
  post,
  del,
  getBlob
};
