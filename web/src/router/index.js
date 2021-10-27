import Vue from 'vue'
import Router from 'vue-router'
import quickstart from '@/components/quickstart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'quickstart',
      component: quickstart
    }
  ]})
