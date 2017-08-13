<template>
  <v-card id="post-card" >

    <v-snackbar 
      :timeout="toastTimeout"
      :right="true"
      :bottom="true"
      v-model="toastDisplay"
      :class="toastClass">
      {{toastContent}}

      <v-btn icon="icon" :class="'white--text'" @click.native="toastDisplay = false">
        <v-icon >close</v-icon>
      </v-btn>
    </v-snackbar>

    <!-- 头部 -->
    <v-card-row>
      <v-list-tile avatar style="width:100%" :class="item.title_color != null ? item.title_color : 'white'">
        <!-- 头像，可不用 -->
<!--         <v-list-tile-avatar>
          <img v-bind:src="'/static/head.png'"/>
        </v-list-tile-avatar> -->

        <v-icon style="float:left" :class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">play_arrow</v-icon>

        <div v-for="tag in item.tag_names">
          <v-chip @click.native="tagClicked(tag.id, tag.name)"  label :class="item.title_text_color != null ? '' : 'secondary white--text'" style="margin-right:0px">{{tag.name}}</v-chip>
        </div>

        <v-list-tile-content :class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">
        </v-list-tile-content>

        <v-list-tile-action>
          <font style="font-weight: 300; font-size:15px" :class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">{{item.written_time}}</font>
        </v-list-tile-action>
      </v-list-tile>
    </v-card-row>

    <v-card-row style="height:20px;margin-top:2em;margin-left:1em;">
      <v-card-title>
        <span style="font-size:25px;font-weight:500;color:#969696" class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">{{item.title}}</span>
      </v-card-title>
    </v-card-row>
    <!-- {{item.height}} -->
    <!-- 文字 -->
    <v-card-text :id="`card_content_${item.id}`" style="height:auto;margin-top:1em; padding-left:2em;">
      <v-card-row >
        <div >
          <div v-html="toHtml(item.content)" ></div>
        </div>
      </v-card-row>
    </v-card-text>


    <!-- 图片 -->
    <v-card-row v-if="item.img_url != ''&& item.img_url!= null">
      <img :img=item.img_url :src="item.img_url" style="width:100%;height:auto"></img>
    </v-card-row>
    <!-- 底部 -->

    <v-card-row actions :class="item.bottom_color != null ? item.bottom_color : 'white'">
      <v-btn @click.native="plusOne" icon="icon" :class="item.bottom_text_color != null ? item.bottom_text_color : 'grey--text text--darken-4'" style="z-index:0">
        <v-icon >plus_one</v-icon>
      </v-btn>

      <v-btn v-if="!this.$route.params.id" @click.native="$router.push('/tou/posts/' + item.id)" icon="icon" :class="item.bottom_text_color != null ? item.bottom_text_color : 'grey--text text--darken-4'" style="z-index:0">
        <v-icon >visibility</v-icon>
      </v-btn>

      <v-btn v-if="$store.state.currentMember.is_master" icon="icon" :class="'grey--text text--darken-4'" style="z-index:0" @click.native="$router.push(`/admin/posts/edit/${item.id}`)">
        <v-icon >edit</v-icon>
      </v-btn>


      <v-spacer></v-spacer>
      <v-btn @click.native="showCommnets()" icon="icon" :class="item.bottom_text_color != null ? item.bottom_text_color : 'grey--text text--darken-4'">
        <v-icon >comment</v-icon>
      </v-btn>
    </v-card-row>


    <transition name="slide-fade">
      <div v-if="showCommentValue">
        <v-list :id="`scroll_list_${item.id}`" style="max-height:18em;overflow: scroll" three-line >
          <template v-for="comment in comments">
            <v-card>
              <v-list-tile avatar style="width:100%;" :class="'white'">
                <!-- 头像，可不用 -->
                <v-list-tile-avatar >
                  <img v-bind:src="comment.head_img_url"/>
                </v-list-tile-avatar>

                <v-list-tile-content :class="'grey--text text--darken-4'">
                  <v-list-tile-title v-html="comment.nickname" />
                </v-list-tile-content>

                <v-list-tile-action>
                  <p style="font-weight: 300; font-size:15px" :class="'grey--text text--darken-4'">{{comment.written_time}}</p>
                </v-list-tile-action>
              </v-list-tile>

                <v-card-text style="padding-top:0px;padding-bottom:0px;">
                  <v-card-row style="">
                    <div style="" v-html="toHtml(comment.content)" ></div>
                  </v-card-row>
                </v-card-text>
            </v-card>
          </template>
        </v-list>


        <v-card-text>
          <v-list-tile-avatar style="justify-content: flex-start;">
            <img v-bind:src="$store.state.currentMember.head_img_url"/>
          </v-list-tile-avatar>

          <v-text-field v-model="commentContent" style="padding:0 0" label="说点什么呢.." full-width single-line multi-line  hint="这里是支持markdown的评论区呀" >
          </v-text-field>


          <v-card-row style="padding:0 0;margin:0 0" actions :class="'white'">
            <!-- <v-icon :class="'grey--text text--darken-2'">photo</v-icon> -->
            <v-spacer></v-spacer>
            <v-btn @click.native="publishComment" flat :class="'grey--text text--darken-2'">
              发表
            </v-btn>
          </v-card-row>
        </v-card-text>
      </div>
    </transition>


    <v-dialog  v-model="loginCardDisplay" > 
      <login-card @loggedIn="LoggedIn"></login-card>
    </v-dialog>


  </v-card>
</template>
<style>

/* 评论区的展开动画 */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateY(-50px);
  opacity: 0;
}

img{
  width: 100%
}

</style>


<script>
  import LoginCard from '../Login'
  var marked = require('marked'); // 引入marked (markdown to html)
  export default {
  data () {
    return {
      showCommentValue: false,
      commentContent: '',
      loginCardDisplay: false,
      comments: [],
      toastTimeout: 4000,
      toastDisplay: false,
      toastContent: '',
      toastClass: ''
      }
    },
    components: {
      'login-card': LoginCard
    },

    name: 'PostCard',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    mounted(){
      let card_content = document.getElementById(`card_content_${this.item.id}`)

      if (card_content.clientHeight > 300) {
        this.postHeight(300)
        card_content.style.height = '300px'
        card_content.style.overflow = 'scroll'
      }else{
        this.postHeight(card_content.clientHeight)
      }
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
    methods:{
      plusOne(){
        this.toastDisplay = true
        this.toastContent = '点赞尚未完成'
        this.toastClass = 'grey darken-3'
      },
      toHtml(str){
        str = str || 'none'

        return marked(str)
      },
      showCommnets(){
        this.showCommentValue = !this.showCommentValue

        if (this.showCommentValue === true && this.comments.length === 0) {
          let order_params = {sort_by: 'created_at', order: 'ASC'}
          let query_params = {post_id: this.item.id}
          let params = {limit:          50, 
                        current_page:   1,
                        order_params:   order_params,
                        include_model: 'member',
                        query_params: query_params}
              
          this.axios.post('/api/comments/getData', params)    
            .then((response) => {   
              let res = response.data
              if (res.success == 1) {
                this.comments = res.json_data
              }else{

              }
          })     
        }
      },
      LoggedIn(){
        this.loginCardDisplay = false
      },
      publishComment(e){
        let jwt = this.readCookie('jwt')
        // 登陆后 post 请求创建 comment
        if (jwt != '' && jwt != null) {

          let params = {content: this.commentContent, 
                        destination: 'post',
                        post_id: this.item.id}

          this.axios.post('/api/comments/operate/create', params)    
            .then((response) => {   
              let res = response.data
              if (res.success == 1) {
                this.comments.push(res.comment)

                this.toastDisplay = true
                this.toastContent = res.msg
                this.commentContent = ''
                this.toastClass = 'grey darken-3'
                // 获取 dom 刷新的事件
                this.$nextTick(function() {
                  let objDiv = document.getElementById(`scroll_list_${this.item.id}`);
                  objDiv.scrollTop = objDiv.scrollHeight
                })

              }else{
                this.toastDisplay = true
                this.toastContent = res.msg
                this.commentContent = ''
                this.toastClass = 'orange darken-2'
              }
          })
        }else{
          e.stopPropagation() 
          this.loginCardDisplay = true
        }

      },
      // 回传每个 post 的高度
      postHeight(height){
        this.$emit('postHeight', height)
        // 若是管理员 则更新高度
        if (this.$store.state.currentMember.is_master) {
          let params = {post_id: this.item.id, height: height}
          this.axios.post('/api/admin/posts/update_height', params)    
            .then((response) => {   
              let res = response.data
          })  
        }
      },
      tagClicked(id, name){
        this.$emit('tagClicked', id, name)
      }
    }
  }


</script>