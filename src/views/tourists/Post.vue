<template>
   <div class="row" style="width:100%;" >

<!--      <div style="width:10%;height:100%; float:left; ">

      <v-icon style="font-size:80px;position:fixed;top:50%;transform:translate(-50%,-50%);z-index:100" x-large class="grey--text text--darken-2">keyboard_arrow_left</v-icon>
     </div> -->

     <!-- 中间的一列 -->
     <div style="width:100%;height:100%; float:left;">
       <!-- <v-col xs12 v-for="item in wfData.mid" :key="item.id" style="margin:20px 6px"> -->
         <post-card  :item="post" :imgHeight="'500px'"></post-card>
       <!-- </v-col> -->
     </div>

     <!-- TODO: 点击左右切换 post -->

   </div>
</template>

<script>
var marked = require('marked'); // 引入marked (markdown to html)

import PostCard from '../components/PostCard'

export default {
  name: '',
  data () {
    return {
      wfData: {left:[], right:[], mid:[]},
      midHeight: 0,
      items: [],
      post: {}
    }
  },
  components: {
    'post-card': PostCard
  },
  methods: {
    sortPosts(item){
    },
    getPosts(){
       this.axios.post('/api/get_posts_by_id', {id: this.$route.params.id})    
       .then((response) => {   
          let post = response.data
          post.content = marked(post.content)
          post.l_content = marked(post.content)
          this.post = response.data
          this.post.l_content = marked(this.post.content)
       })    
       .catch(function (error) {   
         console.log(error);   
       });   
  }
 },
   mounted: function () {
    this.getPosts()
  }
}

</script>