<template>
  <div class="searchPage">
    <div class="search-wrapper">
      <form action="javascript:void(0)">
        <input type="search" class="text"  placeholder="招商产品搜索" @keyup.enter="SearchGoodsName"  v-model="goodsName" v-focus>
      </form>
      <!--<input type="search" class="text"  placeholder="招商产品搜索" @keyup.enter="SearchGoodsName(goodsName)"  v-model="goodsName" v-focus>-->
      <i class="iconfont icon-sousuo" @click="SearchGoodsName"></i>
      <span class="cancel" @click="$router.go(-1)">取消</span>
    </div>
    <div class="partition"></div>
    <TopNav :activeIndex="changeIndex" v-show="!tipsShow"></TopNav>
    <div class="category-wrapper" v-show="!tipsShow">
        <router-link :to="{name:'goods',query:{pId:item.id}}"  class="category-list" v-for="item in parentNameList" :key="item.id">
          <span>{{item.goodsParentsName.substring(0,4)}}</span>
        </router-link>
    </div>
    <div class="tips" v-show="tipsShow">{{searchText}}</div>
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
      <ul class="load-more-wrapper">
        <li class="item-list" v-for="(item,index) in searchData" :key="index">
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
  </div>
</template>


<script type="text/ecmascript-6">
  import TopNav from '@/common/c-nav.vue'
  import qs from 'qs';
  export default {
    data(){
      return {
        goodsName: '',
        changeIndex: null,
        searchText: '',
        searchData: [],
        tipsShow: false,
        parentNameList: [],
        isAutoFill:false,//是否自动检测，并调用loadBottom
        allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
        page:1, //页码
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.getParentNameList();
      })
    },
    watch:{
      goodsName (val){
        if(val == ''){
          this.tipsShow = false;
          this.searchData = [];
        }
      }

    },

    methods: {
      //搜索
      SearchGoodsName(){
        this.tipsShow = true;
        this.searchData = [];
        this.$http.post('Api/searchGoodsList', qs.stringify({goodsName: this.goodsName})).then(response=> {
          let res = response.data;
          if (res.flag == 'success') {
            this.searchData = res.data;
            this.page++;
            this.searchText = '共搜到' + res.dataTotal + '条数据';
           // console.log(res)
          } else {
            this.searchText = res.info;
//            this.$toast({
//              message: res.info,
//              position: 'middle',
//              duration: 2000
//            });
          }

        }).catch(err=>console.log(err))

      },
      loadBottom(){
        this.$http.post('Api/searchGoodsList', qs.stringify({goodsName: this.goodsName,page:this.page})).then(response=> {
            let res = response.data;
            if( res.flag == 'success'){
              //追加下一页的数据
              this.searchData = this.searchData.concat(res.data);
              this.page ++;
              //从loading状态通知回到pull初始状态
              if( this.searchData.length<=9){
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
      //加载导航
      getParentNameList() {
        this.$http.post('Api/selectGoodsIndex').then((response) => {
          let res = response.data;
          if (res.flag == 'success') {
            this.parentNameList = res.data;

            //console.log(this.parentNameList)
          }
        }).catch(error => {
          console.log(error);
        });
      },

    },
    components: {
      TopNav,
    }
  }

</script>

<style lang="less" scoped>
  @import "../style/common.less";

.searchPage{

}
  .search-wrapper{
    background-color: @mainColor;
    display: inline-block;
    padding:  15/@rem 80/@rem 15/@rem 20/@rem;
    top: 0;
    left: 0;
    position:fixed;
    z-index:999999;

  .text{
    width: 540/@rem;
    height: 50/@rem;
    border-radius: 10/@rem;
    padding-left: 50/@rem;
    border: none;
    outline: none;
    background: #fff;
    font-size: 20/@rem;
    color: #555;
    line-height: 50/@rem;
  }
  i{
    font-size: 28/@rem;
    position: absolute;
    top: 24/@rem;
    left: 30/@rem;
    color: @mainColor;
    font-weight: 700;
  }
  .cancel{
    font-size: 28/@rem;
    position: absolute;
    top: 22/@rem;
    right: 10/@rem;
    color: #fff;
  }
  }
  .partition{
    padding-top: 80/@rem;
  }
  .category-wrapper{
    overflow: hidden;
    background: #eb9059;
    width: 640/@rem;
    .category-list{
      width: 20%;
      height: 50/@rem;
      text-align: center;
      line-height: 50/@rem;
      font-size: 24/@rem;
      color: #fff;
      float: left;
      span{
        display: inline-block;
        width: 100%;
        height: 100%;
        border: 1/@rem solid #fff;
      }
    }
  }
  .tips{
    text-align: center;
    color: #333;
    background: #c8c8c8;
    font-size: 22/@rem;
    height: 50/@rem;
    line-height: 50/@rem;
  }

  .load-more-wrapper {

  }

  .item-list {

    display: table;
    height: 150 / @rem;
    border-top: 0.01rem solid #bfbfbf;
    padding: 20 / @rem;
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
    width: 70%;
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
</style>
