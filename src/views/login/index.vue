<template>
  <div class="login-container" >
       <!-- 登录左侧 -->
    <div class="login-content">
      <div class="login-content-form login-left">
        <div class="login-left-logo"><img src="../../assets/logotext.png" alt=""></div>
         <div class="login-left-bg2"><img src="../../assets/banner.png" alt=""></div>
      </div>
      <!-- 登录右侧 -->
      <div class="login-content-form login-right">   
        <div class="login-right-logo">
          <img src="../../assets/logo.png" alt="">
        </div>
         <el-form ref="loginForm" :model="loginForm" :rules="loginRules" > 
        <div class="login-right-center">
          <img src="../../assets/user.png" alt="">
          <el-input type="text" name="name" tabindex="1" auto-complete="on" v-model="loginForm.name" ref="name" prop="username" placeholder="请输入账号" size="mini"></el-input>
         
        </div>
        <div class="login-right-footer">
          <img src="../../assets/lock.png" alt="">
          <el-input :type="passwordType" prop="password" name="password" :key="passwordType" ref="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="handleLogin" auto-complete="on" tabindex="2" size="mini"></el-input>

        </div>
         <div class="login-right-icon"><span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span></div>
      
        <el-button :loading="loading" type="primary"  @click.native.prevent="handleLogin" class="login-right-login">登录</el-button>


        <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" >  -->
       <!-- <el-form-item prop="username"> -->

      <!-- </el-form-item>  -->
      <!-- <el-form-item prop="password"> -->
    
        <!-- <el-input
         
      
         
         
    
          tabindex="2"
        
          @keyup.enter.native="handleLogin"
        /> -->
      <!-- </el-form-item>  -->
  </el-form> 
    </div>
 
        </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6个字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: 'admin',
        password: '123456'
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>



<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
   background-image: url(../../assets/login.jpg);
   overflow: hidden;
      .login-content{
      width: 576px;
      height: 360px;
      margin: 280px auto  0;
      background: #FFFFFF;
      border-radius: 20px;
      display: flex;
     .login-left{
      width: 288px;
      height: 360px;
     
      border-radius: 20px 0 0 20px;
      background: #4D3EC0;
      .login-left-logo{
        margin: 55px auto 64px;
        height: 34px;
        width: 178px;
      }
      .login-left-bg2{
        width: 280px;
        height: 174px;
      }
    }
       .login-right{
      width: 288px;
      height: 360px;
     
      border-radius: 0 20px 20px 0;
      .login-right-logo{
        height: 94PX;
        width: 170px;
        margin: 44px auto 32px;

      }
      .login-right-center{
        margin-bottom: 40px;
        font-size: 10px;
       display: flex;
       img{
         width: 20px;
         height: 20px;
         margin:  0 15px;
       }
       .el-input{
        width: 216px;
        }
      }
      .login-right-footer{
           display: flex;
           font-size: 10px;
       img{
         width: 16px;
         height: 21px;
         margin:  0 17px;
       }
       .el-input{
        width: 216px;
  
         }
 
      
        }
        .login-right-icon{
       position: relative;
        span{
            position:absolute;
            right:30px;
            top: -17px;
          }
        }
        .login-right-login{
        width: 250px;
        height: 22px;
        background: linear-gradient(0deg, #4B38D7 0%, #7C6DF2 100%);
        border-radius: 15px;
        margin: 28px 18px 20px 19px;
       color: #FFFFFF;
       border: 0 none;
       outline: none;
        font-size: 10px;
        text-align: center;
          font-weight: 400;
         color: #FFFFFF;
          line-height: 1px;
         vertical-align:middle;

    }
      .show-pwd {
  
    font-size: 12px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
    
    }
}


}
</style>
