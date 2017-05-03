<template>
   <div class="row" style="width:100%;" >
     <!-- 最左边的一列 -->

     <div style="width:50%;height:100%; float:left">
       <v-col xs12 v-for="item in postsData.left" :key="item.id" style="margin:20px 6px">
        <post-card  :item="item" :imgHeight="'400px'"  @tagClicked="tagClicked"></post-card>
        </v-col>
     </div>

     <!-- 最右边的一列 -->
     <div style="width:50%;height:100%; float:left">
       <v-col xs12 v-for="item in postsData.right" :key="item.id" style="margin:20px 6px">
         <post-card  :item="item" :imgHeight="'400px'" @tagClicked="tagClicked"></post-card>
       </v-col>
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
        // columns: ['left','right'],
        columns: [{data: 'left', style: 'width:50%;height:100%; float:left'}, 
                  {data: 'right', style: 'width:50%;height:100%; float:right'}]
      }
    },
    methods:{
      tagClicked(id){
        console.log('两列子组件被点击：' + id)
        this.$emit('tagClicked', id)
      }
    }
  }
</script>