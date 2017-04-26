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

<!--     <v-content>
    <v-col xs4 v-for="i in 12" :key="i">
      <v-card class="secondary">
        <v-card-text>1</v-card-text>
      </v-card>
    </v-col>
      <v-container fluid>
        
      </v-container>
    </v-content> -->

  <div class="component-example__container">
   <div class="container container--fluid">
    <div class="row">
    <div class="col xs4"><v-card class="blue darken-4 white--text">
  <v-card-row height="200px">
    <v-card-title>
      Featured Event: <br>
      May 24, 2016 <br>
      7-11pm
    </v-card-title>
  </v-card-row>
  <v-card-row actions>
    <v-btn flat class="white--text">Add to Calendar</v-btn>
    <v-spacer></v-spacer>
    <v-btn icon dark>
      <v-icon>event</v-icon>
    </v-btn>
  </v-card-row>
</v-card>
</div>
<div class="col xs4"><v-card class="blue darken-4 white--text">
  <v-card-row height="200px">
    <v-card-title>
      Featured Event: <br>
      May 24, 2016 <br>
      7-11pm
    </v-card-title>
  </v-card-row>
  <v-card-row actions>
    <v-btn flat class="white--text">Add to Calendar</v-btn>
    <v-spacer></v-spacer>
    <v-btn icon dark>
      <v-icon>event</v-icon>
    </v-btn>
  </v-card-row>
</v-card></div>
<div class="col xs4"><v-card class="blue darken-4 white--text">
  <v-card-row height="200px">
    <v-card-title>
      Featured Event: <br>
      May 24, 2016 <br>
      7-11pm
    </v-card-title>
  </v-card-row>
  <v-card-row actions>
    <v-btn flat class="white--text">Add to Calendar</v-btn>
    <v-spacer></v-spacer>
    <v-btn icon dark>
      <v-icon>event</v-icon>
    </v-btn>
  </v-card-row>
</v-card></div>


    <v-col xs4 v-for="i in 4" :key="i">
      <v-card>
        <v-card-row class="green darken-1">
          <v-card-title>
            <span class="white--text">Marriot Rewards</span>
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
                  <v-list-item>
                    <v-list-tile>
                      <v-list-tile-title>Remove Card</v-list-tile-title>
                    </v-list-tile>
                  </v-list-item>
                  <v-list-item>
                    <v-list-tile>
                      <v-list-tile-title>Send Feedback</v-list-tile-title>
                    </v-list-tile>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
        </v-card-row>
        <v-card-text>
          <v-card-row height="75px">
            <v-icon class="mr-5">card_membership</v-icon>
            <div>
              <div>Membership Number</div><strong>113241423</strong>
            </div>
          </v-card-row>
        </v-card-text>
        <v-card-row actions>
          <v-btn flat class="green--text darken-1">View Email</v-btn>
        </v-card-row>
      </v-card>
    </v-col>

  </div></div></div>


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



