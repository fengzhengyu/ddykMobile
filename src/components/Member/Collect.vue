<template>
  <div class="collect">
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
    <ul class="load-more-wrapper">
      <li class="item-list " :class="{'active': isShow}" v-for="(item,index) in dataList" :key="index">
        <div class="checkbox " :class="{'active':item.checked}" v-show="isShow" @click="selectedProduct(item)">
           <i class="iconfont icon-circle"></i>
        </div>
        <router-link class="goDetail" :to="{name:'goods.details',params:{goodsId:item.goodsId} }" >
          <div class="item-img">
            <img :src="item.photoUnify" v-bind:alt="item.goodsName">
          </div>
          <div class="load-content">
            <h2 class="title">
              <p class="text">{{item.goodsName}}</p>
              <!--<span class="time">{{item.passTime | getData}}</span>-->
            </h2>
            <p class="word-text">
              <span class="name">厂家：</span>
              <span class="message  wordbreak">{{item.productCompany}}</span>
            </p>
            <p class="word-text">
              <span class="name ">主治：</span>
              <span class="description">详见说明</span>
              <!-- {{item.effect}} -->
            </p>
            <p class="word-text contact">

              <a :href="item.phone | formatPhone" class="tel"> <i class="iconfont icon-zuoji"></i>我要洽谈</a>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    </mt-loadmore>
    <div v-if="dataList.length <=0" class="no-data">
      您还没有收藏产品！
    </div>
    <div class="delete-wrapper" v-show="isShow">
        <div class="selectAll" :class="{'active':checkAllFlag}" @click="checkAllFlag ? checkAll(false):checkAll(true)">
          全选
          <i class="iconfont icon-circle" ></i>
        </div>
        <div class="delete" @click="delConfirm">
          删除
        </div>
    </div>
    <mt-header fixed title="我的收藏">
      <router-link to="" slot="left" >
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
      <mt-button icon="" slot="right" @click="edit">编辑</mt-button>
    </mt-header>
  </div>
</template>
<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui';
  import qs from 'qs';
  export default {

    data() {
      return {
        dataList: [],
        token:'',
        isAutoFill:false,//是否自动检测，并调用loadBottom
        allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
        page:1, //页码
        checkAllFlag: false,  //全选状态
        selectArr: [], //删除的元素
        isShow: false  //编辑状态
      }
    },
    mounted(){
      this.$nextTick(function(){
        this.getDataList();

      });
      //取会员信息
      if(this.getCookie('userPhoto')&&this.getCookie('userToken')){
        this.token = this.getCookie('userToken');
      }else{

        this.$router.push({
          name: 'login'
        })
      }


    },
    methods:{

      //上拉刷新
      loadBottom(){
        this.$http.post('Api/collect',qs.stringify({userToken:this.token,page:this.page})).then((response) => {
            let res = response.data;
            if( res.flag == 'success'){
              //追加下一页的数据
              this.dataList = this.dataList.concat(res.data);
              this.page ++;
             // console.log(this.dataList)
              //从loading状态通知回到pull初始状态
              if( this.dataList.length<=9){
                this.allLoaded = true;
                return;
              }
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
      //取数据
      getDataList() {
        this.$http.post('Api/collect',qs.stringify({userToken:this.token})).then((response) => {
          let res = response.data;
          if (res.flag == 'success') {
            this.dataList = res.data;
            this.page++;
          }else{
            this.dataList = [];
          }
        }).catch(error => {
          console.log(error);
        })
      },
      //编辑
      edit(){
        this.isShow = !this.isShow;
      },
      //单选
      selectedProduct(item){
        //判断是否有这个状态
        if(typeof item.checked == 'undefined') {

          //局部设置属性
          this.$set(item,'checked',true);
        }else {
          item.checked = !item.checked;
        }
       
        this.checkAllFlag = true;
        this.dataList.forEach((item,index)=>{
          if(!item.checked){
            this.checkAllFlag = false;
          }
        })
      },
      //全选
      checkAll(flag){
        this.checkAllFlag = flag;
        this.dataList.forEach((item,index)=>{
          if(typeof item.checked == 'undefined'){
            this.$set(item,'checked',this.checkAllFlag);
          }else{
            item.checked = this.checkAllFlag
          }
        })
      },
      //删除
      delConfirm(){
        if(this.dataList.length<=0){
          this.checkAllFlag = false;
          this.$toast({
            message: '您还没有收藏商品！',
            position: 'middle',
            duration: 2000
          });
        }else {
          //判断是否选中
          this.dataList.forEach((item, index)=> {
            if (typeof item.checked == 'undefined') {
              this.$toast({
                message: '请选择收藏商品！',
                position: 'middle',
                duration: 2000
              });
            } else {
              MessageBox.confirm('确定执行此操作?').then(action => {
                let arr =[];   //存放删除id,传给后台
                this.dataList.forEach((item,index)=>{
                  if(item.checked){
                    arr.push(item.collectId)
                  }
                  return arr;
                });
                let id= arr.join(','); //数组拼接字符串
                this.$http.post('Api/collectDelete',qs.stringify({userToken:this.token,collectId:id})).then((response) => {
                  let res = response.data;
                  if (res.flag == 'success') {
                    this.dataList.forEach((item,index)=>{
                      if(item.checked){
                        this.selectArr.push(index);   //存放删除数据的下标
                      }
                    });
                    let arr1= [];
                    this.dataList.forEach((item,index)=>{
                      if(this.selectArr.indexOf(index)==-1){   //没选中的数据放入新数组
                        arr1.push(item);
                      }else{

                      }
                    });
                    this.dataList =arr1;  //新数组再付给原数据
                    this.selectArr = [];
                    this.checkAllFlag =false;
                    this.$toast({
                      message: res.info,
                      position: 'middle',
                      duration: 2000
                    });
                    //若本页数据删除调取下一页数据
                    this.getDataList();
                  }
                }).catch(error => {
                  console.log(error);
                })
              }).catch(err=>{});
            }
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
  }
  .collect {
    width: 640/@rem;
    padding-top: 40px;
  


  .load-more-wrapper {
    width: 100%;
   
  }

  .item-list {
    height: 150 / @rem;
    border-bottom:1px solid #bfbfbf;
    padding: 30 / @rem 20 / @rem;
    overflow: hidden;

  .goDetail {
    display: block;
    width: 600 / @rem;
    height: 150 / @rem;

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
    width: 380 / @rem;
    height: 150 / @rem;

    .title {
      width: 100%;
      height: 30 / @rem;
      line-height: 30 / @rem;

      .text {
        width: 70%;
        font-size: 26 / @rem;
        float: left;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

    }
  .word-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #a0a0a0;
    font-size: 22 / @rem;
    height: 30 / @rem;
    line-height: 30 / @rem;
  }

  .word-text.contact {
    text-align: right;

  .tel {
    color: @mainColor;
    vertical-align: top;

  i {
    font-weight: 700;
    font-size: 32 / @rem;
  }
  }
  }
  }
  }
  }
  .item-list.active {
    overflow: hidden;
    width: 600 / @rem;

  .checkbox {
    width: 60/@rem;
    height: 150/@rem;
    line-height: 150/@rem;
    text-align: left;
    float: left;


    i{
    font-size: 32/@rem;

      border-radius: 50%;

      background: transparent;
      color: #555;
    }
  }
  .checkbox.active{
  i{
        background: #ff6000;
        color: #ff6000;
      }

  }

  .goDetail {
    width: 540 / @rem;
    float: left;

  .item-img {
    float: left;
    width: 160 @rem;
    height: 150 / @rem;
    padding-right: 20 / @rem;

    img {
      width: 160 @rem;
      height: 150 / @rem;
    }

  }
  .load-content {
    float: left;
    width: 320 / @rem;
    height: 150 / @rem;
  }
  }
  }

  .no-data {
  height: 190 / @rem;
  text-align: center;
  color: #555555;
  font-size: 28 @rem;
  line-height: 190 / @rem;
  }
  .delete-wrapper{
    width: 640/@rem;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 55px;
    background: #f3f5f7;
    .selectAll{
      width: 100px;
      height: 100%;
      text-align: center;
      line-height: 55px;
      color: #555;
     font-size: 18px;

    i{
      font-size: 18px;

      border-radius: 50%;

      background: transparent;
      color: #555;
      vertical-align: top;

    }
  }
  .selectAll.active{
    i{
      background: #ff6000;
      color: #ff6000;
    }

  }
  .delete{
    position: absolute;
    right: 10px;
    top: 5px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding:  5px 10px;
    background: #ff6000;
    font-size: 18px;
    color: #fff;
  }
  }
  }


</style>
