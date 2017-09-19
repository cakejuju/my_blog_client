<template>
  <div class="index">
    <h3>还没开搞</h3>
    <Photography :photos="[]"></Photography>
  </div>
</template>

<script>
  import axios from 'axios'
  // import Photography from '~components/Photography'
  import Photography from '../components/Photography'
  export default {
    head: {
    },
    components: {
      Photography
    },
    // asyncData: (context) => {
    //   return axios.get(`${context.env.baseUrl}/api/photo/list/photo`).then((res) => {
    //     if (res.data.success) {
    //       return {photos: res.data.fileList}
    //     } else {
    //       return {photos: []}
    //     }
    //   })
    // }
  }
</script>