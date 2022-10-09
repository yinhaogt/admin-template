import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      commit('SET_ROUTES', [])
      resolve([])
      // 向后端请求路由数据
      // getRouters().then(res => {
      //   const accessedRoutes = filterAsyncRouter(res.data)
      //   // accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      //   commit('SET_ROUTES', accessedRoutes)
      //   resolve(accessedRoutes)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
