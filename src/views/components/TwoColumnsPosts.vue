<template>

  <div>
    <!-- <h2 >{{windowWidth}}</h2> -->
    <div class="row" v-if="windowWidth<1200">
      <v-col xs12 sm12 lg12 xl12 v-for="item in postsData.all" :key="item" style="margin:20px 0px;">
         <post-card :item="item" :imgHeight="'350px'"  @tagClicked="tagClicked"/>
      </v-col>
    </div>

     <div class="row" v-if="windowWidth>=1200">

       <div style="width:50%; height:100%; float:left">
         <v-col xs12 v-for="item in postsData.left" :key="item.id" style="margin:20px 6px">
          <post-card  :item="item" :imgHeight="'400px'"  @tagClicked="tagClicked"></post-card>
          </v-col>
       </div>

       <div style="width:50%;height:100%; float:left">
         <v-col xs12 v-for="item in postsData.right" :key="item.id" style="margin:20px 6px">
           <post-card  :item="item" :imgHeight="'400px'" @tagClicked="tagClicked"></post-card>
         </v-col>
       </div>
    </div>

  </div>



</template>

<style>
</style>

<script>

import PostCard from '../components/PostCard'
  export default {
    name: 'TwoColumnsPosts',
    components: {
      'post-card': PostCard
    },
    props: {
      postsData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        windowWidth: 0,
        columns: [{data: 'left', style: 'width:50%;height:100%; float:left'}, 
                  {data: 'right', style: 'width:50%;height:100%; float:right'}]
      }
    },
    methods:{
      tagClicked(id, name){
        this.$emit('tagClicked', id, name)
      },
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      }
    },
    mounted(){
      this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
        //Init
        this.getWindowWidth()
      })
    }

  }
</script>