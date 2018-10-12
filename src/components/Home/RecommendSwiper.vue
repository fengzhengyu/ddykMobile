<template>
  <div>
    <div class="new">
      <div class="new-logo fl">
        <img src="../../assets/img/new-logo.png" alt="推荐图">
      </div>
      <div id="upSlider" class="swiper-container new-wrapper">
        <ul class="swiper-wrapper" >
          <li class="swiper-slide new-list" v-for="(item,index) in newsData" :key="index">
            <router-link :to="{name:'goods.details',params:{goodsId:item.id}}">
              <i class="iconfont icon-zan-copy-copy"></i>
              <span class="wordbreak">{{item.goodsName}}</span>
            </router-link>

          </li>
          <!--<li class="swiper-slide new-list">-->
            <!--<a href="">-->
              <!--<i class="iconfont icon-zan-copy-copy"></i>-->
              <!--<span class="wordbreak">手动阀根深蒂固地方</span>-->
            <!--</a>-->

          <!--</li>-->
        </ul>
      </div>
      <div>

      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        newsData: [],  //推荐新闻数据
    
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.getHotData();
      })
      var swiperObj = new Swiper('#upSlider', {
        initialSlide: 0,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        autoplayDisableOnInteraction: false, //用户操作swiper之后自动切换不会停止
        loop: true,
        autoplay: 3000,
        direction: 'vertical'
      });
    },
    methods: {
      getHotData(){
        this.$http.post('Api/selectGoodsIndex').then(response => {
          let res = response.data;
          if (res.flag == 'success') {
            this.newsData = res.adNewsGoodsData;
          }
        }).
          catch(error => {
            console.log(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/common.less";

  .new{
    width: 640/@rem;
    background: #e5e5e5;
    font-size: 0;
    height: auto;
    padding-top: 20/@rem;

    .new-logo{
      vertical-align: top;
      display: inline-block;
      box-sizing: content-box;
      background-color: #fff;
      width: 99/@rem;
      height: 30/@rem;
      padding: 20/@rem;
      img{
        width: 99/@rem;
        height: 30/@rem;
      }
    }
    .new-wrapper{
      background-color: #fff;
      vertical-align: top;
      display: inline-block;
      height: 70/@rem;
      overflow: hidden;
      width: 500/@rem;
    .new-list{

    }
      a{
        display: block;
        width: 480/@rem;
        height: 70/@rem;
        line-height: 70/@rem;
        font-size: 0;
        overflow: hidden;
      }
      span{
        vertical-align: middle;
        display: inline-block;
        width: 430/@rem;
        padding-left: 10/@rem;
        font-size: 22/@rem;
        font-weight: 700;
        line-height: 80/@rem;
        color: #000;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;

      }
      i{
        vertical-align:top;
        display: inline-block;
        font-size: 30/@rem;
        color: @mainColor;
        font-weight: 700;
      }
    }
  }
</style>
