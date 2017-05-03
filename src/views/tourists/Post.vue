<template>
   <div class="row" style="width:100%;" >

     <div style="width:10%;height:100%; float:left;">
     </div>

     <!-- 中间的一列 -->
     <div style="width:80%;height:100%; float:left;">
       <!-- <v-col xs12 v-for="item in wfData.mid" :key="item.id" style="margin:20px 6px"> -->
         <post-card  :item="post" :imgHeight="'600px'"></post-card>
       <!-- </v-col> -->
     </div>

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