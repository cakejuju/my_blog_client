import Vue from 'vue'
import Router from 'vue-router'

// 引入组建和页面(.vue文件)

import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'
import TLayout from '../views/tourists/Layout'
import TPosts from '../views/tourists/Posts'
import TAbout from '../views/tourists/About'
import TPost from '../views/tourists/Post' // 单个post
import PostsTwoColumns from '../views/tourists/PostsThreeColumns' // 每行三列的post


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TLayout
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/tou/',
      name: 'touristsPages',
      component: TLayout,
      children: [ {path: 'posts', component: TPosts, name: 'posts', meta: {title: 'all blogs'}},
                  {path: 'posts/three_columns', component: PostsTwoColumns, name: 'postsThreeColumns', meta: {title: 'postsThreeColumns'}},
                  {path: 'about', component: TAbout, name: 'tabout', meta: {title: '关于本站'}},
                  {path: 'posts/:id', component: TPost, name: 'postDetail', meta: {title: '内容'}},
          
          ]
    }

  ]
})
