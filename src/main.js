// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 这个文件基本可以不改
import Vue from 'vue'

import {
    Popover,
    Button,
    Upload,
    Dialog
} from 'element-ui';
Vue.use(Popover)
Vue.use(Button)
Vue.use(Upload)
Vue.use(Dialog)

import axios from 'axios'     // send ajax
import App from './App'       // 因为有vue loader 所以能自动加载App.vue的文件

import Vuex from 'vuex'       // 状态管理
import store from './store'   // support of 状态管理

import router from './router' // 先找到 router 文件夹, 若其中有index.js文件,会自动引入
import Vuetify from 'vuetify' // 组件库

import './assets/vue_strengthen' // 挂载在 vue 的所有方法

// css import 顺序不可变化
import './assets/stylesheets/icons.css' // vuetify icons
import './assets/stylesheets/vuetify.min.css' // vuetify css


Vue.use(Vuex)
Vue.use(Vuetify)  // 使用 vuetify 作为组件库

Vue.config.productionTip = false
Vue.prototype.axios = axios  //用来发送ajax 


/* eslint-disable no-new */
// 下方约定太多 所以可以不细看
var MyPost = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',  
  components: { App } // 根组件
})
