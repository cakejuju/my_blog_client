<template>
  <div>
    <div>
      <v-btn v-for="tag in Object.keys(clickedTag)" round  v-on:click.native="tagRemoved(tag)" class="blue darken-3" :key="tag">
        {{tag}}
        <v-icon right>clear</v-icon>
      </v-btn>
    </div>
    <two-columns-posts :postsData="wfData" @tagClicked="tagAdded">
    </two-columns-posts>
  </div>
</template>

<style>
body {
  /*background: #e0e0e0*/
}
</style>
<script>
var marked = require('marked'); // 引入marked (markdown to html)

import TwoColumnsPosts from '../components/TwoColumnsPosts'

export default {
  name: '',
  data () {
    return {    
      limit: 12,
      wfData: {left:[], right:[], mid:[],all:[]},
      leftHeight: 0,
      rightHeight: 0,
      midHeight: 0,
      items: [],
      clickedTag: {},
      queryString: '' // 全局搜索的内容

    }
  },
  components: {
    'two-columns-posts': TwoColumnsPosts
  },
  created () {
    this.marked = marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs ',
      highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
      }
    })
  },
  methods: {
    strip(html){
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent||tmp.innerText;
    },

    sortPosts(item){
      // 若总高度相等 则随机分配, 否则分配给小的 然后增加高度
      // 渲染
      // 当文章内容很多时,就用最大的height,这时height会相等 
      // 当文章内容小于最大的height时,则按文章的所有内容加载
      let min = Math.min(this.leftHeight,this.rightHeight)

      if (this.leftHeight === min) {
        this.wfData.left.push(item)
        this.leftHeight += (item.height + 40) // +40是margin
      }else if(this.rightHeight === min){
        this.wfData.right.push(item)
        this.rightHeight += (item.height + 40)
      }
    },
    getPosts(params){
      this.axios.post('/api/get_posts', params)    
        .then((response) => {   
          this.flushData()
          let posts = response.data.json_data
          for(let i = 0; i < posts.length; i++){
            let content = posts[i].content
            let l_content = posts[i].l_content
            if (l_content != undefined) {
              posts[i].content = marked(content)
              // console.log(this.strip(marked(content)).replace(/(\r\n|\n|\r)/gm,""))
              posts[i].l_content = marked(content)
            }
          } 
          this.items = posts

          this.wfData.all = posts

          for(let i=0; i < this.items.length; i++){
            this.sortPosts(this.items[i])
          }
      })    
    },
    queryTagPost(){
      this.getPosts(this.queryParams())
    },
    initView(){
     let order_params = {sort_by: 'created_at', order: 'DESC'}
     let query_params = {limit: this.limit, current_page: 1, 
                         order_params: order_params}
     this.getPosts(query_params)
    },
    tagAdded(id, name){
      this.clickedTag[name] = id
      this.queryTagPost()
    },
    tagRemoved(name){
      delete this.clickedTag[name]
      this.queryTagPost()
    },
    flushData(){
      this.wfData = {left:[], right:[], mid:[], all:[]}
      this.leftHeight = 0
      this.rightHeight = 0
      this.midHeight = 0      
    },
    queryParams(){
      let related_object = {through_model: 'Pt', 
                            related_model: 'Tag',
                            key: 'tag_id', 
                            value: Object.values(this.clickedTag), 
                            group: 'post_id'}
      let order_params = {sort_by: 'created_at', order: 'DESC'}

      let query_params = {limit:          this.limit, 
                          current_page:   1,
                          order_params:   order_params,
                          related_object: related_object,
                          queryString: this.queryString}
      return query_params;
   }


  },
  mounted: function () {
    this.$store.watch(this.$store.getters.getQuery, query => {

      this.queryString = query
      this.queryTagPost()
    })

    this.initView()
  }
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}


</script>




