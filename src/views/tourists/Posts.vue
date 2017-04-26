<template>
  
   <div class="row" style="width:100%;">
     <!-- 最左边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.left" :key="item.id" style="margin:20px">
          <v-card class="blue darken-4 white--text">
            <v-card-row :height="(item+'px')">
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
        </v-col>
     </div>

     <!-- 中间的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.mid" :key="item" style="margin:20px">
          <v-card class="blue darken-4 white--text">
            <v-card-row :height="(item+'px')">
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
        </v-col>
     </div>

     <!-- 最右边的一列 -->
     <div style="width:33.33%;height:100%; float:left">
       <v-col xs12 v-for="item in wfData.right" :key="item" style="margin:20px">
          <v-card class="blue darken-4 white--text">
             <v-card-row :height="(item+'px')">
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
        </v-col>

     </div>

   </div>

</template>


<script>

export default {
  name: '',
  data () {
    return {
      asd: '10px',
      wfData: {left:[], right:[], mid:[]},
      leftHeight: 0,
      rightHeight: 0,
      midHeight: 0,
      sidebar: true,
      items: [{height: 50},{height: 100},{height: 40}, 
              {height: 150},{height: 35},{height: 66},
              {height: 256},{height: 133},{height: 133},{height: 133}]
    }
  },
  components: {
  },
  methods: {
    sortItems(item){
      // 若总高度相等 则随机分配, 否则分配给小的 然后增加高度
      let min = Math.min(this.leftHeight,this.rightHeight,this.midHeight)

      if (this.leftHeight === min) {
        this.wfData.left.push(item.height)
        this.leftHeight += (item.height + 40) // +40是margin
      }else if(this.rightHeight === min){
        this.wfData.right.push(item.height)
        this.rightHeight += (item.height + 40)
      }else if(this.midHeight === min){
        this.wfData.mid.push(item.height)
        this.midHeight += (item.height + 40)
      }

    }
  },
  mounted: function () {
    for(var i=0; i < this.items.length; i++){
      this.sortItems(this.items[i])
    }
    // console.log(this.wfData.left)
  }
}


</script>
</script>



