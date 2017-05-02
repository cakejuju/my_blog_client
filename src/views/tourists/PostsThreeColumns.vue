<template>
  
   <div class="row" style="width:100%;" >
     <!-- 最左边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.left" :key="item.id" style="margin:20px 6px">
        <post-card  :item="item" :imgHeight="'240px'"></post-card>
        </v-col>
     </div>

     <!-- 中间的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.mid" :key="item.id" style="margin:20px 6px">
         <post-card  :item="item" :imgHeight="'240px'"></post-card>
       </v-col>
     </div>

     <!-- 最右边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.right" :key="item.id" style="margin:20px 6px">
         <post-card  :item="item" :imgHeight="'240px'"></post-card>
       </v-col>
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
      leftHeight: 0,
      rightHeight: 0,
      midHeight: 0,
      sidebar: true,
      items: []
    }
  },
  components: {
    'post-card': PostCard
  },
  methods: {
    sortPosts(item){
      // 若总高度相等 则随机分配, 否则分配给小的 然后增加高度
      let min = Math.min(this.leftHeight,this.rightHeight,this.midHeight)

      if (this.leftHeight === min) {
        this.wfData.left.push(item)
        this.leftHeight += (item.height + 40) // +40是margin
      }else if(this.rightHeight === min){
        this.wfData.right.push(item)
        this.rightHeight += (item.height + 40)
      }else if(this.midHeight === min){
        this.wfData.mid.push(item)
        this.midHeight += (item.height + 40)
      }
    },
    getPosts(){
       let order_params = {sort_by: 'created_at', order: 'ASC'}
       this.axios.post('/api/get_posts', {limit:30, current_page: 1, order_params: order_params})    
       .then((response) => {   
          let posts = response.data.json_data
          for(let i = 0; i < posts.length; i++){
            let content = posts[i].content
            let l_content = posts[i].l_content
            if (l_content != undefined) {
              posts[i].content = marked(content)
              posts[i].l_content = marked(l_content)
            }
          } 

          this.items = posts
          console.log(this.items)
          // 渲染
          // 当文章内容很多时,就用最大的height,这时height会相等 
          // 当文章内容小于最大的height时,则按文章的所有内容加载
          for(var i=0; i < this.items.length; i++){
            this.sortPosts(this.items[i])
          }
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

<style>
body {
  background: #e0e0e0
}
</style>



