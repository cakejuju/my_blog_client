<template>
   <div class="row" style="width:100%;" >
     <!-- 最左边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in postsData.left" :key="item.id" style="margin:20px 6px">
        <post-card  :item="item" :imgHeight="'240px'"></post-card>
        </v-col>
     </div>

     <!-- 中间的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in postsData.mid" :key="item.id" style="margin:20px 6px">
         <post-card  :item="item" :imgHeight="'240px'"></post-card>
       </v-col>
     </div>

     <!-- 最右边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in postsData.right" :key="item.id" style="margin:20px 6px">
         <post-card  :item="item" :imgHeight="'240px'"></post-card>
       </v-col>
     </div>

   </div>

</template>


<script>
import PostCard from '../components/PostCard'

  export default {
    name: 'ThreeColumnsPosts',
    components: {
      'post-card': PostCard
    },
    props: {
      postsData: {
        type: Object,
        required: true
      }
    }
  }
</script>