<template>
  <section class="picture-list-container">
    <van-list>
      <router-link 
        v-for="(item, index) in list"
        :key="index"
        :to="{name: 'mark', query: {id: item.id}}"
      >
        <van-cell>
          <template slot="title">
            <img :src="item.imgpath" class="image" alt="">
            <van-tag color="#7232dd" plain style="margin-right:10px">
              id: {{item.id}}
            </van-tag>
            <van-tag color="#7232dd" plain style="margin-right:10px">
              图片名: {{item.imgname}}
            </van-tag>
            <van-tag 
              :type="item.status===3?'danger':item.status===4?'':item.status===5?'success':'primary'">
              {{item.status | formatStatus}}
            </van-tag>
          </template>
        </van-cell>
      </router-link>
    </van-list>
    <section v-show="loadMore" class="show-more" ref="showMore">加载更多。。。</section>
  </section>
</template>

<script>
import { vm } from '@/utils.js'
export default {
  props: {
    list: Array,
    loadMore: Boolean
  },
  methods: {
    loadMoreFn () {
      vm.$emit('loadMoreFn')
    }
  },
  mounted () {
    const showMore = this.$refs.showMore
    let timeoutId
    let that = this
    function callback() {
      const top = showMore.getBoundingClientRect().top
      const windowHeight = window.screen.height
      if (top && top < windowHeight) {
        that.loadMoreFn()
      }
    }
    window.addEventListener('scroll', function(){
      if (!this.loadMore) { return }
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(callback, 50)
    }.bind(this), false)
  },
  filters: {
    formatStatus: function(status) {
      let statusInfo;
      if (status === 3) {
        statusInfo = '未标注'
      } else if (status === 4) {
        statusInfo = '正在标注'
      } else if (status === 5) {
        statusInfo = '标注完成'
      } else {
        statusInfo = '其他状态'
      }
      return statusInfo
    }
  }
}
</script>

<style scoped lang="less"> 
.picture-list-container {
  .image {
    width: 100%;
  }
  .show-more {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #222;
  }
}
</style>
