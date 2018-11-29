<template>
  <div class="taskdetial-container">
    <nav-bar title="任务详情" leftText="注销" @func="getNewTask" @leftFunc="logOut"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefreshList">
      <picture-list :list="list" :loadMore="loadMore"/>
    </van-pull-refresh>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import PictureList from '@/components/PictureList'
import { dataFormat, vm } from '@/utils.js'
import axios from 'axios'
import URL from '@/interface.js'
import { Toast } from 'vant'
export default {
  components: {
    'nav-bar': NavBar,
    'picture-list': PictureList
  },
  data () {
    return {
      isLoading: false,
      list: [],
      pageIndex: 1,
      pageCount: 20
    }
  },
  methods: {
    logOut () {
      axios({
        url: URL.logout,
        method: 'post'
      }).then( res => {
        if (res.data.result) {
          this.$router.push({path: '/'})
        }
      })
    },
    onRefreshList () {
      setTimeout(()=>{
        this.isLoading = false
      },1500)
    },
    getNewTask () {
      axios({
        url: URL.getTask,
        method: 'post',
        data: {}
      }).then( res => {
        if (res.data.result) {
          this.list = []
          this.getNewTaskList()
        } else {
          Toast.fail(res.data.message)
        }
      })
    },
    getNewTaskList () {
      let params = dataFormat({pageIndex: this.pageIndex})
      axios({
        url: `${URL.getTaskList}?${params}`,
        method: 'get'
      }).then ( res => {
        if (res.data.result) {
          if (res.data.data !== null) {
            let data = JSON.parse(res.data.data)
            this.list = this.list.concat(data.details)
            this.pageCount = data.count
            this.pageIndex = data.pageIndex + 1
          } else {
            this.getNewTask()
          }
        } else {
          Toast.fail(res.data.message)
        }
      })
    }
  },
  computed: {
    'loadMore': function () {
      if (this.pageIndex - 1 === Math.ceil(this.pageCount / 5)) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    this.getNewTaskList()
    vm.$on('loadMoreFn', () => {
      this.getNewTaskList()
    })
  }
}
</script>
<style lang="less" scoped>

</style>
