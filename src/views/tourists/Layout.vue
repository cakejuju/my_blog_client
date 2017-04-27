<template>
  <v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar :left-fixed-sidebar="sidebar">
    <v-toolbar  class="red">
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-title class="hidden-sm-and-down">My Blog</v-toolbar-title>
      <v-text-field prepend-icon="search" label="Search..." hide-details single-line dark></v-text-field>
    </v-toolbar>
    <main>
      <v-sidebar class="blue-grey darken-1" drawer v-model="sidebar" height="100%">
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
</template>

<script>

export default {
  name: 'world',
  data () {
    return {
      sidebar: true,
      items:[{title: 'Home', avatar: 'home'},{title: 'About', avatar: 'face'}]
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


