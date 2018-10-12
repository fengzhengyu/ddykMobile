<template>
  <div ref="loadwrapper" :style="'height:' + height" class="loadwrapper">
    <!---->
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
      <ul class="load-more-wrapper">
        <li class="item-list" v-for="(item,index) in goodsList" :key="index">
          <router-link  :to="{name:'goods.details',params:{goodsId:item.id}}" >
            <div class="item-img">
              <img :src="item.photoUnify" v-bind:alt="item.goodsName">
            </div>
            <div class="load-content">
              <h2 class="title">
                <p class="text">{{item.goodsName}}</p>
                <span class="time">{{item.passTime | getData}}</span>
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

                <a :href="item.phone | formatPhone" class="tel" > <i class="iconfont icon-zuoji"></i>我要洽谈</a>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>

  </div>

</template>
<script type="text/ecmascript-6">
  export default {
   // props:['appRefs'],//接受app里的头和底部
    filters: {
      getData:(data)=>{
        var time = new Date(parseInt(data * 1000)),
          y = time.getFullYear(),
          m = time.getMonth()+1,
          d = time.getDate();
        return y + '-' + (m < 0 ? '0'+ m : m)+ '-' + (d < 0 ? '0'+ d : d);
      }
    },
    data(){
      return {
        goodsList:[],//商品列表
        isAutoFill:false,//是否自动检测，并调用loadBottom
        allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
        page:1, //页码
        height:'',//根节点div高度
        abc: false
      }
    },
    //操作DOM
    mounted(){
    // this.changeHeight();
    },
    created(){
      //获取路由参数
      this.page = this.$route.query.page||1;
      //发请求
      this.$http.get(`Api/selectGoodsTypeList?page=${this.page}`).then(response =>{
        // console.log(response)
        let res = response.data;
       // console.log(res)
      if(res.flag == 'success'){
        this.goodsList = res.data
        this.page++;
        //  console.log(this.dataList)
      }else{
        this.dataList = [];
      }

    }).catch(error => {
        //alert(error);
      });

    },
    methods:{
      //触发上拉函数
      loadBottom(){
        this.$http.get(`Api/selectGoodsTypeList?page=${this.page}`)
          .then(response=>{
          //判断是否还有数据
            let res= response.data;
            //console.log(res)
            if( res.flag == 'success'){
              //追加下一页的数据
              this.goodsList = this.goodsList.concat(res.data);
              this.page ++;
              //从loading状态通知回到pull初始状态
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

        //this.page -> 5
        //获取第五页的数据追加，并自增 -> 6

        // this.allLoaded = true; //一次后，禁止该函数的调用

        //发请求获取数据
        // this.$refs.loadmore.onBottomLoaded();
        // console.log(this.$refs.loadmore);
        // console.log(this.$refs.ul);
        // console.log(this);
      },
      changeHeight(){//改变父盒子高度
        this.height = document.documentElement.clientHeight
        -this.$refs.loadwrapper.offsetHeight;
      }
    },
  }


</script>
<style lang="less" scoped>
  @import "../../style/common.less";

  .loadwrapper{
    padding-bottom: 55px;
    height:auto;
  }
  .load-more-wrapper{
    width: 100%;

  }
  .item-list{

    display:table;
    height: 150/@rem;
    border-top: 0.01rem solid #bfbfbf;
    padding: 20/@rem;
    overflow: hidden;

  .item-img{
    float: left;
    width: 200/@rem;
    height: 150/@rem;
    padding-right: 20/@rem;
  img{
    width: 200/@rem;
    height: 150/@rem;
  }
  }
  .load-content {
    float: left;
    width: 380/@rem;
    height: 150/@rem;

  .title{
    width: 100%;
    height: 30/@rem;
    line-height: 30/@rem;

  .text{
   
    // width: 65%;
    width: 100%;
    font-size: 26/@rem;
    float: left;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .time{
    display: none;
    text-align: right;
    width: 35%;
    font-size: 22/@rem;
    float: left;
    color: #a0a0a0;
  }
  }
  .word-text{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #a0a0a0;
    font-size: 22/@rem;
    height: 30/@rem;
    line-height: 30/@rem;
  }
  .word-text.company{
    color: #00558b;
  }
  .word-text.contact{
     text-align: right;

  .tel{
    color: @mainColor;
    vertical-align: top;
  i{
    font-weight: 700;
    font-size: 32/@rem;
  }
  }
  }
  }
  }

  /*ul {*/
    /*overflow: hidden;*/
  /*}*/
  /*li {*/
    /*width: 50%;*/
    /*float: left;*/
    /*padding: 6px;*/
    /*box-sizing: border-box;*/
  /*}*/


  /*li > a:not(.mui-btn) {*/
    /*margin: 0px;*/
    /*padding: 0px;*/
    /*border: 1px solid #5c5c5c;*/
    /*box-shadow: 0 0 4px #666;*/
    /*width: 100%;*/
    /*display: block;*/


  /*}*/

  /*li > a:not(.mui-btn) img {*/
    /*width: 100%;*/
  /*}*/

  /*.sell > span {*/
    /*float: left;*/
    /*color: red;*/
    /*text-align: left;*/
  /*}*/

  /*.detail >.hot {*/
    /*float: left;*/
    /*text-align: left;*/
    /*font-size: 15px;*/
  /*}*/

  /*.detail >.count {*/
    /*float: right;*/
    /*text-align: right;*/
    /*font-size: 15px;*/
  /*}*/


  /*!*撑开，去除浮动没有的高度*!*/

  /*.detail {*/
    /*overflow: hidden;*/
  /*}*/

  /*.desc {*/
    /*color: rgba(92, 92, 92, 0.8);*/
    /*background-color: rgba(0, 0, 0, 0.2);*/
  /*}*/

  /*img {*/
    /*height: 200px;*/
  /*}*/
</style>
