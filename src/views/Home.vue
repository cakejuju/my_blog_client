<template>

<v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar>
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
<!--           <v-list-tile>
            <v-list-tile-title v-text="item.title" />    
          </v-list-tile> -->
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
    <v-content>
      <v-container fluid></v-container>
    </v-content>

<!-- <v-card hover raised>
  <v-card-row height="300px" class="pa-5 grey lighten-1">
    <div class="display-1 white--text text-xs-center">YOUR PRODUCT</div>
  </v-card-row>
</v-card> -->


  </main>


  <v-footer>
    <div class="text-xs-right">© 2017</div>
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


export default {
  name: 'world',
  data () {
    return {
     
      sidebar: true,
      items:[{title: 'Home', avatar: 'home'},{title: 'About', avatar: 'face'}],
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
      msg: 'Welcome to Your Vue.js App'
    }
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
   }
  },
  mounted: function () {
    this.sendTestAjax()

  }

}
</script>



