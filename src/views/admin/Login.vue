<template>
  <div id="admin-login-card" style="width:100%">
      <v-card style="height:100%">
        <v-toolbar class="teal lighten-4">  
          <v-toolbar-title class="grey--text text--darken-2">登陆哟</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-menu id="space" bottom left origin="top right" transition="v-scale-transition">
            <v-btn icon="icon" slot="activator" class="grey--text text--darken-2">
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-item>
                <v-list-tile>
                  <v-btn @click.native="thirdPartLogin" primary floating small dark>
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile>
                  <v-btn primary floating small dark>
                    QQ
                  </v-btn>
                </v-list-tile>
                <v-list-tile>
                  <v-btn primary floating small dark>
                    微博
                  </v-btn>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>

        <v-card-text>
          <v-container fluid>
            <v-row row>
              <v-col xs12>
                <v-text-field
                  label="输入账号"
                  v-model="username"
                />
              </v-col>
              <v-col xs12>
                <v-text-field
                  label="输入密码"
                  append-icon="visibility_off"
                  type="password"
                  v-model="password"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-row actions class="white">
          <v-btn flat class="grey--text text--darken-2">注册本站</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.native="loginPost" flat class="grey--text text--darken-2">GO</v-btn>
        </v-card-row>


      </v-card>

    <v-snackbar 
      :timeout="toastTimeout"
      :top="true"
      v-model="toastDisplay"
      class="red dark-4">
     {{toastContent}}

    <v-btn icon="icon" :class="'white--text'" @click.native="toastDisplay = false">
      <v-icon >close</v-icon>
    </v-btn>
   </v-snackbar>
  </div>


</template>

<script>
  export default {
  data () {
    return {
      username: '',
      password: '',
      toastTimeout: 3000,
      toastDisplay: false,
      toastContent: ''

      }
    },
    name: 'LoginCard',
    props: {
    },
    methods:{
      loginPost(){
        let params = {username: this.username, password: this.password}
        this.axios.post('/api/admin/login', params)    
          .then((response) => {   
            let res = response.data
            if (res.success === 1) {
              this.createCookie('jwt',res.jwt, 0.001)

              this.$store.commit('setMember', res.current_member)
              // 如果是在 login 页面则跳转
              // 若是组件引用则只回传已登录
              if (this.$router.app._route.path === '/admin/login') {
                this.$router.push('/tou/posts')
              }else{
                this.$emit('loggedIn')
              }

            }else if(res.success === 0){
              this.toastDisplay = true
              this.toastContent = res.msg
            }
            
        }) 
      },
      thirdPartLogin(){
        console.log('thirdPartLogin')
      }

    }
  }



</script>