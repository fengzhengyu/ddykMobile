<template>
  <div class="market">

    <marketNav></marketNav>
    <marketList ></marketList>
    <Footer></Footer>
    <mt-header fixed title="营销">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">

  import Marketing from '@/components/Marketing/MarketNav.vue'
  import marketList from '@/components/Marketing/MarketList.vue'
  import Footer from '@/common/c-footer.vue'
  export default {
    components: {
      marketNav: Marketing,
      marketList,
      Footer
    }
  }

</script>

<style lang="less" scoped>
  @import "../style/common.less";
  .mint-header{
    background: @mainColor;
  }
</style>
