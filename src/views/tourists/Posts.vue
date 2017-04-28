<template>
  
   <div class="row" style="width:100%;" >
     <!-- 最左边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.left" :key="item.id" style="margin:20px 6px">
        <post-card  :item="item"></post-card>
        </v-col>
     </div>

     <!-- 中间的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.mid" :key="item.id" style="margin:20px 6px">
         <post-card  :item="item"></post-card>
       </v-col>
     </div>

     <!-- 最右边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.right" :key="item.id" style="margin:20px 6px">
         <post-card  :item="item"></post-card>
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
            let post = posts[i].content
            if (post!=undefined) {
              posts[i].content = marked(post)
            }
          } 

          this.items = posts
          console.log(this.items)
          // 渲染
          for(var i=0; i < this.items.length; i++){
            this.sortPosts(this.items[i])
          }
       })    
       .catch(function (error) {   
         console.log(error);   
       });   
    
      // TODO ajax to server
      // 当文章内容很多时,就用最大的height,这时height会相等 
      // 当文章内容小于最大的height时,则按文章的所有内容加载
      // let posts = [{height: 260, src:'/static/dog.jpg', title:'第一篇文章',content: ' 李寻欢，被称作”小李探花”，是明宪宗朱见深成化年间探花（殿试中进士榜一甲第三名）。他出身一个书香世家。李家三父子俱擅长于文墨，均在科举中高中为探花，在家乡以“老李探花”（李寻欢的父亲）、“大李探花”（李寻欢的兄长）、“小李探花”（李寻欢）闻名，李家的门上亦有御书的“一门七进士，父子三探花”对联。由于仕途得志，所以李寻欢早年已于朝廷为官。后来，由于被胡云冀上奏弹劾，以他淡泊名利的性格，终于辞官而去。后来，李寻欢投身江湖，成为首屈一指的武林人物，以飞刀神技闻名。他与林诗音彼此相爱，订下婚约，原欲结为夫妻；后来他因为知道义兄龙啸云爱上林诗音，想报恩于义兄，所以刻意纵情酒色，借故疏远林诗音，促成龙啸云与林诗音的婚姻。并在龙啸云与林诗音成亲之後，把自己的府邸和万贯家财送给林诗音作嫁妆，出关隐姓埋名。\n\nLorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
      //   tag:['ruby','胡扯'],
      //   titleTextColor:"grey--text text--lighten-4", titleColor:'blue accent-3', 
      //   bottomColor: 'blue-grey lighten-2',  bottomTextColor: "grey--text text--darken-4"},
      //         {height: 260, src:'/static/lulu.jpg', title:'第二篇文章',content: "```\n\nconsole.log('heiheihei')\n\n```\n\n```\n\nconsole.log('heiheihei')\n\n```",
      //           tag:[{name:'辣鸡',id: '1'}],
      //           titleTextColor:"grey--text text--darken-4", titleColor:'grey lighten-4'},
      //         {height: 260, src:'/static/yue.jpg', title:'第三篇文章',content: "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      //           titleColor:'green darken-1',
      //           tag:['香港记者']}, 
      //         {height: 260, src:'/static/meizi.jpg', title:'第四篇文章', content: 'If you want to mother boomboom, type command ```rm -rf /*```',
      //         tag:['cosplay']},
      //         {height: 260, src:'/static/luqiya.jpg', title:'第五篇文章'},
      //         {height: 260, src:'/static/meizi.jpg', title:'第六篇文章'}]


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



