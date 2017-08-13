<template>
  <div id="post_picture" class="masonry">
    <v-card class="title-block item" >
      <v-card-row @click.native="$router.push('/admin/posts/new')">
      <v-card-title >
        新建博客
        <!-- <v-subheader v-text="`发送到了分手大师多福多寿`"></v-subheader> -->
      </v-card-title>
      </v-card-row>
    </v-card>

    <v-card class="item"v-for="post in posts" :key="post.ds">
      <v-card-title>
        <span style="font-size:17px;font-weight:500" class="grey--text text--darken-4">{{post.title}}</span>
        <v-spacer></v-spacer>
        <span style="font-size:17px;" class="grey--text text--darken-4">{{post.created_strftime}}</span>

      </v-card-title>
       <v-divider></v-divider>
<!--       <v-card-row class="title-picture" >
        <v-card-row><img style="" :src="post.img_url == '' ? '/static/github.png' : post.img_url" alt=""></v-card-row>
      </v-card-row> -->
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
      posts: []
    }),
    mounted: function () {
      let order_params = {sort_by: 'created_at', order: 'DESC'}
      let query_params = {json_only: ['id', 'title', 'img_url'], 
                          limit: 300, current_page: 1, 
                          order_params: order_params}
      this.getPosts(query_params)
    },
    methods: {
      getPosts(params){
        this.axios.post('/api/admin/get_posts', params)    
          .then((response) => {   
            let posts = response.data.json_data
            // console.log(posts)
            this.posts = posts

        })    
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

  @media all and (max-width: 1111px) {
    .masonry {

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