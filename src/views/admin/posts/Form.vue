<!-- use for posts new and edit  -->
<template>
  <div id="post-form">
    <v-card class="paper-block">
      <v-card-title class="pb-1">
        <v-text-field label="标题" hide-details v-model="post.title">
        </v-text-field>
      </v-card-title>
      <v-card-title class="pb-1">
        <v-text-field label="标签,多个用英文竖线|隔开" hide-details v-model="post.tags">
        </v-text-field>
      </v-card-title>
      <div id="new-post-page">
        <v-card-text class='pt-0'>
          <markdownEditor 
            :rows="20"
            v-model="post.content"
            imgUploadUrl="//192.168.31.20:9292/upload/posts_img">  
          </markdownEditor>
        </v-card-text>
        <v-card-row actions>
          <v-btn v-if="action==='new'" class="mr-3" default  large @click.native="resetPost">重置</v-btn>

          <v-btn v-if="action==='new'" class="white--text" error large :disabled="post.title===''" @click.native="submitPost()">发布</v-btn>

          <v-btn v-if="action==='edit'" class="white--text" error large :disabled="post.title===''" @click.native="updatePost">更新</v-btn>
        </v-card-row>
      </div>
    </v-card>
  </div>
</template>

<script>
  import markdownEditor from '../../components/markdownEditor'
  export default {
    name: 'PostFrom',

    data: () => ({
      post: {
        title: '',
        content: '',
        tags: ''
      },
      msg: '',
      alert: false,
      token: '',
      policy: ''
    }),
    props: {
      action: {
        type: String
      },
      postId:{
        type: Number
      }

    },
    components: {
      markdownEditor
    },
    mounted () {
      // console.log(this.postId)
      if (this.action === "edit") {
        this.getPosts(this.postId)
      }
    },
    beforeDestroy () {
      this.post.title = ''
      this.post.content = ''
    },
    methods: {
      resetPost () {
        this.post.title = ''
        this.post.content = ''
      },
      submitPost(){
      },
      updatePost(){
        let params = this.post
        Object.assign(params, {post_id: this.postId})

        this.axios.post('/api/admin/posts/update', params)    
        .then((response) => {   
          let res = response.data
          console.log(res)
          if (res.success === 1) {
            console.log(this.$route.push)
            this.$router.push(`/tou/posts/${this.postId}`)
          }
        })  

 
      },
      getPosts(id){
        this.axios.post('/api/get_posts_by_id', {id: id})    
        .then((response) => {   
          let res = response.data
          if (res.success === 1) {
            let post = res.post 

            this.post.title = post.title
            this.post.content = post.content
            let tags_arr = []
            for(let i = 0; i < post.tag_names.length; i++){
              tags_arr.push(post.tag_names[i].name)
            }
     
            this.post.tags = tags_arr.join('|')
          }
        })    

      }

    }
  }
</script>

<style lang='scss' scoped>
  #new-post-page {
    height: 100%;

    .dialog__container {
      display: block;
    }
  }
</style>