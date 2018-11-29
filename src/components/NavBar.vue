<template>
  <div class="navbar-container">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      left-arrow
      @click-left="handleClickLeft"
      @click-right="handleClickRight"
    />
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    title: String,
    rightText: String,
    leftText: String,
  },
  methods: {
    handleClickLeft () {
      this.$emit('leftFunc')
      // this.$router.go(-1)
    },
    handleClickRight () {
      this.$emit('func')
    }
  }
}
</script>

<style scoped lang="less">

</style>
