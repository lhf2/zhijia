/**
 * Created by 汁家 on 2017/6/10.
 */


// number 为可改变的积分值 0-----3000积分


//  html**********---->
// <span class="num" data-num="2000" data-min="0" data-max="4000"></span>/<span  class='max'>3000</span>

$(function () {
    var number = $(".num").data('num'); // 1500积分
    var min = $(".num").data('min');
    var max = $(".num").data('max');
    var length = (number-min) / (max-min) * 100;
    var lengthBall = 4.2 * length / 100;
    // 任何需要执行的js特效
    $(".load").css("width", length + "%");
    $(".loadBall").css("margin-left", lengthBall + "rem");
    $(".num").html(number);
    $(".max").html(max);
})
