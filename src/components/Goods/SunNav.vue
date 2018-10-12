<template>
  <div>
    <div class="sun-nav swiper-container" id="sunNav">
      <ul class="swiper-wrapper sun-wrapper">
        <li class="swiper-slide nav-list" v-for="(item,index) in sunNameList" :class="{'active':$route.query.sId? item.id==$route.query.sId : index==0}" @click="goSun($route.query.pId ? $route.query.pId:1,item.id)" :key="item.id">
          <span class="text">{{item.goodsSunName}}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

  import qs from 'qs';
  export default {
    data() {
      return {
        sunNameList: [],
        changeActive:0
      }
    },
    watch: {
      '$route': ['getSunNameList']
    },
    mounted(){
      this.$nextTick(function(){
        this.getSunNameList()

      });
      var mySwiper2 = new Swiper('#sunNav', {
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
      getSunNameList() {
        let arg= this.$route.query.pId||1;
        this.$http.post('Api/selectGoodsSunType',qs.stringify({typeId:arg})).then((response) => {
          let res = response.data;
          // console.log(response)
          if (res.flag == 'success') {
            this.sunNameList = res.data;
          }
        }).catch(error => {
          console.log(error);
        })
      },
      goSun(pId,sunId) {
        this.$router.push({
          name:'goods',
          query: {
            pId:pId,
            sId: sunId
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

  #sunNav{
    margin: 0;
    width: 640/@rem;
    border-top: 1/@rem solid #ccc;
    .sun-wrapper{
      .nav-list{
        width: 120/@rem;
        display: inline;
        padding: 20/@rem 10/@rem 20/@rem 0;
        text-align: center;
        color: #555555;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .text{
          display: inline-block;
          font-weight: 500;
          font-size: 22/@rem;

        }
      }
      .nav-list.active{
        .text{
          color: @mainColor;
        }
      }


    }
  }



  [data-dpr="1"] #parentNav  .text{
    font-size: 9px;
  }
  [data-dpr="2"] #parentNav  .text{
    font-size: 18px;
  }
  [data-dpr="3"] #parentNav  .text{
    font-size: 32px;
  }
</style>
