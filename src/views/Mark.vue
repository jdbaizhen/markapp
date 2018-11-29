<template>
  <section class="mark-container">
    <nav-bar title="标注" leftText="返回" rightText="完成" @func="completePicture" @leftFunc="goBack"/>
    <load-ing :loading="loading" style="z-index:9999"/>
    <section class="mark-picture">
      <van-swipe :height="270">
        <van-swipe-item>
          <section class="mark-detail-info">
            <img :src="currentPicture.imgPath" alt="">  
            <section>
              <h4>属性提示:</h4>
              <van-tag type="primary" size="large" style="margin-top:20px; width:80%" v-for="(item, index) in originPicture.clothesType" :key="index">{{item}}</van-tag> 
              <h6>右滑查看原图</h6>
            </section>  
          </section>
        </van-swipe-item>
        <van-swipe-item>
          <img :src="originPicture.imgPath" width="100%" height="100%;" alt="">
        </van-swipe-item>
      </van-swipe>
      <section class="mark-checkbox">
        <check-box :attrArr="clothesFeaturesList"/>
      </section>
    </section>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar'
import CheckBox from '@/components/CheckBox'
import Loading from '@/components/Loading'
import axios from 'axios'
import { dataFormat, vm } from '@/utils.js'
import URL from '@/interface.js'
import { Toast } from 'vant'
export default {
  name: 'mark',
  components: {
    'nav-bar': NavBar,
    'check-box': CheckBox,
    'load-ing': Loading
  },
  data () {
    return {
      loading: false,
      isLoading: false,
      id: '',
      originPicture: {
        clothesType: [],
        imgPath: ''
      },
      currentPicture: {
        width: '',
        height: '',
        imgId: '',
        imgPath: '',
        imgName: ''
      },
      clothesFeaturesList: [],
      choseArr: []
    }
  },
  methods: {
    goBack () {
      this.$router.push({path: 'taskdetail'})
    },
    completePicture () {
      let squareImageId = this.currentPicture.imgId
      let features = this.choseArr
      let params = dataFormat({squareImageId, features})
      axios({
        url: URL.saveSquareFeature,
        method: 'post',
        data: params
      }).then( res => {
        if (res.data.result) {
          this.adjustPicture()
          vm.$emit('clearCheckBox')
        } else {
          Toast.fail(res.data.message)
        }
      })
    },
    adjustPicture () {
      this.loading = true
      let params = dataFormat({id: this.id})
      axios({
        url: URL.adjustPicture,
        method: 'post',
        data: params
      }).then( res => {
        if (res.data.result) {
          this.getSquareImage()
        } else {
          Toast.fail('请求失败,请下拉刷新')
        }
      })
    },
    getSquareImage () {
      let params = dataFormat({id: this.id})
      axios({
        url: `${URL.getSquareImage}?${params}`,
        method: 'get'
      }).then( res => {
        if (res.data.result) {
          if (res.data.data === null) {
            this.$router.push({path: '/taskdetail'})
            return
          }
          let data = JSON.parse(res.data.data)
          this.originPicture = {
            clothesType: data.clothesTypes,
            imgPath: data.imgPath
          }
          this.currentPicture = {
            width: data.squareImage.width,
            height: data.squareImage.height,
            imgId: data.squareImage.squareImageId,
            imgName: data.squareImage.squareImageName,
            imgPath: data.squareImage.squareImagePath,
          }
          this.clothesFeaturesList = data.clothesFeaturesList
          this.loading = false
          this.isLoading = false
        } else {
          Toast.fail(res.data.message)
        }
      }) 
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.adjustPicture()
    vm.$on('choseArr', value => {
      this.choseArr = value
    })
  }
}
</script>

<style scoped lang="less">
.mark-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #eee;
  .mark-picture {
    height: 100%;
    .mark-detail-info {
      display: flex;
      flex-direction: row;
      section {
        h4 {
          margin: 0px;
        }
        h6 {
          margin-top: 10px;
        }
        display: flex;
        flex-direction: column;
        padding: 10px;
      }
    }
  }
  .mark-checkbox {
    position: fixed;
    top: 320px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: scroll; 
  }
}
</style>
