import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import TaskDetail from './views/TaskDetail.vue'
import Mark from './views/Mark.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/taskdetail',
      name: 'taskdetail',
      component: TaskDetail
    },
    {
      path: '/mark',
      name: 'mark',
      component: Mark
    }
  ]
})
