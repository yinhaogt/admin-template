const routes = [
  {
    name: 'Industry',
    path: '/industry',
    meta: { title: '行业管理', icon: '', affix: false },
    component: () => import('@/views/market/industry')
  }
]
export default routes
