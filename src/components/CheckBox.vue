<template>
  <section class="checkbox-container">
    <van-checkbox-group
      v-for="(item, index) in attrArr"
      :key="index"
      v-model="choseArr"
    >
      <h4>{{item.clothesType}}</h4>
       <van-cell-group>
         <van-cell
          v-for="(ite, idx) in item.clothesFeatureList"
          clickable
          :key="idx"
          :title="ite.featureType"
          @click="toggle(ite.featureId - 1)"
        >
          <van-checkbox :name="ite.featureId" ref="checkboxes" />
        </van-cell>
       </van-cell-group>
    </van-checkbox-group>
  </section>
</template>

<script>
import { vm } from '@/utils.js'
export default {
  props: {
    attrArr: Array
  },
  data () {
    return {
      choseArr: []
    }
  },
  watch: {
    'choseArr': (newValue) => {
      vm.$emit('choseArr', newValue)
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    }
  },
  mounted() {
    vm.$on('clearCheckBox', () => {
      this.choseArr = []
    })
  }
}
</script>

<style lang="less" scoped>
.checkbox-container {
  h4 {
    margin: 0px;
    padding: 10px 15px;
    text-align: center;
    color: deepskyblue;
    background: #fff;
  }
}
</style>
