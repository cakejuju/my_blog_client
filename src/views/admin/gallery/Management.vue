<template>
  <div>
    <div class="full-cover" v-if="uploadLoadingDisplay">
        <v-progress-circular indeterminate v-bind:size="50" class="primary--text" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
        </v-progress-circular>
    </div>

    <v-card-text style="padding-bottom:0px;margin-bottom:0px">
      <v-container fluid>
        <v-row >
        <v-col xs2 sm2 lg3 xl2></v-col>
        <v-col xs9 sm9 lg9 xl9>
        <el-upload
          class="avatar-uploader"
          action="/api/upload/photography"
          :show-file-list="false"
          :on-success="handleAvatarScucess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">上传图片吧!支持jpg/png文件</div>
        </el-upload>
        <br>
        </v-col>
          <v-col xs12>
            <v-text-field
              label="写一些介绍~"
              v-model="description"
              required
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-row actions class="white">
      <v-btn @click.native="doRegister()" flat class="grey--text text--darken-2">提交</v-btn>
    </v-card-row>

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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

  .full-cover{
      z-index: 100;
      position:fixed;
      padding:0;
      margin:0;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background:rgba(255,255,255,0.5);
  }
</style>

<script>
  export default {
  data () {
    return {
      description: '', // 一些描述

      toastTimeout: 3000,
      toastDisplay: false,
      toastContent: '',
      isLogin: true,
      isRegister: false,
      uploadLoadingDisplay: false,

      imageUrl: '',
      file_path: ''  // 图片暂存的地址

      }
    },
  name: 'LoginCard',
  props: {},
  methods:{
    doRegister(){
      console.log('dadas')
      let description = this.description

      if (description === '' || description === null) {
         this.toastDisplay = true
         this.toastContent = '写点描述呗'
         return   
      }
      let params = {description: description, tempfile_path: this.file_path}

      this.uploadLoadingDisplay = true
      this.axios.post('/api/admin/photography/create', params)    
      .then((response) => {   
        this.uploadLoadingDisplay = false
        let res = response.data
        console.log(res)
        if (res.success === 1) {
          this.toastDisplay = true
          this.toastContent = '上传成功辣(:'
        }else if(res.success === 0){
          this.toastDisplay = true
          this.toastContent = res.msg
        }
      })

    },

    // 上传图片失败 显示 toast
    handleAvatarError(err, file, fileList){
      this.toastDisplay = true
      this.toastContent = err
      return false
    },
    // 上传图片成功 得到后端回传的暂存文件地址
    // 显示图片
    handleAvatarScucess(res, file) {
      console.log(res)
      // res.file_path 是图片在 server 机器的暂存地址
      // 再客户端提交注册并且验证通过后才会上传到云服务
      this.file_path = res.file_path
      
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传前钩子 验证图片格式 大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG && !isPNG) {
        this.toastDisplay = true
        this.toastContent = '上传头像图片只能是 JPG 或 PNG 格式!'
      }
      if (!isLt2M) {
        this.toastDisplay = true
        this.toastContent = '上传头像图片大小不能超过 10MB!'
      }
      return isJPG||isPNG && isLt2M;
    },
  }
}



</script>