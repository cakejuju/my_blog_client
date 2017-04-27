<template>
  <v-card id="post-card">
    <!-- 头部 -->
    <v-card-row >
<!--       <v-card-title :class="item.titleColor != null ? item.titleColor : 'blue accent-2'">
        <span :class="item.titleTextColor != null ? item.titleTextColor : 'white--text'">{{item.title}}</span>
        <v-spacer></v-spacer>
        <div>
          <v-menu id="marriot" bottom left origin="top right">
            <v-btn icon="icon" slot="activator" :class="item.titleTextColor != null ? item.titleTextColor : 'white--text'">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Never show rewards</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
 -->
      <v-list-tile avatar style="width:100%" :class="item.titleColor != null ? item.titleColor : 'white'">
        <v-list-tile-avatar>
          <img v-bind:src="'/static/head.png'"/>
        </v-list-tile-avatar>
        <v-list-tile-content :class="item.titleTextColor != null ? item.titleTextColor : 'grey--text text--darken-4'">
          <v-list-tile-title v-html="item.title" />
        </v-list-tile-content>
        <v-list-tile-action bottom left origin="top right" >
          <font style="font-weight: 300; font-size:15px" :class="item.titleTextColor != null ? item.titleTextColor : 'grey--text text--darken-4'"> 3 小时</font>
        </v-list-tile-action>
      </v-list-tile>

    </v-card-row>
    <!-- 文字 -->
    <v-card-text>
      <div>
        <div v-html="item.content"></div>
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