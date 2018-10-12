<template>
  <div class="home">
    <Header></Header>
    <TopNav :activeIndex="changeIndex"></TopNav>
    <topSwiper></topSwiper>
    <Classify></Classify>
    <RecommendSwiper></RecommendSwiper>
    <RecommendHot></RecommendHot>
    <DataList></DataList>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/Home/Header.vue'
  import TopNav from '@/common/c-nav.vue'
  import topSwiper from '@/components/Home/Swiper.vue'
  import Classify from '@/components/Home/Classify.vue'
  import RecommendHot from '@/components/Home/RecommendHot.vue'
  import RecommendSwiper from '@/components/Home/RecommendSwiper.vue'
  import DataList from '@/components/Home/DataList.vue'
  import Footer from '@/common/c-footer.vue'
  export default {
    data(){
      return {
        changeIndex: 0
      }
    },
    components:{
      Header,
      TopNav,
      topSwiper,
      Classify,
      RecommendSwiper,
      RecommendHot,
      DataList: DataList,
      Footer
    }
  }

</script>

<style scoped lang="less">

</style>
