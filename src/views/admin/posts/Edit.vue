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

    // mounted(){
    //   window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    // },
    // methods: {
    //   beforeunloadHandler (e) {
    //    alert("dfs")
    //   }
    // },
  }


// window.onbeforeunload = function (e) {
//   var message = "Your confirmation message goes here.",
//   e = e || window.event;
//   // For IE and Firefox
//   if (e) {
//     e.returnValue = message;
//   }
//   // For Safari
//   return message;
// };
</script>