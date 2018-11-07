<template>

  <div class="topNav">
    <div class="nav-wrapper">
      <ul class="nav-ul" >
        <li class="list" :class="{'active':activeIndex == index}" v-for="(item,index) in homeRoutes">
          <router-link :to="item.router" >{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'allSort',
    props: ['activeIndex']

    ,

    data () {
      return {
        //changeIndex: 0,  //选择的路由
        homeRoutes: [
          {
            name: '推荐',
            router: {name:'index'}
          },
          {
            name: '招商' ,
            router: {name:'goods'}
          },
          {
            name: '营销',
            router: {name:'market'}
          },
          {
            name: '采购',
            router: {name:'purchase'}
          },
          {
            name: '资讯',
            router: {name:'information'}
          },
          {
            name: '健康',
            router: {name:'health'}
          },


        ],

        subitemsExpanded: false
      }
    }
  }


</script>

<style lang="less" scoped>
  @import "../style/common.less";
  .topNav{
    font-size: 16px;
    background: #fff;
  .nav-wrapper{
    width: 640/@rem;
    height: 60/@rem;
    line-height: 60/@rem;;
    overflow: hidden;
    position: relative;
    display: flex;
  .nav-ul{
    width: 620/@rem;
    height: 80/@rem;
    overflow-x: auto;
  }
  .list{
    float: left;
    height: 60/@rem;
    line-height: 60/@rem;
  a{
    display: block;
    height: 60/@rem;
    padding: 0 20/@rem;
    font-size: 26/@rem;
    color: #000;
    font-weight: 700;
  }
  }
  }
  }
  .nav-wrapper .list.active a{
    color:@mainColor;
  }

</style>
