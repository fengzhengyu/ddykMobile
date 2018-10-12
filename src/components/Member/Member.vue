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

      <div class="user-photo">
        <img class="photo" src="../../assets/img/banner.png" alt="">
      </div>
      <p class="user-name"><span class="name">点击登录</span></p>
      <p class="user-name"><span class="sign">签到</span></p>
    </header>
    <section class="mine-main">
      <router-link :to="{name:'integral'}" class="my-integral  menu-list">
        <span class="menu-icon "><i class="iconfont icon-jifen"></i></span>
        <span class="menu-name">我的积分</span>
        <span class="menu-go "><i class="iconfont icon-qianjin"></i></span>
      </router-link>
      <div class="mine-line"></div>
      <router-link :to="{name:'shop'}" class="my-store menu-list">
        <span class="menu-icon "><i class="iconfont icon-dianpu"></i></span>
        <span class="menu-name">我的商铺</span>
        <span class="menu-go"><i class="iconfont icon-qianjin"></i></span>
      </router-link>
      <div class="mine-line"></div>
      <router-link :to="{name:'collect'}" class="my-collect menu-list">
        <span class="menu-icon"><i class="iconfont icon-shoucang"></i></span>
        <span class="menu-name">我的收藏</span>
        <span class="menu-go"><i class="iconfont icon-qianjin"></i></span>
      </router-link>
      <div class="mine-line"></div>

      <router-link :to="{name:'setting'}" class="setting  menu-list">
        <span class="menu-icon"><i class="iconfont icon-shezhi1"></i></span>
        <span class="menu-name">账号设置</span>
        <span class="menu-go"><i class="iconfont icon-qianjin"></i></span>
      </router-link>
      <div class="mine-line"></div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">


</script>

<style lang="less" scoped>
  @import "../../style/common.less";
  .member{

  .mine-header{
    width: 100%;
    height: 480/@rem;
    background: url("../../assets/img/my-bg.png") no-repeat;
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
    background: red;
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
    margin-bottom: 10/@rem;
    font-size: 24/@rem;
    color: #fff;
    .name{

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
