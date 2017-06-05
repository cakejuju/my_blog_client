<template>

  <div>
    <!-- 小屏幕只显示一列 -->
    <div class="row" v-if="windowWidth < 1000">
      <v-col xs12 sm12 lg12 xl12 v-for="item in postsData.all" :key="item" style="margin:20px 0px;">
         <post-card :item="item"  @tagClicked="tagClicked"/>
      </v-col>
    </div>

    <!-- 大屏幕显示两列 -->
    <div class="row" v-if="windowWidth >= 1000">
        <!-- 左侧 -->
       <div style="width:50%; float:left">
         <v-col xs12 v-for="item in postsData.left" :key="item.id" style="margin:20px 6px">
          <post-card  :item="item"  @tagClicked="tagClicked"></post-card>
         </v-col>
       </div>
       <!-- 右侧 -->
       <div style="width:50%;float:left">
         <v-col xs12 v-for="item in postsData.right" :key="item.id" style="margin:20px 6px">
           <post-card  :item="item" @tagClicked="tagClicked"></post-card>
         </v-col>
       </div>
    </div>
 
  </div>



</template>

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