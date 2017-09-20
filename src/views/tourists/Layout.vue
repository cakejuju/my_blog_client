<template>
  <v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar :left-fixed-sidebar="sidebar">
    <v-toolbar  class="grey" fixed>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-title class="hidden-sm-and-down">Joey's Blog</v-toolbar-title>
      <v-text-field v-if="`${$route.path}`==`/tou/posts`" v-model="query" prepend-icon="search" label="可按标签或标题搜索..." hide-details single-line dark></v-text-field>
      <v-spacer></v-spacer>
      <!-- 登陆以及登出 -->
      <v-btn v-if="!$store.state.currentMember.logged" @click.native="login"  label class="grey  white--text" >登陆</v-btn>
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
        <v-list dense style="margin-left: 0px;">
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

      <router-view style="margin-top:80px;" ></router-view>
    </main>

    <v-dialog  v-model="loginCardDisplay" > 
      <login-card  @loggedIn="LoggedIn"></login-card>
    </v-dialog>


<!--     <v-footer>
      <div class="text-xs4right">© 2017  Joey</div>
    </v-footer> -->
  </v-app>
</template>

<style scope>
.el-popover {
    padding: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
}


ul {
     margin-left: 0px; 
}



</style>

<script>
import LoginCard from '../Login'

export default {

  name: 'world',
  data () {
    return {
      sidebar: true,
      items:[], // 在 mounted 函数中加载
      loginCardDisplay: false,
      adminSideBar: [{title: '文章管理', avatar: 'pets', divider: false, href: '/admin/posts'},
                     {title: '云图片管理', avatar: 'photo_library', divider: false, href: '/admin/cloud_images'},
                     {title: '画廊管理', avatar: 'color_lens', divider: false, href: '/admin/gallery/management'}],
      query: ''
    }
  },
  watch: {
    query: function (val) {
      this.$store.commit('setQuery', val)
    },

  },
  components: {
    'login-card': LoginCard
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
    }
  },
  mounted: function () {
    // 根据是否为管理者加载侧边栏
    let items = [
                 {title: '博文', avatar: 'import_contacts', divider: false, href: '/tou/posts'},
                 {title: '关于', avatar: 'face', divider: false, href: '/tou/about'},
                 {title: '画廊', avatar: 'color_lens', divider: false, href: '/tou/gallery'},
                 {title: '专辑（建设中...）', avatar: 'music_video', divider: true, href: '/tou/music_vedios'}]

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



