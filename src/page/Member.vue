<template>
  <div class="member">
    <header class="mine-header">
      <div class="back-wrapper">
        <div class="back">
          <!--<i class="iconfont icon-fanhui1"></i>-->
        </div>
        <div class="title">
          <span></span>
        </div>
      </div>

      <div class="user-photo" @click="goSetting">
        <!--:src="photoImg"-->
        <img class="photo" :src="photoImg"  alt="头像" v-show="isLogin">
        <img class="photo" src="../assets/img/account.png" alt="头像" v-show="!isLogin">
      </div>
      <p class="user-name"><router-link class="name" :to="{name: 'login'}" v-show="!isLogin">点击登录</router-link><span class="name"  v-show="isLogin">{{userName}}</span></p>
      <p class="user-name"><span class="sign" @click="signIn" v-show="!isSign">签到</span> <span class="sign active" v-show="isSign">已签到</span></p>
    </header>
    <section class="mine-main">
      <div  class="my-integral  menu-list" @click="goIntegral">
        <span class="menu-icon "><i class="iconfont icon-jifen"></i></span>
        <span class="menu-name">我的积分</span>
        <span class="menu-go "><i class="iconfont icon-qianjin"></i></span>
        <span class="menu-go red">{{goldTotal}}</span>
      </div>
      <div class="mine-line"></div>
      <div  class="my-store menu-list"  @click="goShop">
        <span class="menu-icon "><i class="iconfont icon-dianpu"></i></span>
        <span class="menu-name">我的商铺</span>
        <span class="menu-go"><i class="iconfont icon-qianjin"></i></span>
      </div>
      <div class="mine-line"></div>
      <div class="my-collect menu-list" @click="goCollect">
        <span class="menu-icon"><i class="iconfont icon-shoucang"></i></span>
        <span class="menu-name">我的收藏</span>
        <span class="menu-go"><i class="iconfont icon-qianjin"></i></span>
      </div>
      <div class="mine-line"></div>

      <div  class="setting  menu-list" @click="goSetting">
        <span class="menu-icon"><i class="iconfont icon-shezhi1"></i></span>
        <span class="menu-name">账号设置</span>
        <span class="menu-go"><i class="iconfont icon-qianjin"></i></span>
      </div>
      <div class="mine-line"></div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">

  import qs from 'qs';
  import Footer from '@/common/c-footer.vue';

  export default {
    components: {
     Footer
    },
    data(){
      return {
        photoImg: '',     //头像
        userName: '',     //昵称
        isLogin: false,  //登录状态
        isSign: false,  //签到状态
        token: '',    //用户标识
        time: '',     //签到时间
        goldTotal: ''  //积分数
      }
    },
    mounted(){
      //是否登录，切换状态
      if(this.getCookie('userPhoto')&&this.getCookie('userToken')){
        this.token = this.getCookie('userToken');
        this.photoImg = this.getCookie('userPhoto');
        this.userName = this.getCookie('userName');
        // this.goldTotal = this.getCookie('goldTotal');
        this.isLogin = true;
        this.time = new Date().getTime();
        //判断是否签到
        this.$http.post('Member/memberLoginGoldAuth',qs.stringify({userToken:this.token,memberAddGoldTime:this.time})).then(response=>{
          let res = response.data;
          if(res.flag == 'success'){
              if(res.info == '未签到'){
                this.isSign = false;
              }else{
                this.isSign = true;
              }
          }else{
            console.log(res.info);
          }

        }).catch(err=>console.log(err));
        //取积分存cookie
          this.$http.post('Member/memberSelectGold',qs.stringify({userToken:this.token})).then(response=>{
              let res = response.data;

              if(res.flag == 'success'){
                
                let gold= res.data;
                this.setCookie('goldTotal',gold,1);
                this.goldTotal = this.getCookie('goldTotal');
              }else{
                this.goldTotal = this.getCookie('goldTotal');
              
              }
            }).catch(err=>console.log(err));
      }
    },
    methods:{
      //签到
      signIn(){
        if(this.getCookie('userToken')){
          this.$http.post('Member/memberLoginGold',qs.stringify({userToken:this.token,memberAddGoldTime:this.time})).then(response=>{
            let res = response.data;
            if(res.flag == 'success'){
              this.$toast({
                message: res.info ,
                position: 'middle',
                duration: 2000
              });
              this.isSign = true;
              this.goldTotal = (this.goldTotal-0)+ 5;
              this.setCookie('goldTotal',this.goldTotal,1);
            }else{
              this.$toast({
                message: res.info ,
                position: 'middle',
                duration: 2000
              });
            }
          }).catch(err=>console.log(err));
        }else{
          this.$router.push({
            name:'login'
          });
        }

      },
      //去积分页面
      goIntegral(){
        if(this.getCookie('userToken')){
          this.$router.push({
            name:'integral'
          });
        }else{
          this.$router.push({
            name:'login'
          });
        }
      },
      //去商铺页面
      goShop(){
        if(this.getCookie('userToken')){
          this.$router.push({
            name:'shop'
          });
        }else{
          this.$router.push({
            name:'login'
          });
        }
      },
      goCollect(){
        if(this.getCookie('userToken')){
          this.$router.push({
            name:'collect'
          })
        }else{
          this.$router.push({
            name:'login'
          });
        }
      },
      //去设置页面
      goSetting(){
        if(this.getCookie('userToken')){
          this.$router.push({
            name:'setting'
          });
        }else{
          this.$router.push({
            name:'login'
          });
        }

      },

    }
  }

</script>

<style lang="less" scoped>
  @import "../style/common.less";
  .member{

  .mine-header{
    width: 100%;
    height: 480/@rem;
    background: url("../assets/img/my-bg.png") no-repeat;
    background-size: 100% 100%;
  .back-wrapper{
    width: 100%;
    font-size: 0;
    position: relative;
  .back{
    position: absolute;
    top:0;
    left: 0;
    width: 30/@rem;
    height:30/@rem;
    font-size: 30/@rem;
    cursor: pointer;
    padding: 20/@rem   20/@rem 0  20/@rem;
  i{
    vertical-align: top;
    color: #fff;
    font-size: 30/@rem;
  }
  }
  .title{
    height: 30/@rem;
    text-align: center;
    font-size: 24/@rem;
    line-height: 30/@rem;
    color: #fff;
    padding: 20/@rem   20/@rem 0  20/@rem;
  }
  }

  .user-photo{
    display: block;
    width: 155/@rem;
    height:155/@rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    overflow: hidden;
    margin: 20/@rem auto;
  img{
    width: 100%;
    height: 100%;
  }
  }
  .user-name{
    text-align: center;
    height: 30/@rem;
    line-height: 30/@rem;
    font-size: 24/@rem;
    padding: 10/@rem 0;
  .name{
    color: #fff;
    /*//color: #fff;*/
  }
  .sign{
    padding: 5/@rem 10/@rem;
    display: inline-block;
    width: 90/@rem;
    height: 30/@rem;
    line-height: 30/@rem;
    color: #fff;
    border: 1px solid #fff;
    /*background: #f6504a;*/
  }
  /*.sign.active{*/
    /*color: #ff0;*/
  /*}*/
  }
  }
  .mine-main{
    width: 100%;
    padding-bottom: 90/@rem;
  .menu-list{
    display: block;
    padding: 25/@rem 0;
    overflow: hidden;
  span{
    height: 28/@rem;
    font-size: 28/@rem;
    line-height: 28/@rem;
    float: left;
  }
  .menu-name{
    color: #555555;
    font-weight: lighter;
  }
  .menu-go{
    float: right;
    padding-right: 20/@rem;
  i{
    font-size: 28/@rem;
    color: #555555;
  }
  }
  .menu-go.red{
    color: red;
  }
  }
  .issue-investment .menu-icon {
    padding: 0 22/@rem;
  i{
    color: #f66f31;
    font-size: 26/@rem;
  }
  }
  .management-investment  .menu-icon {
    padding: 0 18/@rem;
  i {
    color: #86d66e;
    font-size: 32/@rem;

  }
  }
  .my-collect .menu-icon {
    padding: 0 18/@rem;
  i {
    color: #f4c012;
    font-size: 32/@rem;

  }
  }
  .my-integral .menu-icon {
    padding: 0 18/@rem;
  i {
    color: #5bb5f2;
    font-size: 32/@rem;

  }
  }
  .my-store .menu-icon {
    padding: 0 18/@rem;
  i {
    color: #d281d7;
    font-size: 32/@rem;

  }
  }
  .my-coupon .menu-icon {
    padding: 0 18/@rem;
  i {
    color: #f58888;
    font-size: 32/@rem;

  }
  }
  .my-message .menu-icon {
    padding: 0 18/@rem;
  i {
    color: #58cee0;
    font-size: 32/@rem;

  }
  }
  .setting  .menu-icon {
    padding: 0 20/@rem;
  i {
    color: #cf925b;
    font-size: 28/@rem;

  }
  }
  .mine-line{
    height: 20/@rem;
    background: #e5e5e5;
  }
  }
  }
</style>
