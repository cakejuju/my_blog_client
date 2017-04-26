
<template>
<v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar :left-fixed-sidebar="sidebar">
  <v-toolbar  class="red">
    <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
    <!-- <v-toolbar-logo>My Blog</v-toolbar-logo> -->

    <v-toolbar-title class="hidden-sm-and-down">My Blog</v-toolbar-title>
    <v-text-field prepend-icon="search" label="Search..." hide-details single-line dark></v-text-field>

  </v-toolbar>
  <main>
    <v-sidebar class="indigo darken-1" drawer v-model="sidebar" height="100%">
      <v-list dense>
        <v-list-item v-for="(item,i) in items" :key="i">
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>{{ item.avatar }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title" />
            </v-list-tile-content>
          </v-list-tile>

        </v-list-item>
      </v-list>
    </v-sidebar>


    <router-view></router-view>


  </main>




  <v-footer>
    <div class="text-xs4right">© 2017</div>
  </v-footer>
</v-app>


<!-- 
<v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar>
  <v-toolbar class="secondary">
    <v-toolbar-side-icon @click.native.stop="sidebar2 = !sidebar2" />
  </v-toolbar>
  <main>
    <v-sidebar class="blue darken-3" drawer v-model="sidebar2" height="100%">
      <v-list dense>
        <v-list-item v-for="(item,i) in items" :key="i">
          <v-list-tile>
            <v-list-tile-title v-text="item.title" />    
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-sidebar>
    <v-content>
      <v-container fluid></v-container>
    </v-content>
  </main>
</v-app> -->





</template>

<script>
// 引入瀑布流的插件
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'


export default {
  name: 'world',
  data () {
    return {
     
      sidebar: true,
      items:[{title: 'Home', avatar: 'home'},{title: 'About', avatar: 'face'}],
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
      msg: 'Welcome to Your Vue.js App',
        grow: [3, 2, 1, 2],
      items2: [{height:100, width: 100, index:0, style:{background:"rgba(245,163,59,.5)"}},
               {top:0, height:100, width: 100, index:0, style:{background:"rgba(245,163,59,.5)"}}],
      isBusy: false
    }
  },
  components: {
    Waterfall,
    WaterfallSlot
  },
  methods: {
   sendTestAjax(){
      this.axios.get('/api/get_some_data')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
   },
  addItems: function () {
    if (!this.isBusy && this.items2.length < 500) {
      this.isBusy = true
      this.items2.push.apply(this.items2, ItemFactory.get(50))
    }
  },
  shuffle: function () {
    this.items2.sort(function () {
      return Math.random() - 0.5
    })
  },
  reflowed: function () {
    this.isBusy = false
  }

  },
  mounted: function () {
    this.sendTestAjax()
    // this.items2 = ItemFactory.get(100)
    // console.log(this.items2[0])

  }
}


  // document.body.addEventListener('click', function () {
  //   app.shuffle()
  //   // app.$refs.waterfall.$emit('reflow') // manually trigger reflow action
  // }, false)
  // window.addEventListener('scroll', function () {
  //   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //   if (scrollTop + window.innerHeight >= document.body.clientHeight) {
  //     app.addItems()
  //   }
  // })


var ItemFactory = (function () {

  var lastIndex = 0

  function generateRandomItems (count) {
    var items = [], i
    for (i = 0; i < count; i++) {
      items[i] = {
        index: lastIndex++,
        style: {
          background: getRandomColor()
        },
        width: 100 + ~~(Math.random() * 50),
        height: 100 + ~~(Math.random() * 50)
      }

    }
    return items
  }

  function getRandomColor () {
    var colors = [
      'rgba(21,174,103,.5)',
      'rgba(245,163,59,.5)',
      'rgba(255,230,135,.5)',
      'rgba(194,217,78,.5)',
      'rgba(195,123,177,.5)',
      'rgba(125,205,244,.5)'
    ]
    return colors[~~(Math.random() * colors.length)]
  }

  return {
    get: generateRandomItems
  }

})()

</script>



