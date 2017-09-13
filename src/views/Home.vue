<template>

  <v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar :left-fixed-sidebar="sidebar">
    <v-toolbar  class="red" fixed>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-title class="hidden-sm-and-down">Joey's Blog</v-toolbar-title>
      <v-text-field  v-model="query" prepend-icon="search" label="可按标签或标题搜索..." hide-details single-line dark></v-text-field>

      <!-- 登陆以及登出 -->
      <v-chip v-if="!$store.state.currentMember.logged" @click.native="login"  label class="primary white--text" >登陆</v-chip>
      <el-popover ref="logout" placement="bottom" width="350" trigger="click" >
        <v-card class="grey--text text--darken-2" v-show="$store.state.currentMember.logged">
          <v-list three-line>
            <template>
              <v-list-item>
                <v-list-tile avatar>
                  <v-list-tile-avatar style="width: 120px;height: 120px;">
                    <img style="width: 102px;height: 94px;margin-left:-10px;margin-right:10px" v-bind:src="$store.state.currentMember.head_img_url"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="$store.state.currentMember.nickname"/>
                    <v-list-tile-sub-title v-html="$store.state.currentMember.email"/>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
               <v-divider/>
              <v-list-tile-content>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-chip @click.native="logout()"  label class="grey--text text--dark-4" >登出</v-chip>
              </v-list-tile-action>
            </template>
          </v-list>
        </v-card>
      </el-popover>

      <button v-show="$store.state.currentMember.logged" v-popover:logout>
        <img v-bind:src="$store.state.currentMember.head_img_url" style="height: 42px;width: 42px;border-radius: 50%;"/>
      </button>
    </v-toolbar>
    
    <main>
      <!-- 侧边栏 -->
      <v-sidebar class="grey lighten-2" left fixed v-model="sidebar" height="100%">
        <v-list dense>
          <v-list-item v-for="(item,i) in items" :key="item.title">
            <v-divider v-if="item.divider" />
            <v-list-tile style="margin:15px 5px" router :href="item.href">
              <v-list-tile-avatar >
                <v-icon medium class="grey--text text--darken-2">{{ item.avatar }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title style="font-size:14px;font-weight: 500;" class="grey--text text--darken-4" v-text="item.title"/>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
        <div class="text-xs4right" style="position: fixed;left: 15px;bottom: 10px">© 2017  Joey</div>
      </v-sidebar>

      <!-- <router-view style="margin-top:80px;width:100%" ></router-view> -->
      <div id="post_picture" class="masonry" style="margin-top:80px;width:100%">

        <div v-for="post in posts" :key="post.id">
          <post-card  :item="post" class="item" @tagClicked="tagClicked">
            
          </post-card>
        </div>

      </div>
    </main>

    <v-dialog  v-model="loginCardDisplay" > 
      <login-card  @loggedIn="LoggedIn"></login-card>
    </v-dialog>

  </v-app>

</template>

<script>
var marked = require('marked'); // 引入marked (markdown to html)
import PostCard from './components/PostCard'
import LoginCard from './Login'

export default {
  name: '',
  data () {
    return {    
      sidebar: true,
      items:[], // 在 mounted 函数中加载
      loginCardDisplay: false,
      adminSideBar: [{title: '文章管理', avatar: 'pets', divider: false, href: '/admin/posts'},
                     {title: '云图片管理', avatar: 'photo_library', divider: false, href: '/admin/cloud_images'}],
      query: '',
      posts: [],
      clickedTag: {},
      queryString: '' // 全局搜索的内容

    }
  },
  components: {
    'post-card': PostCard,
    'login-card': LoginCard
  },
  created () {
    this.marked = marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs ',
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
      }
    })
  },
  methods: {
    navigate(url){
      this.$router.push(url)
    },
    LoggedIn(){
      this.loginCardDisplay = false
    },
    login(e){
      let jwt = this.readCookie('jwt')
      // 登陆后 post 请求创建 comment
      if (jwt === '' || jwt === null) {
        e.stopPropagation() 
        this.loginCardDisplay = true
      }
    },
    logout(){
      this.createCookie('jwt','', 0.00000001)
      this.$store.commit('flushMember')
    },
    tagClicked(id, name){
      this.$emit('tagClicked', id, name)
    },
    getPosts(params){
      this.axios.post('/api/get_posts', params)    
        .then((response) => {   
          let posts = response.data.json_data
          for(let i = 0; i < posts.length; i++){
            let content = posts[i].content
            let l_content = posts[i].l_content
            if (l_content != undefined) {
              posts[i].content = marked(content)

              posts[i].l_content = marked(content)
            }
          } 
          this.posts = posts
          console.log(this.posts)

      })    
    },
    queryTagPost(){
      this.getPosts(this.queryParams())
    },
    initView(){
     let order_params = {sort_by: 'created_at', order: 'DESC'}
     let query_params = {limit:30, current_page: 1, 
                         order_params: order_params}
     this.getPosts(query_params)
    },
    tagAdded(id, name){
      this.clickedTag[name] = id
      this.queryTagPost()
    },
    tagRemoved(name){
      delete this.clickedTag[name]
      this.queryTagPost()
    },
    queryParams(){
      let related_object = {through_model: 'Pt', 
                            related_model: 'Tag',
                            key: 'tag_id', 
                            value: Object.values(this.clickedTag), 
                            group: 'post_id'}
      let order_params = {sort_by: 'created_at', order: 'DESC'}
      let query_params = {limit:          30, 
                          current_page:   1,
                          order_params:   order_params,
                          related_object: related_object,
                          queryString: this.queryString}
      return query_params;
   }


  },
  watch: {
    query: function (val) {
      this.$store.commit('setQuery', val)
    },

  },
  mounted: function () {
    this.$store.watch(this.$store.getters.getQuery, query => {
      this.queryString = query
      this.queryTagPost()
    })

    this.initView()
    // 根据是否为管理者加载侧边栏
    let items = [
                 {title: '首页', avatar: 'home', divider: false, href: '/tou/posts'},
                 {title: '关于本站', avatar: 'face', divider: false, href: '/tou/about'},
                 {title: '建设中...', avatar: 'build', divider: true, href: '/'} ]

    // the store of vuex will be empty after page refresh 
    // 若在 vuex 中 currentMember logged 部位 true 
    // 说明页面被刚重定向过
    if (!this.$store.state.currentMember.logged) {
      let jwt = this.readCookie('jwt')
      // 判断 cookie 中的 jwt 
      // 若有 则说明已经登陆过但刷新了页面 (单页不用刷新的呀) 
      // 重新获得用户信息并 store
      if (jwt != '' && jwt != null) {
        this.axios.post('/api/member/currentMember', {})    
          .then((response) => {   
            let res = response.data
            if (res.success === 1) {
              if (res.current_member.is_master) {
                let adminSideBar = this.adminSideBar
                items = adminSideBar.concat(items);
                this.items = items
              }
              this.$store.commit('setMember', res.current_member)
              // console.log(res.current_member)
            }  
        }) 
      }
    }else{
      let jwt = this.readCookie('jwt')
      if (this.$store.state.currentMember.is_master && jwt != '' && jwt != null) {
          let adminSideBar = this.adminSideBar
          items = adminSideBar.concat(items);
      }  
    }

    this.items = items  
  }
}


</script>


<style lang='scss' scoped>

  #post_picture {
    height: 100%;
  }
  .masonry {
    column-gap: 1.5rem;
    column-count: 3;

    .item {
      display: inline-block;
      background: #fff;
      margin: 0 0 1em;

      width: 100%;
    }
  }

  @media all and (max-width: 1300px) {
    .masonry {
      column-count: 2;
    }
  }

  @media all and (max-width: 676px) {
    .masonry {
      column-count: 1;
    }
  }
  .title-picture {
    img {
      width: 100%;
      vertical-align: bottom;
    }
  }
</style>