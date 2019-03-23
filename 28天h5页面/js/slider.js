var SliderBox = function (_arg) {
    //默认参数
    var arg = _arg || {};
    this.id = _arg.id || null;//id值
    this.className = _arg.className || 'slider-inner';//class
    this.min = arg.min || 0;//最小值
    this.max = arg.max || 28;//最大值
    this.val = arg.val || 0;//当前值
    this.type = arg.type || 1;//滑块的类型（1:不带区域的 2:带区域的）
    this.bgColor = arg.bgColor || '253,64,122';//主题色（传rgb的前三个值）
    //this.proColor = arg.proColor || '#fd407a';//进度条的颜色
    this.flag = arg.flag || false;//是否可滑动
    this.firstPoint = arg.firstPoint || this.max == 28 ? 8:27;//做区域时候的第一个断点(0-27)
    this.secondPoint = arg.secondPoint || this.max == 28 ? 20:54;//做区域时候的第一个断点(28-54)
    this.onChange = arg.onChange || null;//用来判断是哪个区域的
    this.init();
}
SliderBox.prototype = {
    //初始化
    init:function(){
        this.onChange && this.onChange(this);
        this.create(this);
        this.setPosition(this);
    },
    //创建html结构
    create:function(that){
        var id = this.id;
        var obj = $('#'+id);
        var sliderHtml;
        if(that.type == 1){
            sliderHtml = '<div class="slider-inner"><div class="slider-fre">'+that.val+'</div><div class="slider"><span class="slider-val"></span><span class="slider-min">'+that.min+'</span><span class="slider-max">记录总次数：<i>'+that.max+'</i></span></div></div>'
        }else if(that.type == 2){
            sliderHtml = '<div class="slider-inner"><div class="slider-region"><span class="c">C</span><span class="b">B</span><span class="a">A</span></div><div class="slider-fre">'+that.val+'</div><div class="slider"><span class="slider-val"></span><span class="slider-c"></span><span class="slider-b"></span><span class="slider-min">'+that.min+'</span><span class="slider-max">总次数：<i>'+that.max+'</i></span></div></div>'
        }
        obj.append(sliderHtml);
    },
    //计算位置（进度条、数字标）
    setPosition:function(that){
        var min = that.min,max = that.max,val = that.val;
        var firstPoint = that.firstPoint;
        var secondPoint = that.secondPoint;
        var setLeft = val/(max-min)*100+'%';
        var id = this.id;
        var obj = $('#'+id);
        var sliderInner = obj.find('.slider-inner');
        //数字标
        var sliderFre = sliderInner.find('.slider-fre');
        //进度条
        var sliderPro = sliderInner.find('.slider-val');
        //整个条
        var slider = sliderInner.find('.slider');
        //设置位置以及背景色
        sliderFre.css({
            'left':setLeft,
            'background':'rgba('+that.bgColor+',0.6)'
        });
        sliderPro.css({
            'width':setLeft,
            'background':'rgb('+that.bgColor+')'
        });
        slider.css('background','rgba('+that.bgColor+',0.3)')
        if(this.type == 2){
            var widthC = ((firstPoint-min)/max)*100+'%';
            var widthB = ((secondPoint-firstPoint-1)/max)*100+'%';
            var widthA = ((max-1-secondPoint)/max)*100+'%';
            var pos = (secondPoint/max)*100+'%';
            //获取元素
            var sliderC = obj.find('.c');
            var sliderB = obj.find('.b');
            var sliderA = obj.find('.a');
            var posDiv1 = obj.find('.slider-c');
            var posDiv2 = obj.find('.slider-b');
            //设置区域的宽度以及区域的标识线所在位置
            sliderC.css('width',widthC);
            sliderB.css('width',widthB);
            sliderA.css('width',widthA);
            posDiv1.css({
                'left':widthC,
                'background':'rgb('+that.bgColor+')'
            });
            posDiv2.css({
                'left':pos,
                'background':'rgb('+that.bgColor+')'
            });
        }
    },
    //判断是属于哪个区域的 返回区域的值
    getRegion:function(that){
        var min = that.min,max = that.max,val = that.val;
        var firstPoint = that.firstPoint;
        var secondPoint = that.secondPoint;
        if(val>=min&&val<=firstPoint){
            return 'c'
        }else if(val>=firstPoint&&val<=secondPoint){
            return 'b'
        }else if(val>=secondPoint&&val<=max){
            return 'a'
        }
    }
}