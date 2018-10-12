<template>
  <div class="market">
    <PurchaseNav></PurchaseNav>
    <PurchaseList></PurchaseList>
    <v-footer></v-footer>
    <mt-header fixed title="采购">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import Purchase from '@/components/Purchase/PurchaseNav.vue'
  import PurchaseList from '@/components/Purchase/PurchaseList.vue'
  import Footer from '@/common/c-footer.vue'
  export default {
    components: {
       PurchaseNav: Purchase,
      PurchaseList,
      'v-footer': Footer
    }
  }

</script>

<style lang="less" scoped>
  @import "../style/common.less";
  .mint-header{
    background: @mainColor;
  }
</style>
