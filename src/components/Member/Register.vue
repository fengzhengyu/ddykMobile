<template>
  <div>

    <section class="member-main">
      <div class="main-wrapper">
        <p class="text"><i class="iconfont icon-shouji icon1"></i>
          <input type="text" id="phone" placeholder="手机号" maxlength="11" v-model="phone" />
          <span><i class="iconfont"></i></span>
        </p>
        <p  class="text"><i class="iconfont icon-yanzhengma icon2"></i>
          <input type="text" id="authCode" placeholder="验证码" maxlength="6" v-model="authCode">
          <span v-if="!sendAuthCode" class="auth-btn" @click="getAuthCode">获取验证码</span>
          <span v-if="sendAuthCode" class="auth-btn active">{{time+ '秒后获取'}}</span>
        </p>
        <p  class="text"><i class="iconfont icon-mima icon3"></i><input type="password"  id="password" placeholder="密码" maxlength="20" v-model="password"/></p>
        <p  class="text">
          <a href="javascript:;" class="finish" @click="sendFinish ">完成</a>
          <br/>
          <router-link :to="{name:'login'}" class="login">已有账号登录</router-link>
        </p>
      </div>
    </section>
    <section class="member-mask" v-show="finishState"></section>
    <section class="register-finish" v-show="finishState">
      <div class="close">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div class="content">
        <div class="circle">
          <i class="iconfont icon-chenggong"></i>
        </div>
      </div>
      <div class="text">
        恭喜您，注册成功啦！
      </div>
    </section>
    <mt-header fixed title="会员注册">
      <router-link to="" slot="left">
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
        sendAuthCode:false,
        time: 0,
        disabled:false,
        phone: '',
        authCode: '',
        password: '',
        finishState: false
      }
    },
    methods:{
      getAuthCode(){
        let reg=/^1[34578]{1}\d{9}$/;
        if(this.phone == '') {
          this.$toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if(!reg.test(this.phone)){
          this.$toast({
            message: '手机号格式不正确',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        this.$http.post('http://47.94.249.58/ddyk/index.php/Api/sign/sendMessage',qs.stringify({phone:this.phone})).then(response=>{
          let res = response.data;
          console.log(res)
          if(res.flag == 'success'){
            this.sendAuthCode = true;
            this.time = 60;
            let timer = setInterval(()=>{
              this.time--;
              if(this.time<0){
                this.sendAuthCode = false;
                clearInterval(timer);
              }
            },1000);
          }else{
            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            });
            return
          }

        }).catch(err=>console.log(err));
      },
      sendFinish(){
        //手机号验证
        let reg=/^1[34578]{1}\d{9}$/;
        if(this.phone == '') {
          this.$toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if(!reg.test(this.phone)){
          this.$toast({
            message: '手机号格式不正确',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        //验证码验证
        if(this.authCode == '') {
          this.$toast({
            message: '验证码不能为空',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        //密码验证
        if(this.password == '') {
          this.$toast({
            message: '密码不能为空',
            position: 'middle',
            duration: 2000
          });
          this.isTrue=true;
          return;
        }
        var  pw = /^[a-zA-Z]\w{5,17}$/;
        if(!pw.test(this.password)){
          this.$toast({
            message: '密码长度在6~18之间，只能包含字符、数字和下划线',
            position: 'middle',
            duration: 2000
          });
          return;

        }
        this.$http.post('http://47.94.249.58/ddyk/index.php/Api/sign/sign',qs.stringify({phone:this.phone,password:this.password,authCode:this.authCode})).then(response=>{
          let res = response.data;
          console.log(res)
          if(res.flag == 'success'){

            if(res.code == 1){
              var name = res.data.memberName;
              var phone = res.data.phone;
              var token = res.data.userToken;
              var time = res.data.addTime;
              var photo = res.data.headPhoto;
              var email = res.data.email;
              var goldTotal = res.data.goldTotal;
              this.setCookie('userName',name,1);
              this.setCookie('userPhone',phone,1);
              this.setCookie('userToken',token,1);
              this.setCookie('userPhoto',photo,1);
              this.setCookie('goldTotal',goldTotal,1);
              //this.setCookie('userTime',time,{expires:1,path:'/'});
              // this.setCookie('userEmail',email,{expires:1,path:'/'});
              this.finishState = true;
              setTimeout(()=>{
                this.$router.push({
                  name:'member'
                });
              },2000);
            }
          }else{
            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            });
            return
          }

        }).catch(err=>console.log(err));

      }
    }
  }

</script>


<style lang="less" scoped>
  @import "../../style/common.less";
  .mint-header{
    background: @mainColor;
  }

  .member-main{
    width: 100%;
  padding-top: 40px;
  .main-wrapper{
    margin:0 30/@rem 30/@rem 30/@rem;
  .text.error{
    border: 1/@rem solid red;
  }
  .text{
    margin-top: 5/@rem;
    padding: 20/@rem 0;
    border: 1/@rem solid #fff;
    border-bottom: 1/@rem solid #ccc;
    font-size: 24/@rem;
  i{
    vertical-align: middle;
    font-size: 40/@rem;
    color: @mainColor;
  }

  i.icon2{
    font-size: 42/@rem;
  }
  i.icon3{
    font-size: 34/@rem;
    padding-left: 7/@rem;
  }
  input{
    font-size: 22/@rem;
    border: none;
    outline: none;
    vertical-align: middle;

  }
  #phone{
    margin: 10/@rem;
    width: 450/@rem;

  }
  #authCode{
    margin: 10/@rem;
    width: 320/@rem;


  }
  .auth-btn{
    float: right;
    width: 165/@rem;
    height: 50/@rem;
    line-height: 50/@rem;
    font-size: 22/@rem;
    background: @mainColor;
    color: #fff;
    border-radius: 30/@rem;
    margin-left: 20/@rem;
    cursor: pointer;
    text-align: center;


  }
  .auth-btn.active{
    background: #cccccc;
    color: #fff;
  }
  #password{
    margin: 10/@rem 20/@rem;
    width: 450/@rem;
  }
  a{
    display: inline-block;
    width: 380/@rem;
    height:70/@rem;
    font-size: 22/@rem;
    line-height: 70/@rem;
    border-radius: 40/@rem;
    text-align: center;
  }
  .finish{
    background: @mainColor;
    color: #fff;
  }
  .login{
    margin-top: 20/@rem;
    color: @mainColor;
    background: #fff;
    box-sizing: border-box;
    border: 2/@rem solid @mainColor;
  }
  }
  .text:last-child{
    border:none;
    text-align: center;
  }
  .forget{
    padding: 30/@rem 10/@rem 30/@rem 30/@rem;
    text-align: right;
  a{
    font-size: 20/@rem;
    color: @mainColor;
    text-decoration: underline;
  }
  }

  }
  }
  .member-mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);

  }
  .register-finish{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 560/@rem;
    height: 400/@rem;
    margin-left: -280/@rem;
    margin-top: -200/@rem;
    background: #fff;
    border-radius: 40/@rem;
  .close{
    width: 100%;
    position: relative;
    height: 40/@rem;
  i{
    font-size: 40/@rem;
    position: absolute;
    top: -10/@rem;
    right: -10/@rem;
    color: #000;
    cursor: pointer;
  }
  }
  .content{
    width: 100%;
    text-align: center;
  .circle{
    display: inline-block;
    margin: 50/@rem 0;
    width: 185/@rem;
    height: 185/@rem;
    border-radius: 50%;
    background: @mainColor;
    text-align: center;
    line-height: 185/@rem;
  i{
    font-size: 90/@rem;
    color: #fff;
  }
  }
  }
  .text{
    text-align: center;
    font-size: 34/@rem;
    color: #000;
  }
  }
</style>
