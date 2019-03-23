//  .val() //获取value 如果传值就是设置
//  .setVal() //获取value
//  .setMarkColor(_color) // 设置标记颜色
//  .onChange(_callback) // 变化回调

var Ruler = function(_arg) {
	var arg = _arg || {};
	this.id = arg.id || null; // id
	this.num = arg.num || 1; // 初始值
	this.unit = arg.unit || ""; // 默认单位
	this.min = arg.min || 0; //显示的最小刻度
	this.max = arg.max || 250; //显示的最大刻度
	this.minSlide = arg.minSlide || arg.min; //滑动的最小刻度
	this.maxSlide = arg.maxSlide || arg.max; //滑动的最大刻度
	this.rate = arg.rate || 10; // 显示倍率
	this.scaleLen = arg.scaleLen || 9; //小刻度数量
	this.toFixed = arg.toFixed || 0; // 保留多少位小数
	this.scale = arg.scale || 1; //当前刻度
	this.scaleMargin = arg.scaleMargin || 9; // 刻度之间的间距
	this.scaleBigW = arg.scaleBigW || 2; // 大刻度宽度
	this.scaleW = arg.scaleW || 1; // 小刻度宽度
	this.markColor = arg.markColor || "green"; // 标记颜色
	this.onChange = arg.onChange || null;
	this.init();
	this.value = null;
}

Ruler.prototype = {
	init: function() {
		this.create.init(this);
		this.bind.drag(this);
		this.getBChildWidth();
		this.num < this.minSlide ? this.num = this.minSlide : this.num;
		this.num > this.maxSlide ? this.num = this.maxSlide : this.num;
		this.val(this.num);
		this.setMarkColor(this.markColor);
	},
                                              
	val: function(_num) {
		if (_num || _num == 0) {
			var num = (_num || this.num);
			var oDom = $(this.id);
			var oChild = $(this.id).find('.ruler-body .ruler-scale .ruler-child');
			var oMark = oDom.children(".ruler-body").children(".ruler-mark");
			var oValue = oDom.find(".ruler-number .ruler-value");
			var oScale = oDom.children(".ruler-body").children(".ruler-scale");
			var x = oScale.offset().left;
			var that = this;
			oChild.each(function() {
				var text = parseFloat($(this).find(".ruler-text").attr('value'));
				if (num <= text && num + 1 >= text) {

					var left = (oDom.width() - ($(this).offset().left + oMark.offset().left) + oDom.offset().left) + x - oMark.width();

					that.setDetection(left);
					var value = that.value = $(this).find(".ruler-text").attr('value');
					oValue.text(text.toFixed(that.toFixed));
					this.onChange && this.onChange();
					return false;
				}
			});
		} else {
			if(this.value == null){
				this.value = this.num
			}
			return this.value
		}
	},

	setMarkColor: function(_color) {
		var oDom = $(this.id);
		var oMark = oDom.children(".ruler-body").children(".ruler-mark");
		oMark.css("background", _color);
	},

	// 获取大区域里(标记线之前) 有几个刻度点
	getBoxLength: function() {
		var oDom = $(this.id);
		var oChild = $(this.id).find('.ruler-body .ruler-scale .ruler-child');
		var oMark = oDom.children(".ruler-body").children(".ruler-mark");
		var scaleMargin = this.scaleMargin;
		var oMarkLeft = oMark.length != 0 ? oMark.offset().left : 0;


		var len = 0;
		var cW = -scaleMargin;
		getLen();

		function getLen() {
			if (oChild.eq(len).length != 0) {
				if (cW < oMarkLeft) {
					if (oChild.eq(len).width() > 0) {
						cW += oChild.eq(len).width() + scaleMargin;
						len++;
						getLen();
					} else {
						return
					}
				} else {
					return
				}
			}
		}

		return len

	},

	// 获取所有刻度加在一起的宽度
	getBChildWidth: function() {
		var oDom = $(this.id);
		var oChild = $(this.id).find('.ruler-body .ruler-scale .ruler-child');
		var oMark = oDom.children(".ruler-body").children(".ruler-mark");
		var oScale = oDom.find(".ruler-body .ruler-scale");
		var scaleMargin = this.scaleMargin;


		var len = 0;
		var cW = 0;
		getLen();

		function getLen() {
			if (oChild.eq(len).length != 0) {

				if (oChild.eq(len).width() > 0) {
					cW += oChild.eq(len).width() + scaleMargin;
					len++;
					getLen();
				} else {
					return
				}

			} else {
				return
			}
		}

		oScale.width(cW);
		return cW

	},

	bind: {
		// 拖动
		drag: function(that) {
			var _this = this;
			var oDom = $(that.id);
			var oDomW = oDom.width();
			var oScale = oDom.children(".ruler-body").children(".ruler-scale");
			var oBody = oDom.children(".ruler-body").children(".ruler-scale");
			var oMark = oDom.children(".ruler-body").children(".ruler-mark");
			var oValue = oDom.find(".ruler-number .ruler-value");
			var oChild = $(that.id).find('.ruler-body .ruler-scale .ruler-child');
			var getBChildWidth = that.getBChildWidth();
			var box_X = 0;
			var isDown = false;



			oDom.bind("touchstart", function(e) {

				var e = event.touches[0];
				isDown = true;
				box_X = e.pageX - (oScale.offset().left) + ($("html").scrollLeft());
			});

			var childIndex = 0;
			var boxLength = that.getBoxLength();
			var basic = 0;
			if (oChild.eq(boxLength).length != 0) {
				basic = oChild.eq(boxLength).offset().left + oMark.width() + (oMark.offset().left - oChild.eq(boxLength).offset().left); // 基点
			}



			var oChildLen = oChild.length;
			try {
				var leftScroll = oMark.offset().left - oDom.offset().left;
				var rightScroll = getBChildWidth - oMark.offset().left - that.scaleMargin + oDom.offset().left + -oMark.width();
			} catch (e) {
				var leftScroll = 0;
				var rightScroll = 0;
			}



			var minSlide = that.minSlide;
			var maxSlide = that.maxSlide;
			var value = that.val();
			var X = 0;
			oDom.bind("touchmove", function(event) {
				var e = event.originalEvent.touches[0];
				rulerMove(e, this);
			});


			var timer = null;
			oDom.bind("touchend", function(event) {
				var e = event.originalEvent.changedTouches[0];
				rulerMove(e, this)
				isDown = false;
			});


			function rulerMove(e, _this) {


				if (isDown) {

					var x = ((e.pageX - $(_this).offset().left) - (box_X));



					var maxValue = parseFloat(value) + 1;

					if (x > leftScroll) {
						x = leftScroll;
					} else if (-(x + (rightScroll)) > 0) {
						var rightMax = -(rightScroll);
						x = rightMax;
					}
					if (parseFloat(that.val()) <= minSlide) {
						// console.log()
						if (X > x) {
							console.log('left')
						} else {
							that.val(minSlide);
							return
							console.log('right')
						}

					} else if (parseFloat(that.val()) >= maxSlide) {
						if (X > x) {
							console.log('left')
							that.val(maxSlide);
							return
						} else {
							console.log('right')
						}
					}



					var oChildLeftNext = oChild.eq(childIndex + 1).offset().left;
					var oChildLeftPrev = oChild.eq(childIndex).offset().left;

					if (oChildLeftNext <= basic) {
						if (oChild.eq(childIndex + 2).length != 0) {
							var n = -1; // 防止进入死循环
							var nMax = 0; // 防止进入死循环
							while (oChildLeftNext < basic && oChild.eq(childIndex + 2).length != 0) {

								oChildLeftNext = oChild.eq(childIndex + 2).offset().left;
								if (n == childIndex) {
									nMax++;
									if (nMax > 50) {
										console.log('检测到代码进入死循环（右滑动时），跳出！')
										break
									}
								}
								childIndex++;


							}
						}

					} else if (oChildLeftPrev >= basic) {
						var n = -1; // 防止进入死循环
						var nMax = 0; // 防止进入死循环
						while (oChildLeftPrev >= basic) {
							if (oChild.eq(childIndex - 1).length != 0) {
								oChildLeftPrev = oChild.eq(childIndex - 1).offset().left;
							} else {
								break
							}
							if (n == childIndex) {
								nMax++;
								if (nMax > 50) {
									console.log('检测到代码进入死循环（左滑动时），跳出！')
									break
								}
							}
							childIndex--;
							if (childIndex < 0) {
								childIndex = 0
							}
							n = childIndex;
						}

					}



					var lastVal = -1;
					// that.setDetection(x);
					oScale.css({
						transform: "translate3d(" + (x) + "px, 0, 0)"
					});

					value = that.value = oChild.eq(childIndex).find(".ruler-text").attr('value');
					if (oChild.eq(oChildLen - 1).offset().left <= basic) {
						value = oChild.eq(oChildLen - 1).text();
					}
					oValue.text(value);
					X = x;
					that.onChange && that.onChange(that);



				}
			}

		},


	},

	// 设置位置
	setDetection: function(x) {
		var oDom = $(this.id);
		var oScale = oDom.children(".ruler-body").children(".ruler-scale");
		oScale.css({
			transform: "translate(" + (x) + "px, 0)"
		});
	},



	create: {

		init: function(that) {
			var oDom = $(that.id);
			oDom.html("");
			this.number(that);
			this.body(that);
			this.mark(that);
			this.scale(that);
		},

		// 生成尺身容器
		body: function(that) {
			var oDom = $(that.id);
			var bodyHtml = '<div class="ruler-body"></div>';

			oDom.append(bodyHtml);
		},


		// 生成标记
		mark: function(that) {
			var markHtml = '<div class="ruler-mark"></div>';
			var body = $(that.id).children('.ruler-body');
			body.append(markHtml);

		},

		// 生成顶部显示刻度
		number: function(that) {
			console.log(that)
			var markHtml = '<div class="ruler-number"><span class="ruler-value"></span><sup class="ruler-unit">'+that.unit+'</sup></div>';
			var body = $(that.id);
			body.append(markHtml);
		},

		// 生成刻度
		scale: function(that) {
			var scaleHtml = '';
			var childHtml = '';
			var rate = that.rate; // 倍率
			var min = that.min;
			var max = ((that.max) / rate) + 1;
			var scaleMargin = that.scaleMargin;
			var scaleBigW = that.scaleBigW;
			var scaleW = that.scaleW;
			var toFixed = that.toFixed;
			var scaleLen = that.scaleLen + 1;
			var body = $(that.id).children('.ruler-body');


			var scaleNum = rate / scaleLen;


			for (var i = min; i < max; i++) {
				for (var k = 0; k < scaleLen; k++) {
					var big = k == 0;
					var val = i * rate;
					var mVal = k * scaleNum;
					childHtml += '<div class="ruler-child" style="margin-right:' + scaleMargin + 'px">';
					// childHtml += '<div class="ruler-text" value="' + parseFloat(val + mVal).toFixed(toFixed) + '" ></div>';

					childHtml += '<div class="ruler-text" value="' + parseFloat(val + mVal).toFixed(toFixed) + '" >' + (big ? parseFloat(val + mVal) : "") + '</div>';
					childHtml += '<div class="ruler-line ' + (big ? "ruler-big" : "") + ' " style="width:' + (big ? scaleBigW : scaleW) + 'px "></div>';
					// childHtml += '<div class="ruler-line ' + (big ? "ruler-big" : "") + ' " style="width: 10px;height: 10px;margin-top: .42rem;border-radius: 50%;"></div>';
					childHtml += '</div>';
					if (i >= max - 1) {

						break
					}
				}


			};
			scaleHtml = '<div class="ruler-scale">' + childHtml + '</div>';
			body.append(scaleHtml);
		}
	}
}