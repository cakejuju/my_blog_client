<template>
  <div id="Photography">

      <transition name="fade" v-on:after-leave="photoDisplay = true">
        <div class="photo-preview" v-if="photoDisplay">

          <div class="auto_img">
            <img @click="nextPhoto" id="photography" :src="photos[photoIndex] ? photos[photoIndex].img_url : ''"></img>

            <div class="afuckclass" >
              <v-card-row style="height:100%; background-color: rgba(220,220,220, 0);" >
                <v-list-tile-action style="margin-left:0.5rem;">
                  <font style="margin-left:0.5rem;font-weight: 500; font-size:15px">
                    {{photos[photoIndex] ? photos[photoIndex].description : '暂无描述'}}
                  </font>
                </v-list-tile-action>

                <v-spacer></v-spacer>

                <el-tooltip placement="top" effect="light">
                  <!-- 悬浮显示照片详情 -->
                  <div slot="content" style="width:300px">
                    <v-card-text  style="height:auto;margin-top:1em;">
                      <div style="text-align: center;">
                        <h5 > {{photoAtr(photos[photoIndex], 'description')}}</h5>
   
                        <v-divider/>
                        <!-- <v-divider/> -->
                        
                        <div>
                          <v-icon medium>linked_camera</v-icon>
                          <p>{{photoExif(photos[photoIndex], 'Model')}}</p>
                        </div>

                        <div class="row" style="width:100%;" >
                          <div style="width:25%;height:100%; float:left">
                            <!-- 焦距 -->
                            {{photoExif(photos[photoIndex], 'FocalLengthIn35mmFilm')}}mm
                          </div>
                          <div style="width:25%;height:100%; float:left">
                            <!-- f 值 -->
                            f/{{photoExif(photos[photoIndex], 'FNumber')}}
                          </div>
                          
                         <div style="width:25%;height:100%; float:left">
                            <!-- 曝光时间 -->
                            {{photoExif(photos[photoIndex], 'ExposureTime')}}s
                          </div>

                          <div style="width:25%;height:100%; float:left">
                            <!-- ISO 值 -->
                            ISO{{photoExif(photos[photoIndex], 'ISOSpeedRatings')}}
                          </div>
                        </div>

                        <br>
                        <v-divider/>


                        <div class="row" style="width:100%;margin-top:1rem" >
                          <div style="width:50%;height:100%; float:left">
                            <h6>拍摄于</h6>
                            {{photoExif(photos[photoIndex], 'DateTime')}}
                          </div>
                          <div style="width:50%;height:100%; float:left">
                            <h6>上传于</h6>
                            {{photoAtr(photos[photoIndex], 'shot_at')}}
                          </div>
                        </div>
                       

                      </div>

                    </v-card-text>
   
                   <!-- <br/>第二行信息 -->
                  </div>

                  <button  type="button" class="el-tooltip">
                    <span>
                      <button type="button" class="btn btn--icon btn--raised grey--text text--darken-4">
                        <span class="btn__content">
                          <i class="material-icons icon">info</i>
                        </span>
                      </button>
                    </span>
                  </button>

                </el-tooltip>

              </v-card-row>
            </div>

          </div>
        </div>
      </transition>


    <div class="photo-list">
      <div class="photo-thumbnails" v-for="(photo, index) in photos" @click="photoChoose(index)">
        <div class="photo-mask" v-if="photoIndex !== index"></div>
        <img :src="photo ? (photo.img_url + '!thumbnails') : ''">
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Photography',
    data: () => ({
      photoIndex: 0,
      photoDisplay: true
    }),
    head: () => ({
      title: ''
    }),
    props: {
      photos: {
        type: Array
      }
    },
    methods: {
      photoAtr(photo, atr){
        if (photo) {
          if (photo[atr]) {
            return photo[atr]
          }else{
            return ''
          }
        }else{
          return '暂无描述'
        }
      },
      photoExif(photo, atr){
        if (photo) {
          if (photo.exif_v) {
            if (photo.exif_v[atr]) {
              if (atr == 'FNumber') {
                return eval(photo.exif_v[atr])
              }
              return photo.exif_v[atr]
            }else{
              return '暂无'
            }
          }else{
            return '暂无'
          }
        }else{
          return '暂无'
        }

      },
      nextPhoto () {
        this.photoDisplay = false
        if (this.photoIndex < this.photos.length - 1) {
          this.photoIndex ++
        } else {
          this.photoIndex = 0
        }
      },
      photoChoose (index) {
        this.photoDisplay = false
        this.photoIndex = index
      }
    },
    mounted: function () {
      // document.addEventListener('click', (e) => {console.log(e.target)})
    }
  }
</script>

<style lang='scss' scoped>

  @media (max-width: 450px) {
    #Photography .photo-preview {
      height: 300px !important;
    }
  }
  
  #Photography .photo-preview .auto_img:hover .afuckclass  {
    height: 7%;
  }

  #Photography {
    margin-top:20px;
    width: 100%;
    .photo-preview { 
      width: 100%;
      height: 600px;
      text-align: center;
      margin-bottom: 1rem;
      
      img {
        margin-bottom: -0.4rem;
        max-width: 100%;
        max-height: 100%;
        vertical-align: center;
      }
      .auto_img {
        height: 550px;
        display: inline-block;
        // margin: auto;
        img {
          max-width: 100%;
          max-height: 100%;
          vertical-align: center;
        }
      }
      .afuckclass {
        position: relative;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0;
        background-color: rgba(255, 255, 255, 0.5);
        overflow: hidden;
        transition: 0.3s ease;
        transform: translate(0, -100%);
      }

    }
    .photo-list {
      width: 100%;
      text-align: center;
      .photo-thumbnails {
        display: inline-block;
        position: relative;
        height: 50px;
        margin: 0 5px;
        cursor: pointer;
        .photo-mask {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.5);
          z-index: 10;
        }
        img {
          height: 100%;
        }
      }
    }
  }
</style>
