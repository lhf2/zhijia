(function (doc, win) {
  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
  };
 
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(document).ready(function () {
  //防止其他页面报错
  if($('.chose-date').length > 0){
    //获取当前的日期
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    if(month<10){
      month='0'+month
    }
    var day = date.getDate();
    var finalDate = year+'/'+month+'/'+day;
    $('.chose-date').html(finalDate);
    //选择日期
    var laydate;
    var maxDate = year+'-'+month+'-'+day;
    layui.use('laydate', function(){
      laydate = layui.laydate;
      //执行一个laydate实例
      laydate.render({
        elem: '.chose-date', //指定元素
        format:'yyyy/MM/dd',
        max:maxDate,
        showBottom: false
      });
    });
    //把毫秒数转化成想要的日期格式
    var format = function(time, format){
      var t = new Date(time);
      var tf = function(i){return (i < 10 ? '0' : '') + i};
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
          case 'yyyy':
            return tf(t.getFullYear());
            break;
          case 'MM':
            return tf(t.getMonth() + 1);
            break;
          case 'mm':
            return tf(t.getMinutes());
            break;
          case 'dd':
            return tf(t.getDate());
            break;
          case 'HH':
            return tf(t.getHours());
            break;
          case 'ss':
            return tf(t.getSeconds());
            break;
        }
      })
    }
    // 点击左右按钮切换日期
    var todayTime = new Date().getTime();
    $('.date .left-btn').click(function(){
      var nowDate = $('.chose-date').html();
      var nowTime = new Date(nowDate).getTime();
      var preDate = format(nowTime-24*60*60*1000, 'yyyy/MM/dd');
      $('.chose-date').html(preDate);
    })
    $('.date .right-btn').click(function(){
      var nowDate = $('.chose-date').html();
      var nowTime = new Date(nowDate).getTime();
      var nextDate = format(nowTime+24*60*60*1000, 'yyyy/MM/dd');
      if(nowDate == format(todayTime, 'yyyy/MM/dd')){
        // 显示弹窗
        layui.use('layer', function(){
          var layer = layui.layer;
          layer.msg('不能选择今天以后的日期');
        });
        return
      }else{
        $('.chose-date').html(nextDate);
      }
    })
  }
})
//获取参数
function getQueryString (name) {
  // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
  if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
    return '';
  }
  // 获取链接中参数部分
  var queryString = location.href.substring(location.href.indexOf("?") + 1);
  queryString = decodeURI(queryString);

  // 分离参数对 ?key=value&key2=value2
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

