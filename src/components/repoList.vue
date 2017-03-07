<template>
  <div>
    <div>
      <x-header style="background-color:#111;" :left-options="{showBack: false}" >{{title}}<router-link style="color:#fff;" slot="right" to="/about" >About</router-link></x-header>
      <div v-if="loading">
        <infinite-loading class="loading_view" spinner="waveDots" :on-infinite="onInfinite" ref="infiniteLoading" />
      </div>
      <div v-else>
      <scroller lock-x scrollbar-y height="100%" ref="scroller">
        <div>
          <ul class="scroll_content">
            <li v-for="repo in repos">
              <router-link :to="{name:'detail',params:{repoName:repo.name}}">
              <div class="repo_name_content">
                <div>
                   <span class="repo_name">{{ repo.name }}</span>
                   <img v-if="repo.fork" class="img_fork" src="../assets/fork_blue.png"/>
                </div>
                <div>
                   <img class="img_star" src="../assets/star.png"/>
                   <span class="count_text">{{ repo.stargazers_count }}</span>
                   <img class="img_watch" src="../assets/watch.png"/>
                   <span class="count_text">{{ repo.watchers_count }}</span>
                   <img class="img_little_fork" src="../assets/fork.png"/>
                   <span class="count_text">{{ repo.forks_count }}</span>
                </div>
              </div>
              </router-link>
            </li>
          </ul>
        </div>
      </scroller>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XHeader, Scroller, Divider, AlertPlugin } from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import Vue from 'vue'

Vue.use(AlertPlugin)

export default {
  data () {
    return {
      title: 'StevenDXC/repos',
      repos: [],
      loading: true
    }
  },
  created: function () {
    Vue.axios.get('https://api.github.com/users/StevenDXC/repos').then((res) => {
      this.repos = res.data
      console.log(this.repos)
      this.loading = false
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
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    Scroller,
    Divider,
    InfiniteLoading,
    AlertPlugin
  }
}
</script>

<style>
.loading_view{
  margin-top: 18em;
}
.scroll_content {
  background: #ccc
}
.repo_name_content {
  height: 60px;
  padding-left: 10px;
  padding-top: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 5px #666;
}
.repo_name {
  margin-top:16px;
  font-size: 1.2em;
  font-weight: 500;
  color: #333;
}
.img_star{
  width: 12px;
  height: 12px;
  margin-top:8px;
}
.img_watch{
  width: 12px;
  height: 10px;
  padding-top: 2px;
}
.img_little_fork{
  width: 13px;
  height: 13px;
}
.img_fork{
  width: 14px;
  height: 14px;
  float: right;
  margin-right: 16px;
  margin-top: 4px;
}
.count_text{
  width: 18px;
  font-size: .8em;
  font-weight: 400;
  color: #666;
  display: inline-flex;
}
</style>
