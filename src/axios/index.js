import axios from 'axios'
import { Cache } from '@utils'
import { message } from 'antd'
// const service = axios.create({

// })
message.config({
  maxCount: 1
})
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['access-token'] = Cache.get('pddUserInfo') ? Cache.get('pddUserInfo').token : null
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export const fetchGet = (url, data) => {
  return new Promise(async (resolve, reject) => {
    axios.get(url, { params: data }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const fetchPost = (url, data) => {
  return new Promise(async (resolve, reject) => {
    axios.post(url, data).then(res => {
      if (res.code !== 200) {
        message.error(res.msg)
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}