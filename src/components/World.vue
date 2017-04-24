<template>
 <div>
 <p>Hello World</p>
 </div>
</template>

<script>


export default {
  name: 'world',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
   sendTestAjax(){
      this.axios.get('/api/get_some_data')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
   }
  },
  mounted: function () {
    this.sendTestAjax()

  }

}


</script>