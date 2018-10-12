<template>
  <div>
    <div class="sun-nav swiper-container" id="marketNav">
      <ul class="swiper-wrapper sun-wrapper">
        <li class="swiper-slide nav-list" :class="{'active':$route.query.pId?  item.marketTypeId == $route.query.pId: index==0}" v-for="(item,index) in navList"  @click="activeClass(index);goTab(item.marketTypeId)" :key="index"> 
          <span class="text" >{{item.marketTypeName}}</span>
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
        navList: [],  //父导航名称
        changeActive: 0
      }
    },
    mounted(){
      this.$nextTick(function(){
        this.getDataList();
      });
    },
    methods:{

      getDataList(){
        let pId = this.$route.query.pId || '';
        this.$http.post('Api/marketIndex',qs.stringify({parentId:pId})).then(response => {
          let res = response.data;
          if (res.flag == 'success') {
            this.navList = res.marketData;
          }
        }).catch(error => {
          console.log(error);
        });

      },
      goTab(id) {
        this.$router.push({
          name:'market',
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
  #marketNav{
    overflow: hidden;
    width: 640/@rem;
    padding-top: 40px;
    margin: 0;
    border-top: 1/@rem solid #ccc;

    .sun-wrapper {

        .nav-list {
          display: inline;
          padding: 20 / @rem 0;
          max-width: 110 / @rem;
          text-align: center;
          color: #555555;

        .text {
          display: inline-block;
          font-weight: 500;
          font-size: 16px;

        }

      }
    .nav-list.active{
      color: @mainColor;
    }

  }
  }



  /*[data-dpr="1"] #parentNav  .text{*/
    /*font-size: 9px;*/
  /*}*/
  /*[data-dpr="2"] #parentNav  .text{*/
    /*font-size: 18px;*/
  /*}*/
  /*[data-dpr="3"] #parentNav  .text{*/
    /*font-size: 32px;*/
  /*}*/
</style>
