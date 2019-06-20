<template>
  <div>
    <div class="video-wrapper">
      <div class="hit-btn" v-show="!memberState" @click="playerHit" ref="videoPlayer">
        <img :src="videoImg" alt="图片">
        <img src="../../assets/img/icon-player.png" alt="" class="icon-player">
      </div>
      <video class="video" :src="videoUrl"  controls="controls" preload  autoplay webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow"  v-show="memberState">
        <!--<source type="video/mp4"   class="video1">-->
      </video>
    </div>
    <div class="introduce">
      <h1 class="title">{{videoTitle}}</h1>
      <p class="description">
        {{videoIntroduce}}
      </p>
    </div>
    <div class="relate-video">
      <p class="relate-title"><span></span>相关视频</p>
      <div v-for="item in relateList" :key="item.videoId">
        <router-link :to="{name:'video.details',params:{videoId: item.videoId,page:page}}" class="relate-list"  >
          <div class="img">
            <img :src="item.urlPhoto" alt="图片">
          </div>
          <div class="text">
            <p class="tit">{{item.videoName}}</p>
            <p class="desc">{{item.introduce}}</p>
          </div>
        </router-link>
      </div>

    </div>
    <BaseLine class="baseline"></BaseLine>
    <Footer></Footer>
    <mt-header fixed :title="videoTitle">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import BaseLine from '@/common/c-baseline.vue';
  import Footer from '@/common/c-footer.vue';
  export default {
    data () {
      return {
        videoList: [],            //视频列表
        relateList: [],           //相关视频列表
        videoTitle: '',          //视频标题
        videoImg: '',           //视频封面
        videoUrl: '',           //视频地址
        videoIntroduce: '',     //视屏介绍
        token: '',
        memberState: false,  //用户状态
        page: 1,
        consumeGold: '', //金币
        videoArr: [],
        change: false //路由变了

      }
    },
    components: {
      BaseLine,
      Footer
    },
    mounted(){
        this.$nextTick(function(){
          this.getVideoList();
        });
      this.token = this.getCookie('userToken')
    },
    watch: {
      $route(){
        this.change =true;
        this.memberState = false;
        this.videoUrl = '';
        this.getVideoList()
      }
    },
    methods: {
      getVideoList(){
        //this.page
        let id= this.$route.params.videoId;
        if(!this.change){
          this.page= (this.$route.params.page - 1)
        }else{
           this.page= this.$route.params.page;
        }
      
        // if(id>0&&id<=10){
        //   this.page =1;
        // }else if(id>10&&id<=20){
        //   this.page =2;
        // }else if(id>20&&id<=30){
        //   this.page =3;
        // }else if(id>30&&id<=40){
        //   this.page =4;
        // }else if(id>40&&id<=50){
        //   this.page =5;
        // }else if(id>50&&id<=60){
        //   this.page =6;
        // }else{
        //   this.page =100
        // }
        this.$http.post('Member/memberSelectVideo',{page:this.page},{
          transformRequest:function(data){
            let params = '';
            for(let i in data){
              params += i+'='+data[i]+'&'
            }
            return params;
          }
        }).then(response=>{
          let res  = response.data;
          if(res.flag == 'success'){
            this.videoList = res.data;
            this.videoList.forEach((item,index)=>{
              if(item.videoId == this.$route.params.videoId){
                this.videoTitle = item.videoName;
                this.videoImg = item.urlPhoto;
                this.videoIntroduce = item.introduce;
              }
            })

          }else{
            this.videoList = [];
          }
        }).catch(err=>console.log(err));
        //相关视频
        this.$http.post('Member/relationVideo',{videoId:this.$route.params.videoId},{
          transformRequest:function(data){
            let params = '';
            for(let i in data){
              params += i+'='+data[i]+'&'
            }
            return params;
          }
        }).then(response=>{
          let res  = response.data;
          if(res.flag == 'success'){
            this.relateList = res.data;
          }else{
            this.relateList = [];
          }
          //console.log(res)
        }).catch(err=>console.log(err))
      },
      //观看提示
      playerHit(){
        if(this.token){
          this.$http.post('Member/videoInfo',{userToken:this.token,videoId:this.$route.params.videoId},{
            transformRequest:function(data){
              let params = '';
              for(let i in data){
                params += i+'='+data[i]+'&'
              }
              return params;
            }
          }).then(response=>{
            let res =response.data;
            if(res.code == 1){
              this.consumeGold = res.data.consumeGold;    //消耗金币

              //观看提示
              MessageBox.confirm(res.info).then(action => {
                //返回视频地址
                this.$http.post('Member/videoPlay',{userToken:this.token,videoId:this.$route.params.videoId,consumeGold:this.consumeGold},{
                  transformRequest:function(data){
                    let params = '';
                    for(let i in data){
                      params += i+'='+data[i]+'&'
                    }
                    return params;
                  }
                }).then(response=>{
                  let res = response.data;
                  if(res.flag == 'success'){
                    this.videoUrl = res.info.urlAddress;
                    this.memberState = !this.memberState;
                    let goldTotal = (this.getCookie('goldTotal')-0)-(this.consumeGold-0);
                    this.setCookie('goldTotal',goldTotal,1);
                    //设置过期
//                    this.videoArr += this.$route.params.videoId+ ',';
//                    this.setCookie('arr',this.videoArr,1)


                  }

                }).catch(err => console.log(err))
              }).catch(err=>{});
            }else if(res.flag == 'error'){  //积分不足时
              this.$toast({
                message: res.info,
                position: 'middle',
                duration: 2000
              });
            }else{   // 第二次观看

              this.videoUrl = res.data.urlAddress;
              this.memberState = !this.memberState;
            }

          }).catch(err => console.log(err));

        }else {
          this.$toast({
            message: '您还没有登录！',
            position: 'middle',
            duration: 2000
          });
        }

      },
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/common.less";
  .mint-header{
    background: @mainColor;
    /*color: #000;*/
  }

  .video-wrapper{
    margin-top: 40px;
    .video,.video1{
      width: 640/@rem;
      height: 360/@rem;
    }
    .hit-btn,{
      position: relative;
      width: 640/@rem;
      height: 360/@rem;
      img{
        width: 640/@rem;
        height: 360/@rem;
      }
      .icon-player{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 96/@rem;
        height: 96/@rem;
        margin-top: -48/@rem;
        margin-left: -48/@rem;
      }
    }

  }
  .introduce{
    padding: 20/@rem;
    border-bottom: 1/@rem solid #ccc;
    width: 600/@rem;
    .title{
      width: 100%;
      font-size: 32/@rem;
      padding-bottom: 20/@rem;
      color: #555555;
    }
    .description{
    color: #a0a0a0;
      font-size: 26/@rem;
      line-height: 150%;
    }
  }
  .relate-video{
    margin-top: 20/@rem;
    .relate-title{
      height: 50/@rem;
      font-size: 28/@rem;
      line-height: 50/@rem;
      span{
        border-left: 3/@rem solid #555;
        padding: 0 10/@rem;
        margin-left: 20/@rem;
      }
    }
    .relate-list{
      display: block;
      padding: 20/@rem;
      overflow:hidden;
      width: 600/@rem;
      .img{
        float: left;
        width: 200/@rem;
        height: 150/@rem;
        img{
          width: 200/@rem;
          height: 150/@rem;
        }
      }
      .text{
        float: left;
        padding-left: 20/@rem;
        width: 380/@rem;
        .tit{
          width: 100%;
          height: 60/@rem;
          font-size: 26/@rem;
          color: #333;
          line-height: 60/@rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
        .desc{
          color: #a0a0a0;
          font-size: 24/@rem;
          line-height: 150%;
          height: 70/@rem;
          overflow: hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;

        }
      }
    }
  }
.baseline{
  margin-bottom: 60px;
}
</style>
