<template>
  <div>
    <div v-if="loading">
      <infinite-loading class="loading_view" spinner="waveDots" :on-infinite="onInfinite" ref="infiniteLoading" />
    </div>
    <div v-else>
      <div class="top">
        <blur class="blur_bg" :blur-amount=60 :url="data.avatar_url" />
      </div>
      <div class="top2">
          <img class="close_btn" src="../assets/arrow_back.png" @click="clickBack"/>
          <div class="avatar_layout">
            <x-img class="avatar" :src="data.avatar_url" />
          </div>
      </div>
       <div class="bottom">
         <div class="info">NAME
           <div class="info_value">
             {{ data.name }}
           </div>
         </div>
         <div class="info">BIO
           <div class="info_value">{{ data.bio }}</div>
         </div>
         <div class="info">LOCATION
           <div class="info_value">{{ data.location }}</div>
         </div>
         <div class="info">COMPANY
           <div class="info_value">{{ data.company }}</div>
         </div>
         <div class="info">EMAIL
           <div class="info_value">{{ data.email }}</div>
         </div>
         <div class="info">BLOG
           <div class="info_value">{{ data.blog }}</div>
         </div>
         <div class="info">FOLLOWERS
           <div class="info_value">{{ data.followers }}</div>
         </div>
         <div class="info">URL
           <div class="info_value">{{ data.url }}</span></div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { XImg, Blur, AlertPlugin } from 'vux'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(AlertPlugin)

export default {
  data () {
    return {
      title: 'StevenDXC',
      data: null,
      loading: true
    }
  },
  created: function () {
    Vue.axios.get('https://api.github.com/users/stevenDXC').then((res) => {
      this.data = res.data
      console.log(this.data)
      this.loading = false
    }).catch((error) => {
      console.log(error)
      this.loading = false
      this.showAlert('failed')
    })
  },
  methods: {
    clickBack () {
      this.$router.back()
    },
    showAlert (error) {
      this.$vux.alert.show({
        title: 'error',
        content: error
      })
    }
  },
  components: {
    XImg,
    Blur,
    InfiniteLoading,
    AlertPlugin
  }
}
</script>

<style>
.top{
  height: 180px;
  position: relative;
}
.top2{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 180px;
}
.blur_bg{
  height: 180px;
}
.bottom{
  flex: 1;
  flex-direction: row;
  padding-left: 16px;
  padding-top: 16px;
  margin-top: 10px;
}
.close_btn{
   width: 1.8em;
   height: 1.8em;
   margin-top: 25px;
   margin-left: 16px;
}
.avatar_layout{
  text-align: center;
}
.avatar{
   width: 48px;
   height: 48px;
   margin-top: 28px;
   border-radius:50%;
   box-shadow: 0px 0px 5px #333;
}
.info{
  margin-top: 4px;
  font-size: 0.9em;
  font-weight: 300;
  color: #666;
}
.info_value{
  font-size: 1.2em;
  font-weight: 400;
  color: #333;
}
</style>
