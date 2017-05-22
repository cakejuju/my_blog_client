<template>
  <v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar :left-fixed-sidebar="sidebar">
    <v-toolbar  class="red" fixed>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-title class="hidden-sm-and-down">My Blog</v-toolbar-title>
      <v-text-field prepend-icon="search" label="关键字搜索..." hide-details single-line dark></v-text-field>

      <!-- 登陆以及登出 -->
      <v-chip v-if="!$store.state.currentMember.logged" @click.native="login"  label class="primary white--text" >登陆</v-chip>
      <el-popover ref="logout" placement="bottom" width="350" trigger="click" >
        <v-card class="grey--text text--darken-2" v-show="$store.state.currentMember.logged">
          <v-list three-line>
            <template>
              <v-list-item>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img v-bind:src="$store.state.currentMember.head_img_url"/>
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

      <router-view style="margin-top:80px;width:100%" ></router-view>
    </main>

    <!-- login dialog -->

<!-- 
    <el-dialog size="small" modal="false" modal-append-to-body="false" v-model="loginCardDisplay">
      <login-card @loggedIn="LoggedIn"></login-card>
    </el-dialog> -->

    <v-dialog  v-model="loginCardDisplay" scrollable> 

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

</style>

<script>
import LoginCard from '../Login'

export default {

  name: 'world',
  data () {
    return {
      sidebar: true,
      items:[ {title: '首页', avatar: 'home', divider: false, href: '/tou/posts'},
              {title: '三列模式', avatar: 'face', divider: false, href: '/tou/posts/three_columns'},
              {title: '关于本站', avatar: 'face', divider: false, href: '/tou/about'},
              {title: '建设中...', avatar: 'build', divider: true, href: '/'}
            ],
      loginCardDisplay: false
    }
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
      console.log('等出了')
      this.createCookie('jwt','', 0.0001)
      this.$store.commit('flushMember')
    }
  },
  mounted: function () {
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
              this.$store.commit('setMember', res.current_member)
            }  
        }) 


      }
    }
    
  }
}
</script>



