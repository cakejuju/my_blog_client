<template>
  <div id="login-card" style="width:100%">
      <v-card style="height:100%"  v-if="isLogin">
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
          <v-btn flat class="grey--text text--darken-2" @click.native="showRegisterCard">注册本站</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.native="loginPost" flat class="grey--text text--darken-2">GO</v-btn>
        </v-card-row>
      </v-card>

      <v-card style="height:100%"  v-if="isRegister">
        <v-toolbar class="green lighten-4">  
          <v-toolbar-title class="grey--text text--darken-2">注册本站</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn class="grey--text text--darken-2" @click.native="goBackLogin">返回登录</v-btn> -->
        </v-toolbar>

        <v-card-text style="padding-bottom:0px;margin-bottom:0px">
          <v-container fluid>
            <v-row row>

              <el-upload
              class="avatar-uploader"
              action="//127.0.0.1:9292/pic"
              :show-file-list="false"
              :on-success="handleAvatarScucess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">上传头像,只支持jpg/png文件，且不超过2M</div>
            </el-upload>

              <v-col xs12>
                <v-text-field
                  label="填入邮箱"
                  v-model="email"
                  v-bind:rules="[validEmail(email)]"
                  required
                />
              </v-col>
              <v-col xs12>
                <v-text-field
                  label="你的昵称"
                  v-model="nickname"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-row actions class="white">
          <v-btn flat class="grey--text text--darken-2" @click.native="goBackLogin">返回登录</v-btn>

          <v-spacer></v-spacer>
          <v-btn @click.native="" flat class="grey--text text--darken-2">提交注册</v-btn>
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

<style scope>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  export default {
  data () {
    return {
      // 登陆注册输入
      email: '',
      password: '',
      nickname: '',

      toastTimeout: 3000,
      toastDisplay: false,
      toastContent: '',
      isLogin: true,
      isRegister: false,

      imageUrl: ''

      }
    },
    name: 'LoginCard',
    props: {
    },
    methods:{
      handleAvatarError(){
        return false
      },
      handleAvatarScucess(res, file) {
         console.log(res)
        this.imageUrl = URL.createObjectURL(file.raw);
       
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(isLt2M)
        if (!isJPG) {
          // this.$message.error('上传头像图片只能是 JPG 格式!');
          this.toastDisplay = true
          this.toastContent = '上传头像图片只能是 JPG 格式!'
        }
        if (!isLt2M) {
          this.toastDisplay = true
          this.toastContent = '上传头像图片大小不能超过 2MB!'
          // this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
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
      showRegisterCard(){
        this.isLogin = false
        this.isRegister = true
      },
      goBackLogin(){
        this.isLogin = true
        this.isRegister = false        
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