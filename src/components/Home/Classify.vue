<template>
  <div>
    <section class="classify">
    <ul class="classify-wrapper">
    <li class="classify-list" v-for="(item,index) in parentNameList" :key="item.id">
    <router-link :to="{name:'goods',query:{pId:item.id} }" class="link">
      <span class="icon-box"><i class="icon iconfont" :class="parentListImg[index]"></i></span>
      <span class="text">{{item.goodsParentsName.substring(0,4)}}</span>
    </router-link>
    </li>
    </ul>
    <!--<ul class="oh"><li class="list"><router-link href=""><span class="icon-box"><i class="iconfont  icon-jiaonang"></i></span> <span class="text">中西药品</span></router-link></li><li class="list"><a href="selectGoods.html?id=2"><span class="icon-box"><i class="iconfont  icon-zhongyao"></i></span> <span class="text">中药材</span></a></li><li class="list"><a href="selectGoods.html?id=3"><span class="icon-box"><i class="iconfont  icon-zhongyaoyinpian"></i></span> <span class="text">中药饮片</span></a></li><li class="list"><a href="selectGoods.html?id=4"><span class="icon-box"><i class="iconfont  icon-zibuyangsheng"></i></span> <span class="text">滋补保健</span></a></li><li class="list"><a href="selectGoods.html?id=5"><span class="icon-box"><i class="iconfont  icon-dianpu"></i></span> <span class="text">医疗器械</span></a></li><li class="list"><a href="selectGoods.html?id=6"><span class="icon-box"><i class="iconfont  icon-shezhi"></i></span> <span class="text">中药加工</span></a></li><li class="list"><a href="selectGoods.html?id=7"><span class="icon-box"><i class="iconfont  icon-baozhuanggongxuguanli"></i></span> <span class="text">制药包装</span></a></li><li class="list"><a href="selectGoods.html?id=8"><span class="icon-box"><i class="iconfont  icon-meizhuang"></i></span> <span class="text">医美药妆</span></a></li><li class="list"><a href="selectGoods.html?id=9"><span class="icon-box"><i class="iconfont  icon-3"></i></span> <span class="text">母婴用品</span></a></li><li class="list"><a href="selectGoods.html?id=10"><span class="icon-box"><i class="iconfont  icon-biyuntao"></i></span> <span class="text">成人用品</span></a></li></ul>-->

    </section>
  </div>
</template>
<script >
  export default {
    data() {
      return {
        parentNameList: [],     //父导航名称
        parentListImg: [
          'icon-jiaonang', 'icon-zhongyao', 'icon-zhongyaoyinpian', 'icon-zibuyangsheng', 'icon-dianpu',
          'icon-shezhi', 'icon-baozhuanggongxuguanli', 'icon-meizhuang', 'icon-3', 'icon-biyuntao'
        ]
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getParentNameList();
      })
    },
    methods: {
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
    }
  }

</script>

<style lang="less" scoped>
  @import "../../style/common.less";

  .classify {
    width: 640 / @rem;

    .classify-wrapper {
      width: 100%;
      padding-top: 30 / @rem;
      overflow: hidden;

      .classify-list {
        float: left;
        /*text-align: center;*/
        /*padding-bottom: 30 / @rem;*/
        width: 20%;

        .link {
          display:block;
          width: 93 / @rem;
          text-align: center;
          margin: 0 0.17rem 0.3rem 0.17rem;


          .icon-box {
            display: block;
            width: 93 / @rem;
            height: 93 / @rem;
            line-height: 93 / @rem;
            -webkit-border-radius: 15 / @rem;
            -moz-border-radius: 15 / @rem;
            border-radius: 15 / @rem;
            background-color: @mainColor;

            .icon {
              display: inline-block;
              vertical-align: middle;
              font-size: 48/ @rem;
              color: #fff;
              position: relative;
            }

          }
          .text {
            width: 93/@rem;
            margin-top: 5 / @rem;
            font-size: 22/@rem;
            color: #8f8f8f;
            /*display: block;*/
            /*overflow: hidden;*/
            /*white-space: nowrap;*/
            /*text-overflow: ellipsis;*/
        }

        }
      }
    }
  }
</style>
