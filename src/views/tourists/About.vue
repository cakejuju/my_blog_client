<template>
  <!-- <p>这里是关于页面呀</p>   -->
  <v-card class="aboutpage-container">
    <v-card-text  style="height:auto;margin-top:1em">
      <h5 style="">关于我</h5>
     <v-list-tile avatar style="width:100%" :class="'white'">

        <v-list-tile-avatar>
          <a href="https://github.com/cakejuju"><img v-bind:src="'/static/github.png'"/></a>
        </v-list-tile-avatar>
        <p><a href="https://github.com/cakejuju">我的github</a></p>
      </v-list-tile>

     <v-divider/>
     <v-card-row >
     <div>
       <h5 style="margin-top:1em">关于本站</h5>
       <p> 上线于  2017年 4 月 21 日，记录我的一些心得体会，有趣的事，希望能坚持下去。</p>
     </div>

     </v-card-row>
     <v-divider/>
     <br>
      <v-card-row >
        <div>
          <h5>License</h5>
          <p>The MIT License (MIT)</p>
          <p>Copyright (c) 2017 Joey</p>
<!--           <p>Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:</p>

          <p>The above copyright notice and this permission notice shall be included in
          all copies or substantial portions of the Software.</p>

          <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
          THE SOFTWARE.</p> -->
        </div>
      </v-card-row>
    </v-card-text>
  </v-card>
</template>

<style>
  
.aboutpage-container {
 margin: 2rem auto 0 auto;
 width: 90%;
 font-family: "Classic Grotesque W01", "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, "Hiragino Sans GB", "PingFang SC", "Heiti SC", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans", sans-serif;
}
@media only screen and (min-width: 720px) {
  .aboutpage-container {
    width: 100%;
  }
}
@media only screen and (min-width: 960px) {
  .aboutpage-container {
    width: 100%;
  }
} 
@media only screen and (min-width: 1280px) {
  .aboutpage-container {
    width: 90%;
  }
} 

</style>


<script>
import marked from 'marked'
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
  },
  mounted: function () {
    // console.log(marked('[我的github传送门](https://github.com/cakejuju)'))
  }
}

</script>




