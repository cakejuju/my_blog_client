<template>
  <div id="post_picture" class="masonry">
    <v-card class="title-block item" >
      <v-card-row >
      <v-card-title >
        云服务:{{file_url}}
      </v-card-title>
      </v-card-row>
    </v-card>

    <v-card class="item"v-for="file in files" :key="file.ds">

      <v-card-title >
        <span style="font-size:17px;font-weight:500" class="grey--text text--darken-4">
        {{new Date(file.last_modified * 1000).yyyymmdd()}}
        </span>
        <v-spacer></v-spacer>
        <span style="font-size:17px;" class="grey--text text--darken-4">{{Math.round(file.length/1024)}}K</span>
      </v-card-title>


       <v-divider></v-divider>
      <v-card-row class="title-picture" >

      <v-card-row v-if="file.type == 'file'"><img style="" :src="'http://blog-src.b0.upaiyun.com' + file_url + file.name" alt=""></v-card-row>
        
      </v-card-row>
      <v-divider></v-divider>

      <v-card-row actions>
        <v-btn  icon="icon" :class="'grey--text text--darken-4'">
          <v-icon >mode_edit</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn class="red--text text--lighten-2" icon>
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
      file_url: '/production/heads/'
    }),
    mounted: function () {
      let params = {file_url: this.file_url}
      this.getFiles(params)
    },
    methods: {
      getFiles(params){
        this.axios.post('/api/admin/image_cloud/file_lists', params)    
          .then((response) => {   
            this.files = response.data.data
        })    
      },
      getTime(UNIX_timestamp){
        var date = new Date(UNIX_timestamp*1000);
        var month = date.getMonth();
        var day = date.getDay();
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime =month + ' ' + day + ' ' +hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
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
    column-count: 3;

    .item {
      display: inline-block;
      background: #fff;
      margin: 0 0 1em;
      margin-right: 1em;
      margin-left: 1em;
      width: 100%;
    }
  }

  @media all and (max-width: 1111px) {
    .masonry {
      column-count: 2;
    }
  }

  @media all and (max-width: 600px) {
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