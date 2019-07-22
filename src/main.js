// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//iview组件引入
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router';
//elementui组件引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { MenuItem } from 'element-ui'

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(ElementUI)
Vue.use(MenuItem)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
