import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Home from './home'
import Absolutely from './Absolutely'
import Great from '@/pages/Absolutely/Great'
import Perfect from '@/pages/Absolutely/Perfect'
import Serious from '@/pages/Absolutely/Serious'
import Monday from '@/pages/Appreciate/Monday'
import Tuesday from '@/pages/Appreciate/Tuesday'
import Wednesday from '@/pages/Appreciate/Wednesday'
import Thursday from '@/pages/Appreciate/Thursday'
import loginmain from './loginmain'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      // redirect: '/loginmain',
      children:[
        {
          path:'Great',
          name:'Great',
          component:Great
        },
        {
            path:'Perfect',
            name:'Perfect',
            component:Perfect
        },
        {
            path:'Serious',
            name:'Serious',
            component:Serious
        },
        {
          path:'Monday',
          name:'Monday',
          component:Monday
        },
        {
          path:'Tuesday',
          name:'Tuesday',
          component:Tuesday
        },
        {
          path:'Wednesday',
          name:'Wednesday',
          component:Wednesday
        },
        {
          path:'Thursday',
          name:'Thursday',
          component:Thursday
        },
         ...Home,
      ]
    },
  ]
})
