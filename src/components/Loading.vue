<template>
  <van-loading type="spinner" color="#000" size="150px" v-show="loading" class="mark-loading"/>
</template>

<script>
export default {
  props: {
    loading: Boolean
  }
}
</script>

<style scoped>
  .mark-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
