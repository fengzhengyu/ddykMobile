import Vue from 'vue'
import Router from 'vue-router'
// 路由相关组件 开始

import Home from '@/page/Index';   //主页
import Search from '@/page/Search' //搜索
import Video from '@/page/Video';  //视频
import VideoDetails from '@/components/Video/VideoDetails'; //视频详情
import Member from '@/page/Member';  //我的
import Login from '@/page/Login';   //登录
import Register from '@/components/Member/Register';//我的注册
import Forget from '@/components/Member/Forget';  //忘记密码
import Setting from '@/components/Member/Setting'; //设置
import Shop from '@/components/Member/Shop';  //我的商铺
import Integral from '@/components/Member/Integral';//我的积分
import Collect from '@/components/Member/Collect';//我的收藏
import Goods from '@/page/Goods';  //招商
import GoodsDetails from '@/components/Goods/GoodsDetails'; //招商详情
import Marketing from '@/page/Marketing'; //营销
import MarketDetails from '@/components/Marketing/MarketDetails';  //营销详情
import Purchase from '@/page/Purchase';  //采购
import PurchaseDetails from '@/components/Purchase/PurchaseDetails'; //采购详情
import Information from '@/page/Information';  //资讯
import InformationDetails from '@/components/Information/InformationDetails';//资讯详情
import Health from '@/page/Health';  //健康
import HealthDetails from '@/components/Health/HealthDetails';//健康详情

import NotFound from '@/components/NotFound/NotFound';//健康详情

// 路由相关组件 结束
Vue.use(Router)

const router = new Router({
 // mode: 'history',
  routes: [
    {
      path: '/',  // 默认进入路由
      redirect: 'index'   //重定向
    },
    //主页 推荐
    {
      name: 'index',
      path: '/index',
      component: Home
    },
    //搜索
    {
      name: 'search',
      path: '/search',
      component: Search
    },
    //视频
    {
      name: 'video',
      path: '/video',
      component: Video
    },
    //视频详情页
    {
      name: 'video.details',
      path: '/video/details/:videoId',
      component: VideoDetails
    },
    //我
    {
      name: 'member',
      path: '/member',
      component: Member,
      children:[

      ]
    },
    //登录
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    //注册
    {
      name: 'register',
      path: '/member/register',
      component: Register
    },
    //忘记
    {
      name: 'forget',
      path: '/member/forget',
      component: Forget
    },
    //设置
    {
      name: 'setting',
      path: '/member/setting',
      component: Setting,
      meta:{check:true}
    },
    //商铺
    {
      name: 'shop',
      path: '/member/shop',
      component: Shop
    },
    //商积分
    {
      name: 'integral',
      path: '/member/integral',
      component: Integral
    },
    //收藏
    {
      name: 'collect',
      path: '/member/collect',
      component: Collect
    },
    //招商
    {
      name: 'goods',
      path: '/goods',
      component: Goods,
    },
    //招商详情
    {
      name: 'goods.details',
      path: '/goods/details/:goodsId',
      component: GoodsDetails
    },
    //营销
    {
      name: 'market',
      path: '/market',
      component: Marketing
    },
    //营销详情
    {
      name: 'market.details',
      path: '/market/details/:marketId',
      component: MarketDetails
    },
    //采购
    {
      name: 'purchase',
      path: '/purchase',
      component: Purchase
    },
    //采购详情
    {
      name: 'purchase.details',
      path: '/purchase/details/:purchaseId',
      component: PurchaseDetails
    },
    //资讯
    {
      name: 'information',
      path: '/information',
      component: Information
    },
    //资讯详情
    {
      name: 'information.details',
      path: '/information/details/:informationId',
      component: InformationDetails
    },
    //健康
    {
      name: 'health',
      path: '/health',
      component: Health
    },
    //健康详情
    {
      name: 'health.details',
      path: '/health/details/:healthId',
      component: HealthDetails
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

export default router;
