/**
 * Created by Administrator on 2018/3/13.
 */


//获取cookie、
export function getCookie(name) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  console.info(cname + "=" + cvalue + "; " + expires);
  document.cookie = cname + "=" + cvalue + "; " + expires;
  console.info(document.cookie);
};

//删除cookie
export function delCookie () {
  this.setCookie("", "", -1);
};
