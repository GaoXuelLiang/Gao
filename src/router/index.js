import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/pages/main'
import Home from '@/pages/home/home'
import Login from '@/pages/home/login'
import Register from '@/pages/home/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path:"/login",
          name: 'login',
          component: Login
        },
        {
          path:"/register",
          name: 'register',
          component: Register
        }
      ]
    }
  ]
})
