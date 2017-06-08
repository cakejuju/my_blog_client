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


    <div v-if="bottomIsLoading&&!bottomIsEnding" style="text-align: center;">
      <v-progress-circular  indeterminate 
                            v-bind:size="70" 
                            v-bind:width="7" 
                            class="grey--text"/>
    </div>  


    <v-snackbar 
      :timeout="toastTimeout"
      :right="true"
      :top="true"
      v-model="toastDisplay"
      :class="toastClass">
      {{toastContent}}

<!--       <v-btn icon="icon" :class="'white--text'" @click.native="toastDisplay = false">
        <v-icon >close</v-icon>
      </v-btn> -->
    </v-snackbar>

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
      limit: 3,
      current_page: 1,
      wfData: {left:[], right:[], mid:[],all:[]},
      leftHeight: 0,
      rightHeight: 0,
      midHeight: 0,
      items: [],
      clickedTag: {},
      queryString: '',     // 全局搜索的内容

      // 上拉加载
      bottomIsLoading: false,
      bottomIsEnding: false,

      // toast
      toastTimeout: 2000,
      toastDisplay: false,
      toastContent: '',
      toastClass: ''

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

      if (this.leftHeight === min){
        this.wfData.left.push(item)
        this.leftHeight += (item.height + 40 + 106 + 56 + 52) // +40是margin
      }else if(this.rightHeight === min){
        this.wfData.right.push(item)
        this.rightHeight += (item.height + 40 + 106 + 56 + 52)
      }
    },
    // ajax 获取 posts
    getPosts(params){
      return this.axios.post('/api/get_posts', params)    
              .then((response) => {   
                let posts = response.data.json_data
                for(let i = 0; i < posts.length; i++){
                  let content = posts[i].content
                  let l_content = posts[i].l_content
                  if (l_content != undefined) {
                    posts[i].content = marked(content)
                    posts[i].l_content = marked(content)
                  }
                } 
                return posts
             })    
    },
    initView(params){
     this.flushData() // 将原来的加载的 posts 清除
     this.getPosts(this.queryParams()).then((posts) => {
        this.items = posts
        this.wfData.all = posts

        for(let i=0; i < this.items.length; i++){
          this.sortPosts(this.items[i])
        }
      })
    },
    tagAdded(id, name){   
      this.clickedTag[name] = id
      this.initView()
    },
    tagRemoved(name){ 
      delete this.clickedTag[name]
      this.initView()
    },
    flushData(){
      this.wfData = {left:[], right:[], mid:[], all:[]}
      this.leftHeight = 0
      this.rightHeight = 0
      this.midHeight = 0  
      this.current_page = 1 
      this.bottomIsEnding = false   
    },
    queryParams(){
      let related_object = {through_model: 'Pt', 
                            related_model: 'Tag',
                            key: 'tag_id', 
                            value: Object.values(this.clickedTag), 
                            group: 'post_id'}
      let order_params = {sort_by: 'created_at', order: 'DESC'}

      let query_params = {limit:          this.limit, 
                          current_page:   this.current_page,
                          order_params:   order_params,
                          related_object: related_object,
                          queryString: this.queryString}

      return query_params;
    },showToast(msg){
      this.toastDisplay = true
      this.toastContent = msg
      this.commentContent = ''
      this.toastClass = 'grey darken-2'
    } 


  },
  mounted: function () {
    this.initView()

    // 监听搜索框 1秒不输入则触发请求
    var timer;
    this.$store.watch(this.$store.getters.getQuery, query => {
      if (query != this.queryString && timer != undefined) {
        clearTimeout(timer)
      }
      this.queryString = query
        timer = setTimeout( () =>{ 
        timer = undefined; 
        this.initView()
      }, 1000);

      
    })

    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

        if (this.bottomIsEnding) {
          this.showToast("已经到底了")
        }
        if (!this.bottomIsLoading && !this.bottomIsEnding) {
          this.bottomIsLoading = true
          this.current_page += 1
          this.getPosts(this.queryParams()).then((posts)=>{
            if (posts.length == 0) {
              this.bottomIsEnding = true
            }
            this.bottomIsLoading = false

            this.wfData.all = this.wfData.all.concat(posts)

            for(let i=0; i < posts.length; i++){
              this.sortPosts(posts[i])
            }


          })
        }
      }
    }

  }
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}




</script>




