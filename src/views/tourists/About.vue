<template>
  <v-card class="aboutpage-container" style="width:80%">
    <v-card-text  style="height:auto;margin-top:1em;">
      <div style="text-align: center;">
        <h5 >关于我</h5>
        

        <div class="row" style="width:100%;margin-top:3rem" >
          <div style="width:50%;height:100%; float:left">
            <li><a href="https://github.com/joeeeeey">GitHub</a></li>

          </div>
          <div style="width:50%;height:100%; float:left">

            <li><a href="https://joeeeeey.github.io/cn_resume/">Resume</a></li>
          </div>
        </div>

      </div>
      <br>
      <v-divider/><v-divider/>
      
     

     <!-- <v-card-row > -->
       <div style="text-align: center;">
         <h5 style="margin-top:1em">关于本站</h5>
         <p> 上线于  2017年 4 月 21 日，记录我的一些心得体会，有趣的事，希望能坚持下去。</p>
       </div>
     <!-- </v-card-row> -->

     <v-divider/><v-divider/>
     <br>
      <!-- <v-card-row > -->
        <div style="text-align: center;">
          <h5>License</h5>
          <p>The MIT License (MIT)</p>
          <p>Copyright (c) 2017 Joey</p>
        </div>
      <!-- </v-card-row> -->
    </v-card-text>
  </v-card>
</template>

<style>
  
.aboutpage-container {
 margin: 2rem auto 0 auto;
 /*width: 90%;*/
 font-family: "Classic Grotesque W01", "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, "Hiragino Sans GB", "PingFang SC", "Heiti SC", "Microsoft YaHei UI", "Microsoft YaHei", "Source Han Sans", sans-serif;
}
@media only screen and (min-width: 720px) {
  .aboutpage-container {
    width: 100%;
  }
}
@media only screen and (min-width: 960px) {
  .aboutpage-container {
    width: 60%;
  }
} 
@media only screen and (min-width: 1280px) {
  .aboutpage-container {
    width: 60%;
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
  }
}

</script>




