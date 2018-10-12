<template>
  <div id="search">
    <div class="wrapper">
      <div class="logo"><img src="../../assets/img/logo.png" alt="当代医康"></div>
      <div class="search-wrapper"><input type="text" class="text" @click="$router.push({name: 'search'})"> <i class="iconfont icon-sousuo"></i></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


</script>

<style scoped lang="less">
  @import "../../style/common.less";
  #search .wrapper{
    width: 640/@rem;
    height: 80/@rem;
    background: @mainColor;
   font-size: 0;
  .logo{
    display: inline-block;
    vertical-align: top;
    padding: 25/@rem 10/@rem 0 10/@rem;
    width: 216/@rem;
    height: 29/@rem;
    img{
      width: 216/@rem;
      height: 29/@rem;
    }
  }
  .search-wrapper{
    display: inline-block;
    padding: 20/@rem 10/@rem 0 0;
    width: 394/@rem;
    height: 40/@rem;
    position:relative;
  .text{
    box-sizing: border-box;
    width: 100%;
    height: 40/@rem;
    border-radius: 10/@rem;
    padding-left: 40/@rem;
    border: none;
    outline: none;
    background: #fff;
    font-size: 20/@rem;
    color: #000;
  }
  i{
    font-size: 26/@rem;
    position: absolute;
    top: 24/@rem;
    left: 10/@rem;
    color: @mainColor;
    font-weight: 700;
  }
  }
  }
</style>
