import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// 引入组建和页面(.vue文件)

import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'
import AdminLogin from '../views/admin/Login'
import TLayout from '../views/tourists/Layout'
import TPosts from '../views/tourists/Posts'
import TAbout from '../views/tourists/About'
import TPost from '../views/tourists/Post' // 单个post
import PostsTwoColumns from '../views/tourists/PostsThreeColumns' // 每行三列的post


Router.prototype.readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
} 


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
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
      beforeEnter: (to, from, next) => {
        // 判断是否已经登陆
        if (this.a.readCookie('jwt') === null) {
          next()
        }else{
          // 已经登陆则跳转到首页
          next('/tou/posts')
        }

      }
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


