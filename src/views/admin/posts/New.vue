
<template>
 <div style="width:90%">
   <postForm action="new"></postForm>
 </div>
</template>

<script>
  import postForm from './Form'
  export default {
    name: 'NewPostPage',
    head: () => ({
      title: '新建博客'
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