<template>
  <div>
    <div class="swiper-container" id="hotSlider">
      <div class="swiper-wrapper">
        <div class="swiper-slide list" v-for="item in hotData" :key="item.id">
          <router-link :to="{name:'goods.details',params:{goodsId:item.id}}" >
            <img class="img" :src="item.photoUnify" alt="">
            <p class="text">{{item.goodsName}}</p>
          </router-link>
        </div>

      </div>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        hotData: [] //推荐photo数据
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.getHotData();
      })
      var hotSwiper = new Swiper('#hotSlider', {
        initialSlide: 0,
        slidesPerView : 2,//'auto'
        slidesPerGroup: 2,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        autoplayDisableOnInteraction: false, //用户操作swiper之后自动切换不会停止
        //loop: true,
        autoplay: 3000
      });
    },
    methods: {
      getHotData(){
        this.$http.post('Api/selectGoodsIndex').then(response => {
          let res = response.data;
          if (res.flag == 'success') {
            this.hotData =  res.adGoodsData;
            //console.log(res)
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

  #hotSlider{
    width: 640/@rem;
    padding: 10/@rem 0;
    background: #e5e5e5;
    overflow:hidden;


    .list{
      margin:10/@rem 0 10/@rem 20/@rem;
      width: 300/@rem;
      height: 190/@rem;
      background: white;
      .img{
        width: 300/@rem;
        height: 190/@rem;
      }
      .text{
        position: absolute;
        bottom: 10/@rem;
        width: 300/@rem;
        height: 30/@rem;
        font-size: 24/@rem;
        line-height: 30/@rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: center;
        background-color:rgba(0,0,0,0.5) ;
        color: #fff;
      }
    }
  }
</style>
