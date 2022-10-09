import axios from 'axios'
import store from '@/store'
import MD5 from 'md5'
import { removeToken } from '@/utils/auth'
import router from '@/router'
import { Message } from 'element-ui'
// axios 配置
const Axios = axios.create({
  timeout: 120 * 1000, // 请求超时时间
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

/**
 * 请求拦截，添加token
 */
Axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = store.getters.token
  }
  return config
})

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status === 200 && res.code === 0) {
      return res
    } else if (res.code === 395) {
      // 无效token时，退出重新登录
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      removeToken()
      router.push('/login')
      return false
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.message)
    }
  },
  error => {
    return Promise.reject(`请求错误：status：${error.response.status}， ${error.response.statusText}`, 'error')
  }
)

function getSysTime() {
  return new Promise(function (resolve) {
    let timeDiff = null
    const key = '__2019022311_sysTimeDiff'
    const localTime = parseInt(Date.now() / 1000)
    try {
      timeDiff = localStorage.getItem(key)
      if (timeDiff && (typeof timeDiff === 'number' || timeDiff.length > 0)) {
        timeDiff = parseInt(timeDiff)
        return resolve(localTime - timeDiff)
      }
    } catch (e) {
      //console.log(e);
    }
    Axios.get('/cors-api/v1/systime').then(function (e) {
      let sysTime = 0
      try {
        sysTime = e.data.currentTime
      } catch (err) {
        sysTime = localTime
      }
      timeDiff = localTime - sysTime
      localStorage.setItem(key, timeDiff)
      resolve(localTime - timeDiff)
    })
  })
}

function randomString(len) {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678oOLl9gqVvUuI1'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

function objectSort(obj) {
  let output = ''
  Object.keys(obj)
    .sort()
    .forEach(function (v) {
      if (v !== 'signature') {
        output += v.toLowerCase() + (obj[v] + '').toLowerCase()
      }
    })
  return output
}

const signature = opt => {
  const url = opt.url
  const params = opt.params || {}
  return getSysTime().then(res => {
    params['timestamp'] = res
    params['nonce'] = randomString()
    params['signature'] = MD5(objectSort(params)).toUpperCase()
    return Axios({
      method: opt.method,
      url,
      headers: Object.assign({ 'content-type': 'application/json;charset=UTF-8' }, opt.headers || {}),
      data: opt.data,
      params
    })
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        alert(error)
        //console.log(error)
      })
  })
}

Axios.signature = signature
export default Axios
