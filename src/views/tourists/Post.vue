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
      // 若总高度相等 则随机分配, 否则分配给小的 然后增加高度

      // this.wfData.mid.push(item)
      // this.midHeight += (item.height + 40)
    },
    getPosts(){
       // let order_params = {sort_by: 'created_at', order: 'ASC'}
       this.axios.post('/api/get_posts_by_id', {id: this.$route.params.id})    
       .then((response) => {   
          // let posts = response.data.json_data
          // for(let i = 0; i < posts.length; i++){
          //   let content = posts[i].content
          //   let l_content = posts[i].l_content
          //   if (l_content != undefined) {
          //     posts[i].content = marked(content)
          //     posts[i].l_content = marked(l_content)
          //   }
          // } 
          let post = response.data
          
          console.log(post)
          post.content = marked(post.content)
          post.l_content = marked(post.content)
          this.post = response.data
          this.post.l_content = marked(this.post.content)

          console.log(marked(this.post.content))
          // 渲染
          // 当文章内容很多时,就用最大的height,这时height会相等 
          // 当文章内容小于最大的height时,则按文章的所有内容加载
          // for(var i=0; i < this.items.length; i++){
          //   this.sortPosts(this.items[i])
          // }
       })    
       .catch(function (error) {   
         console.log(error);   
       });   

    // }
  }
 },
   mounted: function () {
    this.getPosts()
    console.log(this.$route.params.id)

  }
}

</script>