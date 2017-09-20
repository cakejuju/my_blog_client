<template>
  <div class="index" style="width:100%">
    <Photography :photos="photos"></Photography>
  </div>
</template>

<script>
  import axios from 'axios'
  import Photography from '../components/Photography'
  export default {
    data () {
      return {    
        limit: 100,
        current_page: 1,
        photos: [],
      }
    },
    head: {
    },
    methods: {
      queryParams(){
        let order_params = {sort_by: 'created_at', order: 'DESC'}

        let query_params = {limit:          this.limit, 
                            current_page:   this.current_page,
                            order_params:   order_params,
                            json_methods:   ['exif_v', 'shot_time'],
                            json_only: ['description', 'created_at', 'img_url']}

        return query_params;
      },
      getPhotographs(){
         let params = this.queryParams()
         this.axios.post('/api/get_photographs', params)    
         .then((response) => {  
          console.log(response)
           let data = response.data
           if (data.success == 1) {
             this.photos =  data.json_data
             console.log(this.photos)
           }
            
         })    
         .catch(function (error) {   
           console.log(error);   
         });   
      }
    },
    components: {
      Photography
    },
    mounted: function () {
      this.getPhotographs()
    }

  }
</script>