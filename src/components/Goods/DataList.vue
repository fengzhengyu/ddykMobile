<template>
  <div id="goods" >
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
      <ul class="load-more-wrapper">
      <li class="item-list" v-for="(item,index) in dataList" :key="index">
        <router-link class="goDetail" :to="{name:'goods.details',params:{goodsId:item.id} }" >
          <div class="item-img">
            <img :src="item.photoUnify" v-bind:alt="item.goodsName">
          </div>
          <div class="load-content">
            <h2 class="title">
              <p class="text">{{item.goodsName}}</p>
              <!--<span class="time">{{item.passTime | getData}}</span>-->
            </h2>
            <h3 class="word-text company">{{item.approve}}</h3>
            <p class="word-text">
              <span class="name">厂家：</span>
              <span class="message  wordbreak">{{item.productCompany}}</span>
            </p>
            <p class="word-text">
              <span class="name ">介绍：</span>
              <span class="description">详见说明</span>
            </p>
            <p class="word-text contact">

              <a :href="item.phone | formatPhone" class="tel"> <i class="iconfont icon-zuoji"></i>我要洽谈</a>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    </mt-loadmore>
    <div v-show="dataList.length <=0" class="no-data">
      当前分类暂无数据！
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    filters: {
      // formatPhone: (d)=>{
      //   return 'tel://' + d.substring(0,11);
      // },
      // getData:(data)=>{
      //   var time = new Date(parseInt(data * 1000)),
      //     y = time.getFullYear(),
      //     m = time.getMonth()+1,
      //     d = time.getDate();
      //   return y + '-' + (m < 0 ? '0'+ m : m)+ '-' + (d < 0 ? '0'+ d : d);
      // }
    },
    data(){
      return {
        dataList: [],
        isAutoFill:false,//是否自动检测，并调用loadBottom
        allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
        page:1, //页码
        height:'',//根节点div高度
      }
    },
    mounted(){
      this.$nextTick(function(){
        this.getDataList();

      });
    },
    watch: {
      $route(){
        this.page =1;
        this.allLoaded = false;
        this.getDataList()
      }
    },
    methods: {
      loadBottom(){
        let pId = this.$route.query.pId || 1;
        let sId = this.$route.query.sId || ''; //,typeSunId:sId
        this.$http.post('Goods/selectGoodsTypeList',qs.stringify({typeId:pId,typeSunId:sId,page:this.page})).then((response) => {
            let res = response.data;
            if( res.flag == 'success'){
              //追加下一页的数据
              this.dataList = this.dataList.concat(res.data);
              this.page ++;
              //从loading状态通知回到pull初始状态
              if( this.dataList.length<=9){
                this.allLoaded = true;
                return;
              }
              this.$refs.loadmore.onBottomLoaded();

            }else{
              this.abc = true;
              this.$toast({
                message: '没有更多数据了',
                position:'middle',
                duration: 3000
              });
              //禁止下拉刷新函数调用
              this.allLoaded = true;
              return;
            }

          })
          .catch(err=>console.log(err));
      },
      getDataList() {
        let pId = this.$route.query.pId || 1;
        let sId = this.$route.query.sId || ''; //,typeSunId:sId
        this.$http.post('Goods/selectGoodsTypeList',qs.stringify({typeId:pId,typeSunId:sId})).then((response) => {
          let res = response.data;
          // console.log(response)
          if (res.flag == 'success') {
           this.dataList =res.data;
            this.page ++;
            // console.log(this.dataList)
          }else{
            this.dataList = [];
          }
        }).catch(error => {
          console.log(error);
        })
      },
    }
  }

</script>

<style lang="less" scoped>
  @import "../../style/common.less";

  #goods {
    width: 640/@rem;
    height: auto;
    padding-bottom: 55px;

  // .load-more-wrapper {

  // }

  .item-list {

    display: table;
    height: 150 / @rem;
    border-top: 1px solid #bfbfbf;
    padding:  30 / @rem 20 / @rem;
    overflow: hidden;
    .goDetail{
      display: block;
      width: 600/@rem;
      height: 150/@rem;
    }
  .item-img {
    float: left;
    width: 200 / @rem;
    height: 150 / @rem;
    padding-right: 20 / @rem;

  img {
    width: 200 / @rem;
    height: 150 / @rem;
  }

  }
  .load-content {
    float: left;
    width: 380 / @rem;
    height: 150 / @rem;

  .title {
    width: 100%;
    height: 30 / @rem;
    line-height: 30 / @rem;

  .text {
    //width: 70%;
    width: 100%;
    font-size: 26/@rem;
    float: left;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .time {
    text-align: right;
    width: 30%;
    font-size: 24/@rem;
    float: left;
    color: #a0a0a0;
  }

  }
  .word-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #a0a0a0;
    font-size: 22/@rem;
    height: 30 / @rem;
    line-height: 30 / @rem;
  }

  .word-text.company {
    color: #00558b;
  }

  .word-text.contact {
    text-align: right;

  .tel {
    color: @mainColor;
    vertical-align: top;

  i {
    font-weight: 700;
    font-size: 32 / @rem;
  }

  }
  }
  }
  }
  .no-data{
    height: 190/@rem ;
    text-align: center;
    color: #555555;
    font-size: 28@rem;
    line-height: 190/@rem;
  }
  }
  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }

  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }

  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }

  .page-loadmore-desc:last-of-type,
  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  /*.mint-loadmore-bottom span.is-rotate {*/
  /*-webkit-transform: rotate(180deg);*/
  /*transform: rotate(180deg)*/
  /*}*/

</style>
