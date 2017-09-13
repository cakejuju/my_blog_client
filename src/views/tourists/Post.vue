<template>
  <div class="homepage-container">
    <v-row >
      <post-card :item="post" style=" margin: 0 auto;width: 100%;"></post-card>
      <!-- 点击左右切换 post -->
    </v-row>

    <v-card style="width:100%;box-sizing:''; margin-top:5px" >
       <v-card-row actions style=" background: #e0e0e0;">
         <v-btn v-if="earlier_post!=null" @click.native="getPosts(earlier_post.id)" flat :class="'grey--text text--darken-4'">{{earlier_post.title}}</v-btn>

         <v-spacer></v-spacer>
         <v-btn v-if="later_post!=null" @click.native="getPosts(later_post.id)" flat :class="'grey--text text--darken-4'">{{later_post.title}}</v-btn>
       </v-card-row>
    </v-card>
  </div>
</template>

<style>
</style>

<script>

import PostCard from '../components/PostCard'

export default {
  name: '',
  data () {
    return {
      whichOne: 2,
      midHeight: 0,
      items: [],
      post: {},
      earlier_post: {},
      later_post: {}
    }
  },
  components: {
    'post-card': PostCard
  },
  methods: {
    initData(data){
      this.post = data.post
      this.earlier_post = data.earlier_post
      this.later_post = data.later_post
    },
    getPosts(id){
       this.axios.post('/api/get_posts_by_id', {id: id})    
       .then((response) => {   

          this.initData(response.data)
       })    
       .catch(function (error) {   
         console.log(error);   
       });   
    }
 },
   mounted: function () {
    this.getPosts(this.$route.params.id)
  }
}

</script>