import Vue from 'vue'
import Router from 'vue-router'
// 引入组建和页面(.vue文件)
// import Hello from '../components/Hello'
// import World from '../components/World'

import Home from '../views/Home'
import About from '../views/About'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [ {path: 'about', component: About, name: 'about', meta: {title: '关于本站'}}
      ]
    }
  ]
})
