<template>
    <div>
      <x-header style="background-color:#111;" :left-options="{showBack: true}" > {{repoName}} </x-header>
      <div v-if="loading">
        <infinite-loading class="loading_view" spinner="waveDots" :on-infinite="onInfinite" ref="infiniteLoading" />
      </div>
      <div v-else>
        <vue-markdown>{{ readMe }}</vue-markdown>
      </div>
    </div>
</template>

<script>

import { XHeader, AlertPlugin } from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import VueMarkdown from 'vue-markdown'
import Vue from 'vue'

Vue.use(AlertPlugin)

export default {
  data () {
    return {
      repoName: null,
      loading: true,
      readMe: null,
      description: null
    }
  },
  created: function () {
    this.repoName = this.$route.params.repoName
    var url = 'https://api.github.com/repos/StevenDXC/' + this.repoName
    console.log(url)
    Vue.axios.get(url).then((res) => {
      console.log(res)
      this.fetchReadMeUrl(res.data.contents_url)
      this.description = res.data.description
    }).catch((error) => {
      console.log(error)
      this.loading = false
      this.showAlert(error)
    })
  },
  methods: {
    showAlert (error) {
      this.$vux.alert.show({
        title: 'error',
        content: error
      })
    },
    fetchReadMeUrl (rmUrl) {
      Vue.axios.get(rmUrl.replace('{+path}', 'README.md')).then((res) => {
        console.log(res)
        this.fetchReadMeContent(res.data.download_url)
      }).catch((error) => {
        console.log(error)
        this.loading = false
        this.showAlert(error)
      })
    },
    fetchReadMeContent (downloadUrl) {
      Vue.axios.get(downloadUrl).then((res) => {
        console.log(res)
        this.readMe = res.data
        console.log(this.readMe)
        this.loading = false
      }).catch((error) => {
        console.log(error)
        this.loading = false
        this.showAlert(error)
      })
    }
  },
  components: {
    XHeader,
    InfiniteLoading,
    VueMarkdown
  }
}
</script>

<style>
.desc{
  margin-top: 16px
}
</style>
