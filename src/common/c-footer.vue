<template>
  <footer class="footer" @click.stop='goRouter'>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index">
        <i slot="icon" class="iconfont icon-shouye"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        视频
      </mt-tab-item>
      <mt-tab-item id="member">
        <i slot="icon" class="iconfont icon-iconfontwode"></i>
        &nbsp; 我
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        selected:'',
      }
    },
    mounted(){

      //获取当前路由名称，根据该名称给当前footer添加is-selected
      let Rname = this.$route.name;
      switch (Rname) {
        case 'index':
          this.selected = 'index';
          break;
        case 'video':
          this.selected = 'video';

          break;
        case 'member':
          this.selected = 'member';

          break;
      }
    },
    methods: {
      goRouter() {
        this.$router.push({
          name: this.selected
        })
      }
    },
  }

</script>

<style lang="less" scoped>
  @import '../style/common.less';
  footer{
    .mint-tabbar{
      background: #fff;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
    .is-selected {
      color: @mainColor;
      background-color: #fff;

    }
    i {
      font-size: 24px;
    }

    }
  }

</style>
