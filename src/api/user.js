import axios from './axios'
const icms = '/cors-icms'

/**
 * 账号登录
 * @param {*} data
 * @returns
 */
export const login = data => {
  return axios({
    url: `${icms}/rbac/sign/in`,
    method: 'post',
    data
  })
}

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return axios({
    url: `${icms}/rbac/sign/out`,
    method: 'delete',
  })
}

