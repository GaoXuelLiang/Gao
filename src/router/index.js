import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Home from './home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },

    ...Home,
     
    
  ]
})
