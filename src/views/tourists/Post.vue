<template>
  <div>

    <v-row >
      <v-col xs1 sm1 lg1 xl1 style="float:left;">
      </v-col >

      <!-- 中间的一列 -->
      <v-col xs10 sm10 lg10 xl10 style="float:left;">
         <post-card  :item="post" :imgHeight="'500px'"></post-card>
      </v-col>

      <v-col xs1 sm1 lg1 xl1 style="float:left;">
      </v-col >
      <!-- TODO: 点击左右切换 post -->
     </v-row>

     <v-card style="width:100%;box-sizing:''; margin-top:5px" >
       <v-card-row actions style=" background: #e0e0e0;  ">
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

var marked = require('marked'); // 引入marked (markdown to html)

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
      this.post.l_content = marked(this.post.content)
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