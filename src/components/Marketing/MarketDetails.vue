<template>
  <div class="details-page">
    <div class="detail-wrapper">
      <h1 class="title">{{dataList.marketTitle}}</h1>
      <p class="time"> {{dataList.publishTime}}</p>
      <div class="article" v-html="dataList.marketContent">

      </div>
    </div>

    <mt-header fixed title="营销详情">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>

</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    data() {
      return {
        dataList: '',
        phone: ''
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.getDetailsData();
      })
    },

    methods:{
      getDetailsData:function(){

        this.$http.post('Channel/marketInfo',qs.stringify({'marketId':this.$route.params.marketId})).then((response)=>{
          var res = response.data;
          if(res.flag == 'success'){
            this.dataList = res.marketData;
            // console.log(this.dataList)
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }

</script>


<style lang="less" scoped>
  @import "../../style/common.less";
  .details-page{
    padding: 40px 0  90/@rem 0;
  }
  .detail-wrapper{
    padding: 0 20/@rem 50/@rem 20/@rem;
 
    .title{
      width: 600/@rem;
      padding-top: 20/@rem;
      font-size: 26/@rem;
      color: #000;
      text-align: center;
    }
    .time{
      width: 600/@rem;
      text-align: center;
      font-size: 24/@rem;
      height: 30/@rem;
      line-height: 30/@rem;
    }
    .article{
      font-size: 14px;
      width: 600/@rem;
      color: rgb(109, 109, 109);
    }
  }
  .mint-header{
    background: @mainColor;
  }
</style>
