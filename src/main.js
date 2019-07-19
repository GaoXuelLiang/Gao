// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router';
//import App from 'components/app.vue';
//import Routers from './router.js';
Vue.use(VueRouter);
Vue.use(iView);

// const RouterConfig = {
//   routes: Routers
// };
//const router = new VueRouter(RouterConfig);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
