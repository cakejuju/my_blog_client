<template>
 <div style="width:90%"> 
   <postForm action="edit" :postId="parseInt(this.$route.params.id)"></postForm>
 </div>
</template>

<script>
  import postForm from './Form'
  export default {
    name: 'EditPostPage',
    head: () => ({
      title: '编辑博客'
    }),
    data: () => ({

    }),
    components: {
      postForm
    },
    mounted () {

    },
    methods: {
    }
  }
</script>