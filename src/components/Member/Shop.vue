<template>
  <div class="shop">
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
      <ul class="load-more-wrapper">
        <li class="item-list" v-for="(item,index) in dataList" :key="index">
          <!--<router-link class="goDetail" :to="{name:'goods.details',params:{goodsId:item.id} }" >-->
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
                <span class="name ">主治：</span>
                <span class="description">{{item.effect}}</span>
              </p>
              <p class="word-text contact">

                <span  class="tel"> {{item.checkType}}</span>
              </p>
            </div>
          <!--</router-link>-->
        </li>
      </ul>
    </mt-loadmore>
    <div v-show="dataList.length <=0" class="no-data">
      您还没有发布商品！
    </div>
    <mt-header fixed title="我的商铺">
      <router-link to="" slot="left" >
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    data(){
      return {
        dataList: [],
        token: '',
        page: 1,
        isAutoFill:false,//是否自动检测，并调用loadBottom
        allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
      }
    },
    created(){

      //取会员信息
      if(this.getCookie('userToken')){
        this.token = this.getCookie('userToken');
      }else{

        this.$router.push({
          name: 'login'
        })
      }
      //console.log(this.token)
      this.$http.post('Api/memberSelectGoodsList',qs.stringify({userToken:this.token})).then(response=>{
        let res =response.data;
        if(res.flag == 'success'){
            this.dataList =res.data;
          this.page++;
        }else{
          this.dataList = [];
        }

      }).catch(err=>console.log(err))
    },
    methods:{
      loadBottom(){
        this.$http.post('Api/memberSelectGoodsList',qs.stringify({userToken:this.token,page:this.page})).then(response=>{
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
    }
  }

</script>


<style lang="less" scoped>
  @import "../../style/common.less";
  .mint-header{
    background: @mainColor;
  }
  .shop{
    width: 640/@rem;
    height: auto;
    padding-top: 40px;
    

  .load-more-wrapper {

  }

  .item-list {

    display: table;
    height: 150 / @rem;
    border-top:1px solid #bfbfbf;
    padding: 30 / @rem 20 / @rem;
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
    color: red;
    vertical-align: top;


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
</style>
