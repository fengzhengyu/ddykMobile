<template>
  <div class="goods">
    <ParentNav></ParentNav>
    <SunNav></SunNav>
    <DataList></DataList>
    <Footer></Footer>
    <mt-header fixed title="招商">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">

  import ParentNav from '@/components/Goods/ParentNav.vue'
  import SunNav from '@/components/Goods/SunNav.vue'
  import DataList from '@/components/Goods/DataList.vue'
  import Footer from '@/common/c-footer.vue'
  export default {
    components: {
      ParentNav,
      SunNav,
      DataList,
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
