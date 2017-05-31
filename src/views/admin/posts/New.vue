<template>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="20"
          v-model="post.content"
          imgUploadUrl="http://v0.api.upyun.com/touko-blog-img"
          imgBaseUrl="http://touko-blog-img.b0.upaiyun.com/"></markdownEditor>
      </v-card-text>
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
        display: true
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

    }
  }
</script>