import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  /**
   * 登录
   */
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    let param = new URLSearchParams();
    param.append("account", username);
    param.append("password", password);
    return new Promise((resolve, reject) => {
      login(param).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      /**
       * 存储用户信息的，可能不需要，不需要就不用动
       */
      commit('SET_ROLES', ['has_roles'])
      commit('SET_NAME', 'name')
      commit('SET_AVATAR', 'avatar')
      commit('SET_INTRODUCTION', 'introduction')
      resolve({ roles: ['has_roles'] })
    })
  },

  /**
   * 退出登录
   * @param {*}
   * @returns
   */
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        sessionStorage.clear()
        removeToken()
        resetRouter()
        resolve()
      })
        .catch(error => {
          reject(error)
        })
    })
  },


  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
