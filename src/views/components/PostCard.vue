<template>
  <v-card id="post-card">
    <!-- 头部 -->
    <v-card-row >

      <v-list-tile avatar style="width:100%" :class="item.titleColor != null ? item.titleColor : 'white'">
        <!-- 头像，可不用 -->
        <v-list-tile-avatar>
          <img v-bind:src="'/static/head.png'"/>
        </v-list-tile-avatar>



        <v-icon style="float:left" :class="item.titleTextColor != null ? item.titleTextColor : 'grey--text text--darken-4'">play_arrow</v-icon>

        <div v-for="tag in item.tag">
          <v-chip label :class="item.titleTextColor != null ? '' : 'secondary white--text'" style="margin-right:0px">{{tag}}</v-chip>
        </div>
        <!-- <v-chip label style="margin-right:0px">胡扯</v-chip> -->

        <v-list-tile-content :class="item.titleTextColor != null ? item.titleTextColor : 'grey--text text--darken-4'">
        </v-list-tile-content>

        <v-list-tile-action>
          <font style="font-weight: 300; font-size:15px" :class="item.titleTextColor != null ? item.titleTextColor : 'grey--text text--darken-4'"> 3 小时</font>
        </v-list-tile-action>




      </v-list-tile>
    </v-card-row>
    <v-card-row style="height:30px;margin-top:5px">
      <v-card-title>
        <span class="item.titleTextColor != null ? item.titleTextColor : 'grey--text text--darken-4'">{{item.title}}</span>
      </v-card-title>
    </v-card-row>
    <!-- 文字 -->
    <v-card-text>
      <div>
        <div v-html="item.content" ></div>
      </div>
    </v-card-text>
    <!-- 图片 -->
    <v-card-row v-if="item.src!='' && item.src!=null" :img=item.src height="250px"></v-card-row>
    <!-- 底部 -->
    <v-card-row actions :class="item.bottomColor != null ? item.bottomColor : 'blue-grey darken-2'">
      <v-btn flat :class="item.bottomTextColor != null ? item.bottomTextColor : 'white--text'">点赞呐</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon :class="item.bottomTextColor != null ? item.bottomTextColor : 'white--text'">comment</v-icon>
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
    }
  }
</script>