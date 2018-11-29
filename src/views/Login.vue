<template>
  <div class="login-container">
    <img :src="logo" alt="">
    <section class="login-form">
      <van-field v-model="loginForm.username" placeholder="请输入用户名" />
      <van-field type="password" v-model="loginForm.password" placeholder="请输入密码" />
      <van-button type="default" @click="handleLogin">Login</van-button>
    </section>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png'
import axios from 'axios'
import URL from '@/interface.js'
import { dataFormat } from '@/utils.js'
import { Toast } from 'vant'
export default {
  name: 'login',
  data() {
    return {
      logo: Logo,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      let username = this.loginForm.username
      let password = this.loginForm.password
      if (username !== '' && password !== '') {
        let params = dataFormat({username: username, password: password})
        axios({
          url: `${URL.login}?${params}`,
          methods: 'get'
        }).then( res => {
          if (res.data.result) {
            this.$router.push({path: '/taskdetail'})  
          } else {
            Toast.fail(res.data.message)
          }
        })
      } else {
        Toast.fail('用户名和密码不能为空')
      }
    } 
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  height: 100%;
  background: url('../assets/bg.jpg');
  background-size: 100% 100%;
  img {
    position: relative;
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
  }
  .login-form {
    position: absolute;
    top: 38%;
    left: 10%;
    width: 80%;
    button {
      margin-top: 30px;
      width: 100%;
    }
  }
}
</style>

