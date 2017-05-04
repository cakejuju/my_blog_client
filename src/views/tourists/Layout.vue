<template>
  <v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar :left-fixed-sidebar="sidebar">
    <v-toolbar  class="red" fixed>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-title class="hidden-sm-and-down">My Blog</v-toolbar-title>
      <v-text-field prepend-icon="search" label="关键字搜索..." hide-details single-line dark></v-text-field>
    </v-toolbar>
    <main>
      <v-sidebar class="grey lighten-2" left fixed v-model="sidebar" height="100%">
        <v-list dense>
          <v-list-item v-for="(item,i) in items" :key="item.title">
            <v-divider v-if="item.divider" />
            <v-list-tile style="margin:15px 5px" router :href="item.href">
              <v-list-tile-avatar >
                <v-icon medium class="grey--text text--darken-2">{{ item.avatar }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title style="font-size:14px;font-weight: 500;" class="grey--text text--darken-4" v-text="item.title"/>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
        <div class="text-xs4right" style="position: fixed;left: 15px;bottom: 10px">© 2017  Joey</div>
      </v-sidebar>

      <router-view style="margin-top:80px;width:100%" ></router-view>
    </main>

<!--     <v-footer>
      <div class="text-xs4right">© 2017  Joey</div>
    </v-footer> -->

  </v-app>
</template>

<script>

export default {

  name: 'world',
  data () {
    return {
      sidebar: true,
      items:[ {title: '首页', avatar: 'home', divider: false, href: '/tou/posts'},
              {title: '三列模式', avatar: 'face', divider: false, href: '/tou/posts/three_columns'},
              {title: '关于本站', avatar: 'face', divider: false, href: '/tou/about'},
              {title: '建设中...', avatar: 'build', divider: true, href: '/'}
            ]
    }
  },
  components: {
  },
  methods: {
    navigate(url){
      this.$router.push(url)
    }
  },
  mounted: function () {

  }
}
</script>



