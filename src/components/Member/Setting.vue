<template>
  <div class="setting">
    <div class="wrapper setting-wrapper" @click="goPhoto">
      <div class="info item">头像</div>
      <div class="img item"><img :src="photoImg" alt="头像"></div>
    </div>
    <div class="wrapper name-wrapper" @click="changeName">
      <div class="info item">昵称</div>
      <div class="icon item"><i class="iconfont icon-qianjin"></i></div>
      <div class="name item">{{userName}}</div>
    </div>
    <div class="exit">
      <span class="exit-btn" @click="exit">退出登录</span>
    </div>
    <section class="member-mask" v-show="finishState"></section>
    <section class="register-finish" v-show="finishState">
      <div class="close" @click="goClose">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div class="content">
        <div class="circle">
          <span class="word">新昵称：</span>
          <input type="text" class="text-word" maxlength="16" v-model="newName">
        </div>
      </div>
      <div class="text">
            <span class="btn-text" @click="goFinish">确认修改</span>
      </div>
    </section>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" position="bottom">
      <form id="form"   method="post" name="file_upload" enctype="multipart/form-data" >
           <div class="update-photo">
             <input class="file_input" type="file" multiple  accept="image/gif,image/jpeg,image/png,image/jpg"  @change="changePhoto"/>
             <div class="upload_box">
               修改头像 &nbsp;&nbsp;<span class="info">(注：图片小于100KB)</span>
             </div>
             <!--<span class="upload_box" id="uploadPhotoBtn">确定</span>-->
           </div>

      </form>
    </mt-popup>
    <mt-header fixed title="账号设置">
      <router-link to="" slot="left" >
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="left"></mt-button>-->
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">

  import { MessageBox } from 'mint-ui';
  import qs from 'qs';
  export default {
    data(){
      return {
        token: '',    //用户唯一标示
        photoImg: '',     //头像
        userName: '',     //昵称
        newName: '',
        finishState: false,
        popupVisible: false ,  //上传头像状态
      }
    },
    mounted(){
      //取会员信息
      if(this.getCookie('userPhoto')&&this.getCookie('userToken')){
        this.token = this.getCookie('userToken');
        this.photoImg = this.getCookie('userPhoto');
        this.userName = this.getCookie('userName');
     }else{

        this.$router.push({
          name: 'login'
        })
      }
    },
    methods: {

      //退出登录
      exit(){
        //清空cookie
        this.setCookie('userName','',-1);
        this.setCookie('userPhone','',-1);
        this.setCookie('userToken','',-1);
        this.setCookie('userPhoto','',-1);
        this.setCookie('goldTotal','',-1);
        this.$router.push({
          name: 'member'
        })
      },
      //昵称popup
      changeName(){
        this.finishState = true;
      },
      //关闭昵称popup
      goClose(){
        this.finishState = false;
      },
      //昵称修改成功
      goFinish(){
        this.$http.post('Member/updateMemberName',qs.stringify({userToken:this.token,memberName:this.newName })).then(response=>{
            let res =response.data;
          //console.log(res)
          if(res.flag == "success"){
           // console.log(this.newName)
            this.userName = this.newName;
            this.setCookie('userName',this.newName,1);

            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            });
            setTimeout(()=>{
              this.finishState = false;
            },2000)
          }else{
            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            });
          }
        }).catch(err=>console.log(err));
        //
      },
      //点击头像弹窗
      goPhoto(){
        this.popupVisible =true;
      },
      //头像改变
      changePhoto(e){
        let img1=e.target.files[0];
        let form = new FormData();
        form.append('headPhoto',img1,img1.name);
        form.append('userToken',this.token);
        this.$http.post('Member/updateHeadPhoto',form,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response => {
          let res = response.data;
          //console.log(res)
          if(res.flag == 'success'){
            let photo = res.returnData;
            this.setCookie('userPhoto',photo,1);
            this.photoImg = this.getCookie('userPhoto');
            this.$toast({
              message: '修改成功',
              position: 'middle',
              duration: 2000
            });
            this.popupVisible =false;

          }else{
            this.$toast({
              message: res.info,
              position: 'middle',
              duration: 2000
            });
          }

        }).catch(err =>console.log(err));
      }
    }
  }

</script>

<style lang="less" scoped>
  @import "../../style/common.less";
  .mint-header{
    background: @mainColor;
  }
.setting{

  .wrapper{
    padding-top: 40px;
    border-bottom: 1px solid #ccc;
    line-height: 140/@rem;
    height:140/@rem;

    .item{
      display: inline-block;
      font-size: 28/@rem;
      color: #555555;
      font-weight: 700;

    }
    .info{
      padding-left: 20/@rem;
    }
    .img{
      margin: 20/@rem;
      float: right;
      width: 100/@rem;
      height: 100/@rem;
      overflow: hidden;
      border-radius: 50%;

      img{
        width: 100/@rem;
        height: 100/@rem;
      }
    }
    .name{
      float: right;
      padding-right: 20/@rem;
    }
    .icon{
      height: 80/@rem;
      float: right;
      padding-right: 10/@rem;
      i{
        font-size: 24/@rem;
      }
    }
  }
  .name-wrapper{
    padding-top: 0;
    line-height: 100/@rem;
    height:100/@rem;
  }
  .exit{

    text-align: center;
    height: 80/@rem;

    .exit-btn{
      vertical-align: middle;
      display: inline-block;
      width: 120@rem;
      height: 40/@rem;
      font-size: 28/@rem;
      line-height: 40/@rem;
      padding: 40/@rem;
      color: @mainColor;
      cursor: pointer;
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
    margin: 80/@rem 0;
    padding: 20/@rem;
    overflow: hidden;
    border-radius: 10/@rem;
    border: 1/@rem solid #ccc;
    .word{
      text-align: left;
      float: left;
      font-size: 28/@rem;
      width: 120/@rem;
    }
    input.text-word{
      float: left;
       width: 350/@rem;
      height: 40/@rem;
      line-height: 40/@rem;
      font-size: 28/@rem;
      text-align: left;
      border: 0;
      outline: none;
    }
  }
  }
  .text{
    height: auto;
    text-align: center;
    margin-top: 30/@rem;

    .btn-text{
      padding: 10/@rem 30/@rem;
      font-size: 28/@rem;
      background: @mainColor;
      border-radius: 30/@rem;
      color: #fff;
    }
  }
  }
}
  .update-photo{
    width: 640/@rem;
    background: #fff;
    height: 60px;
    position: relative;
    input{
      opacity: 0;
      position: absolute;
      top: 0;
      left: 10px;
      width: 500/@rem;
      height: 60px;
      border: 0;
      outline: none;
    }
    .upload_box{
      text-align: center;
      line-height: 60px;
      color: #555555;
      font-weight: bold;
      font-size: 28/@rem;
      .info{
        font-size: 20/@rem;
        color: red;
      }
    }

  }

</style>
