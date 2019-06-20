<template>
  <div class="video">
    <div class="video-rapper">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
        <ul class="load-more-wrapper">
          <li class="load-item" v-for="(item,index) in videoList" :key="index">
             <router-link :to="{name:'video.details',params:{videoId:item.videoId,page:page}}" class="link">
               <div class="img">
                 <img :src="item.urlPhoto" alt="图片">
               </div>
               <div class="title">
                {{item.videoName}}
               </div>
             </router-link>
          </li>
        </ul>
      </mt-loadmore>
      <!--<div @click="loadBottom()">下一页</div>-->
    </div>

    <mt-header fixed title="药商大讲堂">

    </mt-header>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Footer from '@/common/c-footer.vue';
  import { videoPlayer } from 'vue-video-player';
  export default {
    data () {
      return {
        videoList:[], //视频列表
        page:1,
        isAutoFill:false,//是否自动检测，并调用loadBottom
        allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
      }
    },
    mounted(){
      this.$nextTick(function(){
        this.getVideoList();
      });
    },
    methods: {
      loadBottom(){
       this.$http.post('Member/memberSelectVideo',{page:this.page},{
        transformRequest:[function(data){
          let params = '';
          for(let index in data ){
            params += index+ '='+data[index]+ '&';
          }
          return params
        }]
      }).then((response) => {
       
          let res = response.data;
          if( res.flag == 'success'){
            //追加下一页的数据
            this.videoList = this.videoList.concat(res.data);
            this.page ++;
           // sessionStorage.setItem('videoList',this.videoList);
            //从loading状态通知回到pull初始状态
            if( this.videoList.length<=9){
              this.allLoaded = true;
              return;
            }
            this.$refs.loadmore.onBottomLoaded();

          }else{
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
      getVideoList(){

          this.$http.post('Member/memberSelectVideo').then(response=>{
            let res  = response.data;
            if(res.flag == 'success'){
              this.videoList = res.data;
              this.page++;
//              console.log(this.videoList)
//              sessionStorage.setItem('videoList',this.videoList);
//              console.log( JSON.parse(sessionStorage.getItem('videoList')))
            }else{
              this.videoList = [];
            }
          // console.log(res)
          }).catch(err=>console.log(err))
      }
    },
    components: {
     Footer
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/common.less";
  .mint-header{
    background: @mainColor;
  }
  .video-rapper{
    margin: 40px 0 50px 0;
    width: 620/@rem;
    padding: 10/@rem;
    .load-more-wrapper{
        overflow:hidden;
      .load-item{
        padding: 10/@rem;
        float: left;
        .link{
          display: block;
          width:  290/@rem;
          height: auto;
          overflow: hidden;
          .img{
            width:  290/@rem;
            height: 155/@rem;
            float: left;
            img{
              width:  290/@rem;
              height: 155/@rem;
            }
          }
          .title{
            float: left;
            width:  290/@rem;
            height: 80/@rem;
            font-size: 24/@rem;
            color: #555555;
            font-weight: bold;
            line-height: 40/@rem;
            overflow: hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
        }
      }
    }

  }

</style>
