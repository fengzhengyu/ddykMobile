<template>
    <div class="goods-details">

      <div class="detail-image">
        <img id="img" :src="dataList.photoUnify" alt="">
      </div>
      <div class="detail-message">
        <h1 class="title" id="title">{{dataList.goodsName}}</h1>
        <p class="approve">{{dataList.approve}}</p>
        <p class="company">
          <span class="name">生产厂家：</span>
          <span class="message fl wordbreak">{{dataList.productCompany}}</span>
        </p>
        <p class="effect">
          <span class="name">产品介绍：</span>
          <span class="desc" >详见说明</span>
        </p>
        <p class="norms">
          <span class="name">产品规格：</span>
          <span class="message ">{{dataList.norms}}</span>
        </p>
        <p class="require">
          <span class="name">招商要求：</span>
          <span class="desc" id="desc">{{dataList.require}}</span>
        </p>
      </div>
      <!--<div class="goods-recommend">-->
        <!--<div class="new-logo-box">-->
          <!--<div class="logo"> <img src="images/new-logo.png" alt=""></div>-->
        <!--</div>-->
        <!--<ul class="oh">-->
          <!--<li class="recommend-list" v-for="item in recommendData">-->
            <!--<a :href="['selectGoods.html?id='+item.id]" class="box">-->
              <!--<span class="img"><img :src="item.photoUnify" alt="图片已丢失"></span>-->
              <!--<span class="text wordbreak">{{item.goodsName}}</span>-->
            <!--</a>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <div class="concat-phone">
        <a :href="phone | formatPhone" class="phone" ><i class="iconfont icon-zuoji tel"></i>我要代理</a>
      </div>
      <mt-header fixed title="产品详情">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
        </router-link>
         <mt-button icon="" slot="right" style=" margin-right: 10px;" @click="goHome"><i class="iconfont icon-shouye collect-icon1" ></i></mt-button>
        <mt-button icon="" slot="right"><i class="iconfont icon-shoucang collect-icon" :class="{'active':active}" @click="clickCollect"></i></mt-button>
      </mt-header>
    </div>
  
</template>

<script type="text/ecmascript-6">

  import sha1 from 'js-sha1'
  import wx from 'weixin-js-sdk'
  import qs from 'qs';
  export default {
    data() {
      return {
        token: '',   //用户标识
        dataList: '', //商品详情数据
        phone: '',    //手机号及电话号
        active: false,  //收藏状态
        url: '', //分享网址
        link: '',
        timestamp: '',  //时间戳
        nonceStr: "", //自定义随机字符串
        ticket: '',  //凭证
        signature: '' //签名
      }
    },
    mounted:function(){
     if(this.getCookie('userToken')){
        this.token = this.getCookie('userToken');
      }
      this.$nextTick(function(){
          //
          this.getDetailsData(); //数据接口
          this.getWeChatShare(); //分享接口
        //this.getRecommendData()
    
      })
      
      let location = window.location.href.split('#')[0];
      let urlStr = location.split('?')[0];
        // console.log(location)
        // console.log(urlStr)
      if(urlStr== 'http://www.ey99.com/ddykMobile/'){  //是否是分享后的url
          this.url = window.location.href.split('#')[0];
          this.link = this.url+"?#/goods/details/"+this.$route.params.goodsId;
      
      }else{
          this.url = urlStr.split('?')[0];
          this.link = urlStr.split('?')[0]+"?#/goods/details/"+this.$route.params.goodsId;
        
      }
     
      //自定义字符串
      let str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for(let i=0;i<16;i++){
        this.nonceStr += str.substr(Math.round((Math.random() * 10)), 1);  
      }
       
    },
     watch: {
      $route(){
         this.getWeChatShare(); //当路由改变时 重新请求签名
      }
    },

    methods:{

      getWeChatShare(){
       
        this.$http.post('Weixinpay/getWeChatShare',qs.stringify({userToken:this.token})).then(response=>{
            let res =response.data;
            this.timestamp = res.data.time;
            this.ticket = res.data.ticket;

            let s = '';
            s = "jsapi_ticket=" + this.ticket + "&noncestr=" + this.nonceStr + "&timestamp=" + this.timestamp + "&url="+this.url;  
            this.signature = sha1(s);//对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）
            //  console.log(res )
            //  console.log(this.ticket)
            //  console.log(this.nonceStr)
            //  console.log(this.timestamp)
            //  console.log(this.signature)
            wx.config({
            debug: false,
            appId: 'wxba75f160615a7660', 
            timestamp: this.timestamp,
            nonceStr:  this.nonceStr,
            signature: this.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'chooseImage','uploadImage','startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice']
            // 所有要调用的 API 都要加到这个列表中
          })
          wx.ready(() => {
            //分享给朋友
                 // console.log(this.link)
            wx.onMenuShareAppMessage({
              title: document.getElementById('title').innerText, // 分享标题
              link:  this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
           
               desc: document.getElementById('desc').innerText, // 分享描述
          
              imgUrl: document.getElementById('img').getAttribute('src'), // 分享图标
              //type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // 用户确认分享后执行的回调函数
              
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            })

            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: document.getElementById('title').innerText, // 分享标题
              link:  this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: document.getElementById('img').getAttribute('src'), // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            })
            //分享到QQ
            wx.onMenuShareQQ({
              title: document.getElementById('title').innerText, // 分享标题
              desc: document.getElementById('desc').innerText, // 分享描述
              link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: document.getElementById('img').getAttribute('src'), // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            })
            //分享到微博
            wx.onMenuShareWeibo({
              title: document.getElementById('title').innerText, // 分享标题
              desc: document.getElementById('desc').innerText, // 分享描述
              link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: document.getElementById('img').getAttribute('src'), // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            })
            //分享到QQ空间
            wx.onMenuShareQZone({
              title: document.getElementById('title').innerText, // 分享标题
              desc: document.getElementById('desc').innerText, // 分享描述
              link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: document.getElementById('img').getAttribute('src'), // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            })
          })
            
             
        }).catch(err=>console.log(err))
      
      },
      getDetailsData(){
      
        this.$http.post('Goods/goodsInfo',qs.stringify({'goodsId':this.$route.params.goodsId})).then((response)=>{
          var res = response.data;
          if(res.flag == 'success'){
            this.dataList = res.data;

            this.phone = this.dataList.relationType;
            //this.phone = 'tel://'+this.dataList.relationType.substring(0,11);
            //console.log( this.dataList)
          }
        }).catch(function (error) {
          alert(error);
        });
          
      },
//      getRecommendData:function(){
//        var _this = this,
//          url = location.href,
//          arr = url.split('?')[1],
//          id = arr.split('=')[1];
//        axios.get(DD_api.recommendGoods ,{params:{'goodsId':id,'num':4}}).then(function(response){
//          var res = response.data;
//          if(res.flag == 'success'){
//            _this. recommendData = res.data;
//          }
//        }).catch(function (error) {
//          alert(error);
//        });
//      },
      //商品收藏
      clickCollect() {
       
        if(this.getCookie('userToken')){
         // this.active = !this.active;
          var token = this.getCookie('userToken');
          this.$http.post('/Goods/memberGoodsCollect',qs.stringify({userToken:token,goodsId:this.$route.params.goodsId})).then(response=>{

            let res =response.data;
            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            })

          }).catch(err=>console.log(err))
        }else{
          this.$router.push({
            name: 'login'
          })
        }
      },
      goHome(){
        window.location = 'http://www.ey99.com/ddykMobile/';
      }
    
    }
  }

</script>


<style lang="less" scoped>
  @import "../../style/common.less";
  .goods-details{
    padding-top: 40px;

  .detail-image{
    width: 640/@rem;
    background: #fff;
  img{
    width: 640/@rem;
    height: 400/@rem;
  }
  }
  .detail-message {
    padding: 20 / @rem;

  .title {
    width: 600 / @rem;
    font-size: 28 / @rem;
    color: #000;
  }

  .approve {
    margin-top: 15 / @rem;
    width: 600 / @rem;
    color: @mainColor;
    font-size: 24 / @rem;
  }

  .company, .norms, .effect, .require {
    margin-top: 10 / @rem;
    width: 600 / @rem;
    color: #555555;
    overflow: hidden;

  .name {
    width: 125 / @rem;
    font-size: 24 / @rem;
    float: left;
  }

  .message, .desc {
    width: 475 / @rem;
    font-size: 24 / @rem;
    float: left;
  }

  }

  }

  .goods-recommend{
    padding-top: 15/@rem;
    width: 100%;
    background: #e5e5e5;
  .new-logo-box{
    background: #ffffff;
    width: 100%;
  .logo{
    width: 99/@rem;
    height: 30/@rem;
    padding: 20/@rem 0 0 20/@rem;
  img{
    width: 100%;
    height: 100%;
  }
  }
  }
  ul{
    padding: 22/@rem;
    background: #ffffff;

  .recommend-list{
    float: left;
    margin: 0 20/@rem 20/@rem 0;
  .box{
    display: block;
  .img{
    display:block;
    width: 278/@rem;
    height: 210/@rem;
  img{
    width: 100%;
    height: 100%;
  }
  }
  .text{
    display:block;
    text-align: center;
    font-size: 20/@rem;
    color: #000;
    font-weight: 700;
    padding: 15/@rem 0;
  }
  }
  }
  .recommend-list:nth-of-type(even){
    margin-right: 0;
  }
  }
  }
    .concat-phone{
      border-top: 1/@rem solid #ccc;
      height: 88/@rem;
      font-size: 26/@rem;
      color: #555555;
      text-align: center;
      .phone{
        margin-top: 20/@rem;
        display: inline-block;
        color: @mainColor;
        font-size: 26/@rem;
        vertical-align: bottom;
        .tel{
          display: inline-block;
          font-size: 42/@rem;
          color: @mainColor;
          vertical-align: middle;
          padding-right: 10/@rem;
        }
      }
    }
  }
  .mint-header{
    background: @mainColor;
    .collect-icon{
      font-size: 18px;
    }
    .collect-icon1{
      font-size: 18px;
     
    }
    .collect-icon.active{
      color: #ffff00;
    }
  }
</style>
