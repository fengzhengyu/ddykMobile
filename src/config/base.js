/**
 * Created by Administrator on 2018/2/24.
 */

(function(win, doc) {
  function change() {
    document.documentElement.style.fontSize = 10*document.documentElement.clientWidth / 64 + 'px';
  }
  doc.addEventListener('DOMContentLoaded', change, false);
  win.addEventListener('resize', change, false);
})(window, document);




