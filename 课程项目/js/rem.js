(function (doc, win) {
  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
    var bodyDiv = document.getElementsByTagName('body')[0];
    bodyDiv.style.visibility='visible';
  };
 
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//获取参数
function getQueryString (name) {
  // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
  if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
    return '';
  }
  // 获取链接中参数部分
  var queryString = location.href.substring(location.href.indexOf("?") + 1);
  queryString = decodeURI(queryString);
  var parameters = queryString.split("&");
  var pos, paraName, paraValue;
  for (var i = 0; i < parameters.length; i++) {
    // 获取等号位置
    pos = parameters[i].indexOf('=');
    if (pos == -1) { continue; }

    // 获取name 和 value
    paraName = parameters[i].substring(0, pos);
    paraValue = parameters[i].substring(pos + 1);

    // 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格
    if (paraName == name) {
      return unescape(paraValue.replace(/\+/g, " "));
    }
  }
  return '';
}