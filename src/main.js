// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'       // 因为有vue loader 所以能自动加载App.vue的文件
import router from './router' // 先找到 router 文件夹, 若其中有index.js文件,会自动引入

Vue.config.productionTip = false
Vue.prototype.axios = axios  //用来发送ajax
 
/* eslint-disable no-new */
// 这个文件基本可以不改
// 因为约定太多 所以可以不细看

new Vue({
  el: '#app',
  router,
  template: '<App/>',  
  components: { App } // 根组件
})
