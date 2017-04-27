import Vue from 'vue'
import Router from 'vue-router'

// 引入组建和页面(.vue文件)

import Home from '../views/Home'
import About from '../views/About'
import TLayout from '../views/tourists/Layout'
import TPosts from '../views/tourists/Posts'
import TAbout from '../views/tourists/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TLayout, // TODO 首页重新做
      children: [ {path: 'about', component: About, name: 'about', meta: {title: '关于本站'}}
          ]
    },

    {
      path: '/tou/',
      name: 'touristsPages',
      component: TLayout,
      children: [ {path: 'posts', component: TPosts, name: 'posts', meta: {title: 'all blogs'}},
                  {path: 'about', component: TAbout, name: 'tabout', meta: {title: '关于本站'}}
          
          ]
    }

  ]
})
