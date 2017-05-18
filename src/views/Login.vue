<template>
  <div id="login-card" style="width:100%">
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
                  label="输入邮箱"
                  v-model="email"
                  v-bind:rules="[validEmail(email)]"
                  required
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
      email: '',
      password: '',
      toastTimeout: 3000,
      toastDisplay: false,
      toastContent: '',
      isLogin: true,
      isRegister: false

      }
    },
    name: 'LoginCard',
    props: {
    },
    methods:{
      loginPost(){
        // 验证 email
        let emailIsValid = this.validEmail(this.email)
        if (!emailIsValid) {
           this.toastDisplay = true
           this.toastContent = '邮箱格式不对'
           return
        }
        let params = {email: this.email}
        this.axios.post('/api/login', params)    
          .then((response) => {   
            let res = response.data
            if (res.success === 1) {
              this.createCookie('jwt',res.jwt, 0.001)
              this.$store.commit('setMember', res.current_member)
              // 如果是在 login 页面则跳转
              // 若是组件引用则只回传已登录
              if (this.$router.app._route.path === '/login') {
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
      validEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
      },
      thirdPartLogin(){
        console.log('thirdPartLogin')
      }

    }
  }



</script>