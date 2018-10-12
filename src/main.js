// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

Vue.filter("formatPhone",function(str){
  return 'tel://' + str.substring(0,11);
});

//rem
import  './config/base';


import less from 'less';
//引用公共css
import './style/iconfont.css';
import './style/style.css';

// MintUi 开始
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
/* eslint-disable no-new */

//引 axios
import  Axios from 'axios';
Vue.prototype.$http = Axios;
//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://www.ey99.com/ddyk/Api/';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//引swiper
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';


//引 vue-video
//import VideoPlayer from 'vue-video-player';
////引视频样式
//import 'video.js/dist/video-js.css';
//import 'vue-video-player/src/custom-theme.css';
//Vue.use(VideoPlayer)

//获取cookie、
function getCookie(name) {
  var name = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
//设置cookie,增加到vue实例方便全局调用
function setCookie(cname, value, expiredays) {
  var d = new Date();
  d.setTime(d.getTime() + (expiredays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  //console.info(cname + "=" + value + "; " + expires);
  document.cookie = cname + "=" + value + "; " + expires;
 // console.info(document.cookie);
};
//删除cookie
function delCookie () {
  this.setCookie("", "", -1);
};
Vue.prototype.setCookie = setCookie;
Vue.prototype.getCookie = getCookie;
Vue.prototype.delCookie = delCookie;

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。

  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
  //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
  //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
  //update: function (el) {
  //el.focus()
  //}
});

new Vue({
  el: '#app',
  router,
 // guard,
  components: { App },
  template: '<App/>'
})
