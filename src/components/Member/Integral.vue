<template>
  <div class="setting">
    <div class="setting-wrapper">
      <div class="info item">当前积分为：</div>
      <div class="img item">{{goldTotal}}</div>
      <div class="item">积分</div>
    </div>
    <div class="name-wrapper">
      <div class="info item">请选择充值金额：</div>
      <div class="name item">充值数量100元=500积分</div>
    </div>
    <div class="integral-wrapper">
      <div class="list" :class="{'active':changeActive == index}" v-for="(item,index) in moneyList" @click="activeClass(item,index)" :key="index">
        <span class="money">{{item.money |  addUnits}}</span>
        <br>
        <span class="count">{{item.count}}</span>
      </div>

    </div>
    <div class="exit" @click="weChat">
      <span class="exit-btn" >微信支付</span>
    </div>

    <mt-header fixed title="积分商城">
      <router-link :to="{name:'member'}" slot="left" >
        <mt-button icon="back" >返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">


  import qs from 'qs';
  export default {
    filters:{
      addUnits(val){
        return val + '元';
      }
    },
    data(){
      return {

        moneyList:[
          {
            money: '100',
            count: '500积分'
          },
          {
            money: '200',
            count: '1000+50积分'
          },
          {
            money: '500',
            count: '2500+250积分'
          },
          {
            money: '1000',
            count: '5000+1000积分'
          },
          {
            money: '2000',
            count: '10000+3000积分'
          },
          {
            money: '5000',
            count: '25000+10000积分'
          }
        ],  //充值数据列表
        token: '',   //用户标识
        goldTotal: '',  //积分数
        moneyCount: 100,  //充值钱数
        changeActive: 0 , //默认选中状态
        orderId: '',  //订单号

      }
    },
    mounted(){
      
        //取会员信息
        if(this.getCookie('userPhoto')&&this.getCookie('userToken')){
          this.token = this.getCookie('userToken');
          this.photoImg = this.getCookie('userPhoto');
          this.userName = this.getCookie('userName');
          this.goldTotal = this.getCookie('goldTotal');
        }else{

          this.$router.push({
            name: 'login'
          })
        }
     
     
    },
    watch:{
      orderId (val){
        if(val != ''){
          //去支付页面
          window.location = 'http://www.ey99.com/ddyk/Api/Weixinpay/weChatPayApp/out_trade_no/'+this.orderId
       }
      }

    },
    methods: {
      //选择充值金额
      activeClass(item,index){
          this.changeActive = index;
          this.moneyCount = item.money;

      },
      //微信支付
      weChat(){
        let money = parseInt(this.moneyCount);
        this.$http.post('Weixinpay/wexinpayAppJs',qs.stringify({userToken:this.token,money:money,payType:2})).then(response=>{
          let res = response.data;

          if(res.flag == 'success'){
          //获取订单号
            this.orderId = res.data;
          }else{
            alert(res.info)
          }
        }).catch(err=>{console.log(err)
          console.log(err);
        })

      },
    }
  }

</script>

<style lang="less" scoped>
  @import "../../style/common.less";
  .mint-header{
    background: @mainColor;
  }
  .setting{
    width: 640/@rem;
   
  .setting-wrapper{
    padding-top: 40px;
    border-bottom: 1px solid #ccc;
    line-height: 100/@rem;
    height:100/@rem;

  .item{
    display: inline-block;
    font-size: 28/@rem;
    color: #555555;

  }
  .info{
    padding-left: 10px;
  }
  }
  .name-wrapper{
    line-height: 80/@rem;
    height:80/@rem;

  .item{
    display: inline-block;
    font-size: 28/@rem;
    color: #555555;

  }
  .info{
    padding-left: 10/@rem;
  }
  .name{
    color: #ccc;
    font-size: 24/@rem;
  }


  }
  .integral-wrapper{
    width: 640/@rem;
    overflow: hidden;
    background: #f5f5f5;

    .list{
      width: 280/@rem;
      margin: 20/@rem;
      background: #fff;
      float: left;
      box-sizing: border-box;
      border: 1px solid #fff;
      text-align: center;
      padding: 10/@rem 0;
      border-radius: 10/@rem;
      span{
        display: inline-block;
      }
      .money{
        font-size: 28/@rem;
        color: #606060;
      }
      .count{
        font-size: 18/@rem;
        color: #cdcdcd;
      }
    }
  .list.active{
    border: 1px solid @mainColor;
  }

  }
  .exit{
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    width: 640/@rem;
    height: 80/@rem;
  background: @mainColor;
  .exit-btn{
    vertical-align: middle;
    display: inline-block;
    width: 120@rem;
    height: 40/@rem;
    font-size: 28/@rem;
    line-height: 40/@rem;
    padding: 20/@rem 0;
    color: #fff;
    cursor: pointer;
  }
  }
  }

</style>
