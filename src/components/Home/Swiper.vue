<template>
    <div>
      <mt-swipe :auto="4000">
        <a :href="item.jumpUrl" v-for="(item,index) in  sliderData" :key="index">
          <mt-swipe-item ><img :src="item.picture" alt="图片已丢失" class="img"></mt-swipe-item>
        </a>

      </mt-swipe>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        sliderData: [],  //轮播数据
      }
    },
    mounted(){
      //this.$nextTick(function () {
        this.getSliderData();
      //})
    },
    methods: {
      getSliderData(){
        this.$http.post('Api/selectGoodsIndex').then(response => {
          let res = response.data;

          if (res.flag == 'success') {
            this.sliderData =  res.dataAd;
           // console.log(res)
          }
        }).
        catch(error => {
          console.log(error)
        })
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../../style/common.less";
  .mint-swipe{
    height: 240/@rem;
    width: 640/@rem;
    text-align:center;
  .img{
    width: 640/@rem;
    height: 240/@rem;
  }
  }

</style>
