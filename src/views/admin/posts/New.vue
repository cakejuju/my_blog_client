<template>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="20"
          v-model="post.content"
          imgUploadUrl="//192.168.31.20:9292/upload/posts_img"
          :imgBaseUrl="config.UPyun.url_prefix + '/'"></markdownEditor>
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