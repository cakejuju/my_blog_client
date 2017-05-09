<template>
  <div id="login-card" style="width:100%">
      <v-card style="height:100%">
        <v-toolbar class="teal lighten-4">  
          <v-icon class="grey--text text--darken-2">arrow_back</v-icon>
          <v-spacer></v-spacer>
          <v-icon class="grey--text text--darken-2">more_vert</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-row row>
              <v-col xs12>
                <v-text-field
                  label="输入你的账号"
                  model="username"
                />
              </v-col>
              <v-col xs12>
                <v-text-field
                  label="输入你的密码"
                  append-icon="visibility_off"
                  type="password"
                  model="password"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-row actions class="white">
          <v-btn flat class="grey--text text--darken-2">注册个账号</v-btn>
          <v-spacer></v-spacer>
  <!--         <v-btn icon>
            <v-icon class="white--text">提交</v-icon>
          </v-btn> -->
          <v-btn @click.native="loginPost" flat class="grey--text text--darken-2">下一步</v-btn>
        </v-card-row>


      </v-card>

    <v-snackbar 
      :timeout="toastTimeout"
      :top="true"
      v-model="toastDisplay"
      class="red dark-4"
      
    >
     {{toastContent}}
    <!-- <v-btn icon flat class="white--text" @click.native="toastDisplay = false">close</v-btn> -->

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
      // item: {
      //   type: Object,
      //   required: true
      // }
    },
    methods:{
      loginPost(){
        let params = {username: this.username, password: this.password}
        this.axios.post('/api/login', params)    
          .then((response) => {   
            let res = response.data

            if (res.success === 1) {
              createCookie('jwt',res.jwt, 0.007)
            }else if(res.success === 0){
              this.toastDisplay = true
              this.toastContent = res.msg
              // alert(res.msg)
            }
            console.log(readCookie('jwt'))
            
        }) 
      }

    }
  }

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

</script>