<template>
  <v-card class="paper-block">
    <v-card-title class="pb-1">
      <v-text-field label="标题" hide-details v-model="post.title">
      </v-text-field>
    </v-card-title>
    <v-card-title class="pb-1">
      <v-text-field label="标签,多个用英文逗号隔开" hide-details v-model="post.tag">
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
      <v-card-row actions >
        <v-btn class="mr-3" default  large @click.native="resetPost">重置</v-btn>

        <v-btn class="white--text" error large :disabled="post.title===''" @click.native="submitPost()">发布</v-btn>
      </v-card-row>
    </div>
  </v-card>
</template>

<script>
  import markdownEditor from '../../components/markdownEditor'
  export default {
    name: 'NewPostPage',
    head: () => ({
      title: '新建博客'
    }),
    data: () => ({
      post: {
        title: '',
        content: '',
        tag: ''
      },
      msg: '',
      alert: false,
      token: '',
      policy: ''
    }),
    components: {
      markdownEditor
    },
    mounted () {

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