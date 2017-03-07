import Vue from 'vue'
import Router from 'vue-router'
import list from 'components/repoList'
import about from 'components/about'
import detail from 'components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'repoList',
      component: list
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/detail/:repoName',
      name: 'detail',
      component: detail
    }
  ]
})
