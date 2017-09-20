<template>
  <div id="post_picture" class="masonry">
    <v-card class="title-block item" >
      <v-card-row >
        <v-card-title >
          <!-- 云服务:{{file_url}} -->
          <v-text-field  label="输入地址" v-model="file_url"></v-text-field>
        </v-card-title>
      </v-card-row>
    </v-card>

    <v-card style="width: 500px" class="item"v-for="file in files" :key="file.ds">

      <v-card-title>
        <span  style="font-size:17px;font-weight:500" class="grey--text text--darken-4">
        {{new Date(file.last_modified * 1000).yyyymmdd()}}
        </span>
        <v-spacer></v-spacer>
        <span v-if="file.type == 'file'" style="font-size:17px;" class="grey--text text--darken-4">{{Math.round(file.length/1024)}}K</span>

        <v-btn @click.native="goIntoFolder(file.name)" v-if="file.type == 'folder'" class="grey--text text--darken-4">{{file.name}}</v-btn>
      </v-card-title>

       <v-divider></v-divider>

      <v-card-row  v-if="file.type == 'file'" class="title-picture" >
        <v-card-row><img style="height: 300px" :src="`${$store.state.config.UPyun.url_prefix}${img_url}/${file.name}`" alt=""></v-card-row> 
      </v-card-row>
      <br>
      
      <p> {{`${$store.state.config.UPyun.url_prefix}${img_url}/${file.name}`}}</p>
      <v-divider></v-divider>

      <v-card-row actions>
<!--         <v-btn  icon="icon" :class="'grey--text text--darken-4'">
          <v-icon >mode_edit</v-icon>
        </v-btn> -->
        <v-spacer></v-spacer>

        <v-btn @click.native="deleteFile(file.name)"  class="red--text text--lighten-2" icon>
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </v-card-row>

    </v-card>

  </div>
</template>

<script>
  export default {
    data: () => ({
      files:[],
      file_url: '',
      img_url: ''
    }),
    mounted: function () {
      let params = {file_url: this.file_url}
      this.getFiles(params)

      
    },
    methods: {
      getFiles(params){
        this.axios.post('/api/admin/image_cloud/file_lists', params)    
          .then((response) => {   
            if (response.data.success === 1) {
              let res = response.data.data
              if (res.error == null) {
                this.files = res
                if (res.length > 0) {
                  this.img_url = this.file_url
                } 
              }
            }
        })    
      },
      deleteFile(path){
        let file_path = this.img_url + '/' + path

        let params = {file_path: file_path}
        this.axios.post('/api/admin/image_cloud/delete_file', params)    
          .then((response) => {   
            let res = response.data
            console.log(res)
            if (res.success === 1) {
              this.getFiles({file_url: this.file_url})
            }else{
              console.log(res.msg)
            }

        })  
      },
      goIntoFolder(folder_name){
        // TODO 判断 /
        // console.log(this.file_url.slice(-1))

        if (this.file_url.slice(-1) != '/') {
          this.file_url += '/' + folder_name
        }else{
          this.file_url += folder_name
        }
        
      }
    },
    watch: {
      file_url: function (val) {
        let params = {file_url: val}
        this.getFiles(params)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post_picture {
    height: 100%;
  }
  .masonry {
    column-gap: 1.5rem;
    column-count: 1;

    .item {
      display: inline-block;
      background: #fff;
      margin: 0 0 1em;
      margin-right: 1em;
      margin-left: 1em;
      width: 100%;
    }
  }

  @media all and (max-width: 300px) {
    .masonry {
      column-count: 1;
    }
  }

  @media all and (max-width: 1200px) {
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