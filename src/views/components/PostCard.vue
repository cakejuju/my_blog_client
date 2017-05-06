<template>
  <v-card id="post-card" >
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

    <v-card-row style="height:20px;margin-top:5px">
      <v-card-title>
        <span style="font-size:17px;font-weight:500" class="item.title_text_color != null ? item.title_text_color : 'grey--text text--darken-4'">{{item.title}}</span>
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
      <v-btn @click.native="showCommentValue = !showCommentValue" icon>
        <v-icon :class="item.bottom_text_color != null ? item.bottom_text_color : 'grey--text text--darken-4'">comment</v-icon>
      </v-btn>
    </v-card-row>


    <transition name="slide-fade">
      <div v-if="showCommentValue">
      <v-list  style="max-height:18em;overflow: scroll" three-line >
        <template v-for="i in 6">
          <v-card>
            <v-list-tile avatar style="width:100%;" :class="'white'">
              <!-- 头像，可不用 -->
              <v-list-tile-avatar >
                <img v-bind:src="'/static/head.png'"/>
              </v-list-tile-avatar>

              <v-list-tile-content :class="'grey--text text--darken-4'">
                <v-list-tile-title v-html="'<p>某位游客</p>'" />
              </v-list-tile-content>

              <v-list-tile-action>
                <p style="font-weight: 300; font-size:15px" :class="'grey--text text--darken-4'">5小时</p>
              </v-list-tile-action>
            </v-list-tile>

              <v-card-text style="padding-top:0px;padding-bottom:0px;">
                <v-card-row style="">
                  <div style="" v-html="'<p>好长呀这句话弄得我都要滚动了呢好长呀这句话弄得我都要滚动了呢好长呀这句话弄得我都要滚动了呢好长呀这句话弄得我都要滚动了呢好长呀这句话弄得我都要滚动了呢 </p>'" ></div>
                </v-card-row>
              </v-card-text>
          </v-card>
        </template>
      </v-list>


      <v-card-text>
        <v-list-tile-avatar style="justify-content: flex-start;">
          <img v-bind:src="'/static/head.png'" />
        </v-list-tile-avatar>

        <v-text-field style="padding:0 0" label="说点什么呢.." full-width single-line multi-line  hint="这里是评论区呀" >
        </v-text-field>
        
      </v-card-text>

   </div>

    </transition>



  </v-card>
</template>
<style>

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateY(-50px);
  opacity: 0;
}

</style>

<script>
  export default {
  data () {
    return {
      showCommentValue: false
      }
    },
    name: 'PostCard',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods:{
      showComment(){
        console.log('showComment')
      },
      tagClicked(id, name){
        this.$emit('tagClicked', id, name)
      }
    }
  }
</script>