<template>
  <div>
    <div class="swiper-container parent-nav" id="parentNav">
      <div class="swiper-wrapper parent-wrapper">
        <div class="swiper-slide nav-list" :class="{'active': $route.query.pId? item.id==$route.query.pId: index==0}" v-for="(item,index) in  parentNameList"   @click="goParent(item.id)" :key="item.id">
          <span class="icon-box"><i class="iconfont" :class="parentListImg[index]"></i></span>
          <span class="text">{{item.goodsParentsName.substring(0,4)}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    data() {
      return {
        parentNameList: [] ,   //父导航
        parentListImg: [
          'icon-jiaonang','icon-zhongyao','icon-zhongyaoyinpian','icon-zibuyangsheng','icon-dianpu',
          'icon-shezhi','icon-baozhuanggongxuguanli','icon-meizhuang','icon-3','icon-biyuntao'
        ],
        changeActive:0
      }
    },
    mounted(){
      this. getParentNameList();

      var mySwiper = new Swiper('#parentNav', {
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        slidesPerView: 'auto',
        onSlideChangeEnd: function(swiper){
          swiper.update(); //swiper更新
        }

      });
    },

    methods:{
      getParentNameList() {
        this.$http.post('Api/selectGoodsIndex').then((response) => {
          let res = response.data;
          if (res.flag == 'success') {
            this.parentNameList = res.data;
            //console.log(this.parentNameList)
          }
        }).catch(error => {
          console.log(error);
        });

      },
      goParent(id) {
        this.$router.push({
          name:'goods',
          query: {
            pId: id
          }
        });
      },
      activeClass(index){
        this.changeActive = index;
      }
    }
  }

</script>

<style lang="less" scoped>
  @import "../../style/common.less";

  #parentNav{
    width: 640/@rem;
    padding-top: 40px;
    margin: 0;

    .nav-list{
      margin: 10/@rem 20/@rem;
      width: 100/@rem;
      height: 100/@rem;
      text-align: center;
      color: #555555;
      .icon-box{
        display: inline-block;
        i{
          font-size: 48/@rem;
          color: #555555;
        }
      }
      .text{
        display: block;
        margin-top: 5/@rem;
        font-weight: 500;
        font-size: 24/@rem;
      }

    }
    .nav-list.active{
      color: @mainColor;
       .icon-box i{
         color: @mainColor;
       }
     }
  }
</style>
