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
import { MenuItem, Tag, Tree, Upload} from 'element-ui'
//vuex
import store from './vuex/store'


Vue.use(VueRouter);
Vue.use(iView);
Vue.use(ElementUI)
Vue.use(MenuItem)
Vue.use(Tag)
Vue.use(Upload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
