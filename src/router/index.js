import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main'
import Home from './home'
import Absolutely from './Absolutely'
import Great from '@/pages/Absolutely/Great'
import Perfect from '@/pages/Absolutely/Perfect'
import Serious from '@/pages/Absolutely/Serious'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
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
         ...Home,
      ]
    },
  ]
})
