<template>

  <div>
    <v-col md6 sm12 xs12 style="position: fixed;right: 10px;bottom: 10px;z-index:100">
        <div>
          <v-btn v-on:click.native="" class="blue-grey">
            Upload
            <v-icon right>clear</v-icon>
          </v-btn>

        </div>

    </v-col>

    <two-columns-posts :postsData="wfData" @tagClicked="tagClicked">
    </two-columns-posts>
  </div>



</template>


<script>
var marked = require('marked'); // 引入marked (markdown to html)

import TwoColumnsPosts from '../components/TwoColumnsPosts'

export default {
  name: '',
  data () {
    return {    
      wfData: {left:[], right:[], mid:[]},
      leftHeight: 0,
      rightHeight: 0,
      midHeight: 0,
      items: [],
      clickedTag: []
    }
  },
  components: {
    'two-columns-posts': TwoColumnsPosts
  },
  methods: {
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

          for(let i=0; i < this.items.length; i++){
            this.sortPosts(this.items[i])
          }
       })    

    },
    initView(){
     let order_params = {sort_by: 'created_at', order: 'ASC'}
     let query_params = {limit:30, current_page: 1, order_params: order_params}
     this.getPosts(query_params)
    },
    tagClicked(id){
      this.clickedTag.push(id) 
      this.clickedTag = this.clickedTag.filter( onlyUnique ); 
      this.flushData()

      let related_object = {through_model: 'Pt', 
                            related_model: 'Tag',
                            key: 'tag_id', 
                            value: this.clickedTag, 
                            group: 'post_id'}
      let order_params = {sort_by: 'created_at', order: 'DESC'}
      let query_params = {tag_id: this.clickedTag, 
                          limit:          30, 
                          current_page:   1,
                          order_params:   order_params,
                          related_object: related_object}
      this.getPosts(query_params)
    },
    flushData(){
      this.wfData = {left:[], right:[], mid:[]}
      this.leftHeight = 0
      this.rightHeight = 0
      this.midHeight = 0      
    }


  },
  mounted: function () {
    this.initView()
  }
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

</script>




