<template>
  
   <div class="row" style="width:100%;" >
     <!-- 最左边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.left" :key="item.id" style="margin:20px">
          <v-card >
            <!-- 头部 -->
            <v-card-row class="lime darken-3 ">
              <v-card-title>
                <span class="white--text">{{item.title}}</span>
                <v-spacer></v-spacer>
                <div>
                  <v-menu id="marriot" bottom left origin="top right">
                    <v-btn icon="icon" slot="activator" class="white--text">
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
            </v-card-row>
            <!-- 文字 -->
            <v-card-text>
              <div>
                <div v-html="item.content"></div>
              </div>
            </v-card-text>
            <!-- 图片 -->
            <v-card-row v-if="item.src!='' && item.src!=null" :img=item.src height="280px"></v-card-row>
            <!-- 底部 -->
            <v-card-row actions class="cyan lighten-1 mt-0">
              <v-btn flat class="white--text">点赞呐</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon class="white--text">comment</v-icon>
              </v-btn>
            </v-card-row>
          </v-card>
        </v-col>
     </div>

     <!-- 中间的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.mid" :key="item.id" style="margin:20px">
          <v-card >
            <!-- 头部 -->
            <v-card-row class="light-blue darken-2">
              <v-card-title>
                <span class="white--text">{{item.title}}</span>
                <v-spacer></v-spacer>
                <div>
                  <v-menu id="marriot" bottom left origin="top right">
                    <v-btn icon="icon" slot="activator" class="white--text">
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
            </v-card-row>
            <!-- 文字 -->
            <v-card-text>
              <div>
                <div v-html="item.content"></div>
              </div>
            </v-card-text>
            <!-- 图片 -->
            <v-card-row :img=item.src height="280px"></v-card-row>
            <!-- 底部 -->
            <v-card-row actions class="blue-grey darken-1 mt-0">
              <v-btn flat class="white--text">点赞呐</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon class="white--text">comment</v-icon>
              </v-btn>
            </v-card-row>
          </v-card>
        </v-col>
     </div>

     <!-- 最右边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.right" :key="item.id" style="margin:20px">
          <v-card >
            <!-- 头部 -->
            <v-card-row class="green darken-1">
              <v-card-title>
                <span class="white--text">{{item.title}}</span>
                <v-spacer></v-spacer>
                <div>
                  <v-menu id="marriot" bottom left origin="top right">
                    <v-btn icon="icon" slot="activator" class="white--text">
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
            </v-card-row>
            <!-- 文字 -->
            <v-card-text>
              <div>
                <div v-html="item.content"></div>
              </div>
            </v-card-text>
            <!-- 图片 -->
            <v-card-row :img=item.src height="280px"></v-card-row>
            <!-- 底部 -->
            <v-card-row actions class="grey darken-4 mt-0">
              <v-btn flat class="white--text">点赞呐</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon class="white--text">comment</v-icon>
              </v-btn>
            </v-card-row>
          </v-card>
        </v-col>

     </div>
   </div>
</template>


<script>
var marked = require('marked'); // 引入marked markdown to html

export default {
  name: '',
  data () {
    return {
      asd: "<h1>csdfdsf</h1>",
      message: 'This is a message for <a href="#">John Doe</a>, please update your email address.',
      wfData: {left:[], right:[], mid:[]},
      leftHeight: 0,
      rightHeight: 0,
      midHeight: 0,
      sidebar: true,
      items: [{height: 260, src:'/static/dog.jpg', title:'第一篇文章',content: marked(' 李寻欢，被称作”小李探花”，是明宪宗朱见深成化年间探花（殿试中进士榜一甲第三名）。他出身一个书香世家。李家三父子俱擅长于文墨，均在科举中高中为探花，在家乡以“老李探花”（李寻欢的父亲）、“大李探花”（李寻欢的兄长）、“小李探花”（李寻欢）闻名，李家的门上亦有御书的“一门七进士，父子三探花”对联。由于仕途得志，所以李寻欢早年已于朝廷为官。后来，由于被胡云冀上奏弹劾，以他淡泊名利的性格，终于辞官而去。后来，李寻欢投身江湖，成为首屈一指的武林人物，以飞刀神技闻名。他与林诗音彼此相爱，订下婚约，原欲结为夫妻；后来他因为知道义兄龙啸云爱上林诗音，想报恩于义兄，所以刻意纵情酒色，借故疏远林诗音，促成龙啸云与林诗音的婚姻。并在龙啸云与林诗音成亲之後，把自己的府邸和万贯家财送给林诗音作嫁妆，出关隐姓埋名。\n\nLorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.') },
              {height: 260, src:'/static/lulu.jpg', title:'第二篇文章',content: "<code>console.log('heiheihei')</code><code>console.log('heiheihei')</code><code>console.log('heiheihei')</code><code>console.log('heiheihei')</code>"},
              {height: 260, src:'/static/yue.jpg', title:'第三篇文章',content: "<blockquote> Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</blockquote>"}, 
              {height: 260, src:'/static/meizi.jpg', title:'第四篇文章', content: '<p>If you want to mother boomboom, type command <kbd>rm -rf /*</kbd></p>'},
              {height: 260, src:'/static/luqiya.jpg', title:'第五篇文章'},
              {height: 260, src:'/static/meizi.jpg', title:'第六篇文章'}]
    }
  },
  components: {
  },
  methods: {
    sortItems(item){
      // 若总高度相等 则随机分配, 否则分配给小的 然后增加高度
      let min = Math.min(this.leftHeight,this.rightHeight,this.midHeight)

      if (this.leftHeight === min) {
        this.wfData.left.push(item)
        this.leftHeight += (item.height + 40) // +40是margin
      }else if(this.rightHeight === min){
        this.wfData.right.push(item)
        this.rightHeight += (item.height + 40)
      }else if(this.midHeight === min){
        this.wfData.mid.push(item)
        this.midHeight += (item.height + 40)
      }

    }
  },
  mounted: function () {
    for(var i=0; i < this.items.length; i++){
      this.sortItems(this.items[i])
    }
  }
}

</script>

<style>
body {
  background: #e0e0e0
}
</style>



