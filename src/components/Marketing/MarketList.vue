<template>
  <div>
      <div id="loadMore" :style="'height:' + height" >
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
           <ul class="load-more-wrapper">
            <li class="item-list" v-for="(item,index) in dataList" :key="index" >
              <router-link class="goDetail" :to="{name:'market.details',params:{marketId:item.marketId} }" >
                <div class="item-img" v-show="item.marketPhoto== '暂无'? false:true" >
                  <img :src="item.marketPhoto" :alt="item.marketTitle">
                </div>
                <div class="load-content" :class="{'imgHide':item.marketPhoto == '暂无'?1:0}">
                  <h2 class="title">
                    <p class="text">{{item.marketTitle}}</p>
                    <!--<span class="time">{{item.passTime | getData}}</span>-->
                  </h2>
                  <p class="introduce">
                   {{item.marketIntroduce}}
                  </p>
                  <p class="list-time">{{item.publishTime}}</p>
                </div>
              </router-link>
            </li>
        </ul>
        </mt-loadmore>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    data(){
      return {
        dataList: [],
        isImg: false,
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
    methods:{
      //触发上拉函数
      loadBottom(){

        let pId = this.$route.query.pId || '';
        // parentId
        this.$http.post('Api/marketIndex',qs.stringify({parentId:pId,page:this.page})).then(response => {
          let res = response.data;
            if( res.flag == 'success'){
              //追加下一页的数据
              this.dataList = this.dataList.concat(res.marketDataList);
             // console.log(this.dataList)
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
      },
      getDataList(){
        let pId = this.$route.query.pId || '';
        this.$http.post('Api/marketIndex',qs.stringify({parentId:pId})).then(response => {
          let res = response.data;

          if (res.flag == 'success') {
            this.dataList = res.marketDataList;
            this.page++;
          }
        }).catch(error => {
          console.log(error);
        });

      },
    }
  }

</script>

<style lang="less" scoped>
  @import "../../style/common.less";


  .mint-header{
    background: @mainColor;
  }

  #loadMore {
    width: 640/@rem;
    padding-bottom: 55px;
    margin: 0;
  .load-more-wrapper {
    width: 100%;
  }

  .item-list {
    padding:  20 / @rem;
    overflow: hidden;
    .goDetail{
      display: block;
      width: 640/@rem;
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
      width:  380 / @rem;
      height: 150 / @rem;

      .title {
        width: 100%;
        vertical-align: middle;
        height: 60 / @rem;
        padding-top: 10/@rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        .text {
          display: inline-block;
          width: 100%;
          line-height: 30/@rem;
          font-size: 26/@rem;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

        }

      }
      .introduce {
        width: 100%;
        color: #a0a0a0;
        font-size: 24/@rem;
        height: 30 / @rem;
        line-height: 30 / @rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden; /** 隐藏超出的内容 **/
        padding-top: 5/@rem;
      }
      .list-time{
        width: 100%;
        height: 30 / @rem;
        line-height: 30 / @rem;
        text-align: right;
        font-size: 24/@rem;
        color: #a0a0a0;
      }
    }
    .load-content.imgHide{
      width: 600/@rem;
      .title,.introduce,.list-time{
        width: 100%;
      }
    }
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

</style>
