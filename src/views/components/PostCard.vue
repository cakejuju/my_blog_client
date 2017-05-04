<template>
  <v-card id="post-card">
    <!-- 头部 -->
    <v-card-row >

      <v-list-tile avatar style="width:100%" :class="item.title_color != null ? item.title_color : 'white'">
        <!-- 头像，可不用 -->
<!--         <v-list-tile-avatar>
          <img v-bind:src="'/static/head.png'"/>
        </v-list-tile-avatar> -->

        <v-icon style="float:left" :class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">play_arrow</v-icon>

        <div v-for="tag in item.tag_names">
          <v-chip @click.native="tagClicked(tag.id, tag.name)"  label :class="item.title_text_color != null ? '' : 'secondary white--text'" style="margin-right:0px">{{tag.name}}</v-chip>
        </div>

        <v-list-tile-content :class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">
        </v-list-tile-content>

        <v-list-tile-action>
          <font style="font-weight: 300; font-size:15px" :class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">{{item.written_time}}</font>
        </v-list-tile-action>
      </v-list-tile>


    </v-card-row>
    <v-card-row style="height:30px;margin-top:5px" >
      <v-card-title>
        <span class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">{{item.title}}</span>
      </v-card-title>
    </v-card-row>
    <!-- 文字 -->
  
    <v-card-text>
      <v-card-row @click.native="$router.push('/tou/posts/' + item.id)">
        <div >
          <div v-html="item.l_content" ></div>
        </div>
      </v-card-row>

    </v-card-text>


    <!-- 图片 -->
    <v-card-row>
      <img v-if="item.img_url!='' && item.img_url!=null" :img=item.img_url :src="item.img_url" style="width:100%;height:auto"></img>
    </v-card-row>
    <!-- 底部 -->

    <v-card-row actions :class="item.bottom_color != null ? item.bottom_color : 'white'">
      <v-btn flat :class="item.bottom_text_color != null ? item.bottom_text_color : 'grey--text text--darken-4'">点赞呐</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon :class="item.bottom_text_color != null ? item.bottom_text_color : 'grey--text text--darken-4'">comment</v-icon>
      </v-btn>
    </v-card-row>


  </v-card>
</template>

<script>
  export default {
    name: 'PostCard',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods:{
      tagClicked(id, name){
        this.$emit('tagClicked', id, name)
      }
    }
  }
</script>