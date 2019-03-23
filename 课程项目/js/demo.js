//分享弹窗显示隐藏
$('.share-btn').click(function(){
    $('.share-alert').show()
})
$('.share-alert').click(function(){
    $('.share-alert').hide()
})
$('.share-alert-inner').click(function(e){
    e.stopPropagation()
})
$('.share-close').click(function(){
    $('.share-alert').hide()
})
//应该显示多少星
$('.score-box').each(function(){
    var len = 5;
    var num = parseInt($(this).children('.score-num').html());
    for(var i=0;i<num;i++){
        $(this).children('ul').children('li').eq(i).html('<img src="img/star.png" alt="">');
    }
    for(var j=0;j<len-num;j++){
        $(this).children('ul').children('li').eq(num+j).html('<img src="img/star1.png" alt="">');
    }
})
