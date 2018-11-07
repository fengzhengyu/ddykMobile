<template>
  <div class="member-login">
    <section class="member-main">
      <div class="main-wrapper">
        <p class="text"><i class="iconfont icon-shouji icon1"></i>
          <input type="text" id="phone" placeholder="手机号" maxlength="11" v-model="phone" @blur="phoneTest"/>
        </p>
        <p  class="text"><i class="iconfont icon-mima icon3"></i><input type="password" id="password" placeholder="密码" maxlength="20" v-model="password" @blur="passwordTest"/></p>
        <p class="forget">
          <router-link :to="{name:'forget'}" class="finish">忘记密码</router-link>
        </p>
        <p  class="text">
          <span class="finish" @click="goLogin">登录</span>

          <br/>
          <router-link :to="{name:'register'}" class="login">注册新账号</router-link>
        </p>
      </div>
    </section>
    <mt-header fixed title="会员登录">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="goBack">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export  default {
    data(){
      return {
        phone: '',
        password: ''
      }
    },
    methods: {
      //手机号验证
      phoneTest(){
        //手机号验证
        //let reg=/^1[34578]{1}\d{9}$/;
        if(this.phone == '') {
          this.$toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 2000
          });
          return;
        }

      },
      passwordTest(){

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
//        if(this.password.length>20 || this.password.length<6){
//          this.$toast({
//            message: '密码长度在6~18之间',
//            position: 'middle',
//            duration: 2000
//          });
//          return;
//        }
        //var  pw = /^[a-zA-Z]\w{5,17}$/;
//        if(!pw.test(this.password)){
//          this.$toast({
//            message: '密码长度在6~18之间，只能包含字符、数字和下划线',
//            position: 'middle',
//            duration: 2000
//          });
//          return;
//        }
      },
      goLogin(){
        this.$http.post('http://47.94.249.58/ddyk/index.php/Api/sign/sign',qs.stringify({phone:this.phone,password:this.password})).then(response=>{
          let res = response.data;
        //  console.log(res)
          if(res.flag == 'success'){
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
            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            });
            setTimeout(()=>{
              this.$router.push({
                name:'member'
              });
            },2000);
          }else{
            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            });
          }

        }).catch(err=>console.log(err));

      },
      goBack(){
        this.$router.go(-1);
      },
    },

  }

</script>

<style lang="less" scoped>
  @import "../style/common.less";
  
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
  a,span.finish{
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


</style>
