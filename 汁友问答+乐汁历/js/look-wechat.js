'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var LOOK = {
    zIndex: 100000
};





var Look = function Look() {
    this.defaultConfig = {
        left: 0,
        top: 0,
        width: 0,
        maxWidth: 0,
        height: 0,
        maxHeight: 0
    };
    this.container = "body";
    this.type = "text";
    this.icon = "" //  success|error|info|doubt|lock|face-success|face-error
    this.src = ""; // 只适用与iframe类型
    this.title = "温馨提示";
    this.content = ""; // 需要提醒的文字 不适用与iframe类型
    this.zIndex = null;
    this.height = "auto";
    this.width = "auto";
    this.minHeight = "auto";
    this.minWidth = "auto";
    this.maxHeight = "100%";
    this.maxWidth = "100%";
    this.animateType = "elastic"; // 默认elastic(有弹性)|shake(抖动)|move(移动)|zoom(缩放)|rotate(旋转)|gradually(逐渐的)|none(无动画)
    this.position = {}; // 弹窗定位 遵循css规则
    this.direction = "center"; //默认center 弹窗出现的方向 top/bottom/left/right/leftTop/rightTop/leftBottom/rightBottom
    this.windowResize = true; // 页面窗口变化的时候 重新设置大小 重新定位
    this.buttons = []; // 按钮的数组  {text:xxx,click:xxx,type:"green/blue/red"}
    this.titleBar = true; //是否渲染标题栏
    this.titleButtons = { // 头部按钮 close/small/large
        small: function small(that) {
            that.isMinSize ? that.reSize() : that.minSize();
        },
        large: function large(that) {
            that.isMaxSize ? that.reSize() : that.maxSize();
        },
        close: function close(that) {
            that.close(that);
        }
    };
    this.titleBarButtons = ["close"]; // 要显示的头部按钮 close/small/large
    this.autoClose = false; // 自动关闭  可以传毫秒数
    this.onClose = null;
    this.onOpen = null;
    this.buttonBar = true; //是否渲染按钮栏
    //可以写成对象配置遮罩层样式 遵循css规则 如果为null 则不渲染遮罩层
    this.showScreen = true; // 是否显示遮罩
    this.clickScreen = null; //点击遮罩层时的回调
    this.clickScreenClose = false; //点击遮罩层时 是否关闭弹窗
    this.style = null;
    this.isHideBar = false; // 是否去掉页面的滚动条

    this.wraphtml = {}; // wrap包裹的html结构
    this.isMaxSize = false; // 当前是否为全屏状态
    this.isMinSize = false; // 当前是否为最小化状态
    this.minWindowWidth = 150; // 最小化后的宽度
    this.isMove = false; // 是否手动移动过当前弹窗
    this.loadingGif = "data:image/gif;base64,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"
};

Look.prototype.confirm = function (_config) {
    !_config && (_config = {});
    var that = this;
    var confirm = {
        type: "confirm",
        titleBar: false,
        minHeight: 100,
        minWidth: 200,
        maxWidth: "80%",
        content: _config.content || "",
        buttons: [{
            text: "确定",
            // type: "green",
            close: true,
            click: function click() {
                that.yes && that.yes();
            }
        }, {
            text: "关闭",
            close: true,
            click: function click() {
                that.no && that.no();
            }
        }]
    };
    switch (_config.skin) {
        case "0":
            confirm.minWidth = "auto";
            confirm.showScreen = false;
            confirm.titleBar = false;
            break;
    }

    if (typeof _config != "object") {
        confirm.content = _config;
    } else {
        $.extend(confirm, _config);
    }

    this.init(confirm);
    return this;
};
Look.prototype.prompt = function (_config) {
    !_config && (_config = {});
    var that = this;

    var prompt = {
        type: "prompt",
        titleBar: false,
        minHeight: 100,
        minWidth: 200,
        maxWidth: "80%",
        content: _config.content || "",
        buttons: [{
            text: "确定",
            // type: "green",
            click: function click() {
                that.value = that.$self.find(".look-input").val();
                that.yes && that.yes();
            }
        }, {
            text: "关闭",
            close: true,
            click: _config.no
        }]
    };
    switch (_config.skin) {
        case "0":
            prompt.minWidth = "auto";
            prompt.showScreen = false;
            prompt.titleBar = false;
            break;
    }

    if (typeof _config != "object") {
        prompt.content = _config;
    } else {
        $.extend(prompt, _config);
    }

    this.init(prompt);
    return this;
};
Look.prototype.alert = function (_config) {
    !_config && (_config = {});
    var that = this;
    var alert = {
        type: "alert",
        titleBar: false,
        minHeight: 100,
        minWidth: 200,
        maxWidth: "80%",
        content: _config.content || "",
        height: "auto",
        buttons: [{
            text: "确定",
            // type: "blue",
            close: true,
            click: function click() {
                that.ok && that.ok();
            }
        }]
    };
    switch (_config.skin) {
        case "0":
            alert.minWidth = "auto";
            alert.showScreen = false;
            alert.titleBar = false;
            break;
    }

    if (typeof _config != "object") {
        alert.content = _config;
    } else {
        $.extend(alert, _config);
    }

    this.init(alert);
    return this;
};
Look.prototype.msg = function (_config) {
    var that = this;
    this.close('msg');
    var msg = {
        type: "msg",
        skin: "0",
        // minHeight: 100,
        minWidth: 100,
        maxWidth: 200,
        direction:"top",
        titleBar: false,
        buttonBar: false,
        showScreen: false,
        width: "auto",
        content: _config && _config.content || "",
        autoClose: 1500
    };

    if (typeof _config != "object") {
        msg.content = _config;
    } else {
        $.extend(msg, _config);
    }

    this.init(msg);
    return this;
};
Look.prototype.success = function (_config) {
    var that = this;
    var success = {
        icon: "face-success",
    };
    if (typeof _config != "object") {
        success.content = _config;
    } else {
        $.extend(success, _config);
    }
    this.msg(success);
    return this;
};
Look.prototype.error = function (_config) {
    var that = this;
    var success = {
        icon: "face-error",
        animateType:"shake",
        direction:"center"
    };
    if (typeof _config != "object") {
        success.content = _config;
    } else {
        $.extend(success, _config);
    }
    this.msg(success);
    return this;
};
Look.prototype.loading = function (_config) {
    var that = this;
    var loadingGif = "<img class='loading-gif' src='" + this.loadingGif + "' />";
    var loading = {
        type: "loading",
        skin: "0",
        minHeight: 80,
        minWidth: 100,
        maxHeight:"80%",
        maxWidth:"80%",
        titleBar: false,
        buttonBar: false,
        showScreen: {
            background: "none"
        },
        content: loadingGif
    };

    if (typeof _config != "object") {
        loading.content = loadingGif + "<p>" + _config + "</p>";
    } else {
        $.extend(loading, _config);
        loading.content = loadingGif + "<p>" + _config.content + "</p>";
    }

    this.init(loading);
    return this;
};
Look.prototype.wrap = function (_config) {
    !_config && (_config = {});
    // this.titleBarButtons = ["close", "small", "large"];
    var wrap = {
        type: "wrap",
        skin: 0,
        zIndex:1000
    };
    if (typeof _config == "object" && _config.dom) {
        $.extend(wrap, _config);
    } else {
        wrap.dom = _config;
    }
    this.init(wrap);
    return this;
};
Look.prototype.iframe = function (_config) {
    !_config && (_config = {});
    // this.titleBarButtons = ["close", "small", "large"];
    var iframe = {
        type: "iframe",
        titleBar:false
        // titleBarButtons: this.titleBarButtons
    };

    if (typeof _config != "object") {
        iframe.src = _config;
    } else {
        $.extend(iframe, _config);
    }


    this.init(iframe);
    return this;
};

Look.prototype.init = function (config) {
    $.extend(this, config);
    this.render();
    this.rewindow();
    return this;
};

// 开始渲染弹窗结构到容器(默认body)中
Look.prototype.render = function () {
    this.lookId = this.randomNum(5);
    if (this.type != "wrap") {
        var html = this.create.getHtml(this);
        var container = $(this.container);
        container.append(html);
    } else {
        this.dom = typeof this.dom == "string" ? $(this.dom) : this.dom;
        if (this.dom && this.dom.parent(".look-body").length > 0) {
            // 如果wrap已经被包裹 则不再继续
            return this;
        }
        this.create.createWrap(this);
    }
    this.$self = this.getSelf();
    var that = this;
    this.style && this.$self.find(".look-box").css(this.style);
    if (this.isHideBar) {
        this.hideWindowBar();
    };
    that.renderComplete && that.renderComplete();

};

Look.prototype.setDefaultConfig = function () {
    var body_h = this.$self.find('.look-body')[0].innerHeight || 0;
    this.defaultConfig.height = body_h;
};

// 隐藏页面滚动条
Look.prototype.hideWindowBar = function () {
    !this.defHideBar && (this.defHideBar = $('html').css('overflow'));
    $('html').css('overflow', 'hidden');
};

// 恢复页面滚动条
Look.prototype.reWindowBar = function () {
    !this.defHideBar && (this.defHideBar = 'visible');
    $('html').css('overflow', this.defHideBar);
};




// 渲染完成
Look.prototype.renderComplete = function () {

    var that = this;


    // 先开始逐个去绑定事件
    this.bindEvent();

    // 再显示弹窗
    this.open();

    // 再配置大小
    this.autoSize();

    // 然后开始定位
    this.setPosition();



    // 记录最初始的大小，以便恢复大小
    this.setDefaultConfig();

    // 如果是ie7
    // this.ISIE(7, function () {
    //     setTimeout(function () {
    //         // 然后开始定位
    //         that.setPosition();
    //         // 再配置大小
    //         that.autoSize();
    //     }, 10);
    // });
    return this;
};

// 渲染完成去自动配置大小
Look.prototype.autoSize = function () {
    var that = this;
    var defaultConfig = this.defaultConfig;
    // that.IE(function () {
    // var de_box_h = that.$self.find(".look-box").height() || 300;
    // var de_box_w = that.$self.find(".look-box").outerWidth() || 300;
    var offset = that.$self.find(".look-box").offset();
    // (!that.height || that.height == "auto") && (that.height = de_box_h);
    // (!that.width || that.width == "auto") && (that.width = de_box_w);
    that.$self.find(".look-box").css({
        height: that.height,
        maxHeight: that.maxHeight,
        minHeight: that.minHeight,
        width: that.width,
        minWidth: that.minWidth,
        maxWidth: that.maxWidth
    });

    var $self = this.$self;
    var box = $self.find('.look-box');
    var head_h = box.find('.look-head').height() || 0;
    var floor_h = box.find('.look-floor').height() || 0;
    var box_h = box.height() || 0;
    var body_h = box_h - (head_h + floor_h);

    that.$self.find(".look-box .look-body").css({
        height: defaultConfig.height || body_h
    });
    // that.IE(function () {
    //     that.IE(function () {
    // var head_h = that.$self.find(".look-head").height() || 0;
    // var floor_h = that.$self.find(".look-floor").height() || 0;
    // var box_h = parseInt(that.height);
    // if ((that.height + "").indexOf("%") != -1 || that.height == "auto") {
    //     box_h = that.$self.find(".look-box").height();
    // }
    // var body_h = box_h - (head_h + floor_h);

    // 如果是ie 则去除多余的padding高度
    // if (that.ISIE(7)) {
    //     body_h -= (that.$self.find(".look-body").innerHeight() - that.$self.find(".look-body").height())

    //     console.log(body_h)
    // }
    // if (that.type == "iframe" || that.type == "wrap") {
    // if (that.height != "auto" || that.height) {
    //     that.$self.find(".look-box .look-body").css("height", body_h);
    // }
    if (!$.isEmptyObject(that.showScreen) && typeof that.showScreen != "boolean") {
        that.$self.find(".look-screen").css(that.showScreen);
    }
    // });
    //     });
    // });



    return that;

};



// 返回.look-container唯一自身
Look.prototype.getSelf = function () {
    return $(".look-container[data-id='" + this.lookId + "']");
}

// 当窗口变化时 重置定位与大小
Look.prototype.rewindow = function () {
    var that = this;
    if (this.windowResize) {
        var setEventName = this.eventName = 'lookResize' + that.lookId;

        $(window).on(setEventName, function () {

                if (that.isMaxSize || that.isMinSize) return;
                // 重新配置大小
                that.autoSize();

                //  重新开始定位
                that.setPosition();
            })
            .resize(function () {
                $(this).trigger(setEventName);
            });
    }

    return this;
}



// 给所有能点的 都加上事件
Look.prototype.bindEvent = function () {
    var $self = this.$self;
    var buttons = this.buttons;
    var that = this;

    // 给所有按钮加上事件
    if (this.buttonBar) {
        $self.find(".look-floor .look-floor-btns .floor-btn").each(function (index) {
            var btn = buttons[index];
            var callback = btn.click;
            $(this).click(function () {
                if (btn.close) {
                    that.close();
                }
                callback && callback(that, btn);
            });
        });
    };

    // 给标题按钮加事件
    $self.find(".look-head .title-btn").each(function () {
        $(this).click(function (e) {
            e.stopPropagation();
            var type = $(this).data("type");
            that.titleButtons[type] && that.titleButtons[type](that);
        });
    });

    $self.find(".mini-close").click(function () {
        var type = $(this).data("type");
        that.titleButtons.close && that.titleButtons.close(that);
    });

    // 给遮罩加点击事件
    $self.find(".look-screen").each(function () {
        $(this).click(function () {
            that.clickScreen && that.clickScreen(that);
            if (that.clickScreenClose) {
                that.close();
            }
        });
    });

    // 点击标题恢复最小化原始大小
    $self.find(".look-head").click(function () {
        if (that.isMinSize) {
            $self.removeClass('look-minsize');
            that.reSize();
        }
    });

    this.mousePull($self.find(".look-head"), $self.find(".look-box"));
    return this;
};


// 最小化
Look.prototype.minSize = function () {
    var $self = this.$self;

    var minsize = $(".look-container[minSize=true]");
    var sumLeft = $self.index('.look-container') * this.minWindowWidth;

    $self.find(".look-box").css({
        height: "auto",
        maxHeight: "auto",
        minHeight: "auto",
        width: this.minWindowWidth,
        left: sumLeft,
        top: "auto",
        bottom: 0,
        right: "auto"
    });
    $self.attr("minSize", true);
    $self.addClass('look-minsize');
    this.isMinSize = true;
    this.isMaxSize = !this.isMinSize;
    return this;
}

// 最大化
Look.prototype.maxSize = function () {
    this.hideWindowBar(); // 隐藏页面滚动条
    var $self = this.$self;
    var that = this;
    var head_h = that.$self.find(".look-head").height() || 0;
    var floor_h = that.$self.find(".look-floor").height() || 0;
    var add_h = (head_h + floor_h);
    var maxHeight = $(window).height() - add_h;
    $self.find(".look-box").css({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: "100%",
        maxHeight: "100%",
        minHeight: "100%"
    }).find(".look-body").css({
        height: maxHeight
    });
    $self.attr("maxSize", true);
    this.isMaxSize = true;
    this.isMinSize = !this.isMaxSize;
    $self.find(".look-head .look-title-btns .icon-large").html("&#xe605;");
    return this;
};
// 恢复大小
Look.prototype.reSize = function () {
    this.reWindowBar(); // 恢复页面滚动条
    var $self = this.$self;
    var that = this;

    $self.find(".look-box").css({
        left: this.position.left || "auto",
        top: this.position.top || "auto",
        right: this.position.right || "auto",
        bottom: this.position.bottom || "auto"
    });

    // 自动配置大小
    this.autoSize();
    // 将全屏状态改为false
    this.isMaxSize = false;
    // 将最小化状态改为false
    this.isMinSize = false;

    $self.attr("maxSize", false);
    $self.attr("minSize", false);
    $self.find(".look-head .look-title-btns .icon-large").html("&#xe616;");
    return this;
};

Look.prototype.open = function () {
    var $self = this.$self;
    var that = this;
    if (this.type == "wrap") {
        this.display = this.dom.css("display");
        this.dom.show();
    }
    // 将最新的显示层叠到最高
    this.maxShow();
    setTimeout(function () {
        $self.removeClass("look-hide");
        that.onOpen && that.onOpen();
        $self.find(".look-body .look-input").focus();
        that.autoClose && that.close(that.autoClose);
    }, 20);
    return this;
};

Look.prototype.close = function (_timeOrId) {
    this.reWindowBar(); // 恢复页面滚动条
    var $self = typeof _timeOrId == "string" ? _timeOrId : this.$self;
    if ($self == "all") {
        $self = $(".look-container");
    } else if (typeof _timeOrId == "string") {
        $self = $(".look-container[data-type='" + _timeOrId + "']");
    }
    var that = this;
    $self.each(function () {
        var othis = $(this);
        var type = othis.data("type");
        if (type == "wrap") {
            that.closeWrap(_timeOrId);
            return true;
        };
        setTimeout(function () {
            othis.addClass("look-hide look-hide-animate");
            setTimeout(function () {
                othis.remove();
                that.eventName && $(window).off(that.eventName);
                that.onClose && that.onClose();
            }, 300);
        }, typeof _timeOrId == "number" ? _timeOrId : 0);
    });
    return this;
};

// 关闭wrap类型的
Look.prototype.closeWrap = function (_timeOrId) {
    var $self = typeof _timeOrId == "string" ? _timeOrId : this.$self;
    if ($self == "all") {
        $self = $(".look-container");
    };
    var that = this;

    $self.each(function () {
        var othis = $(this);
        var type = othis.data("type");
        if (type != "wrap") {
            console.log(type)
            return true;
        };
        setTimeout(function () {
            othis.addClass("look-hide look-hide-animate");
            that.dom = othis.find(".look-body").children();
            setTimeout(function () {
                if (that.dom.parent('.look-body').length == 0) {
                    // 如果父级为look-body的时候再删除包裹元素，防止快速点击而误删其他元素
                    return
                };
                that.dom.unwrap();
                that.dom.prev().remove(".mini-close");
                that.dom.prev().remove(".look-head");
                that.dom.next().remove(".look-floor");
                that.dom.unwrap();
                that.dom.prev().remove(".look-screen");
                that.dom.unwrap();
                that.dom.css("display", that.display);
                that.eventName && $(window).off(that.eventName);
                that.onClose && that.onClose();
            }, 300);
        }, typeof _timeOrId == "number" ? _timeOrId : 0);
    });
    return this;
};

Look.prototype.create = {
    getHtml: function (that) {
        var screen = this.createScreen(that);
        var box = this.createBox(that);
        var container = "<div class=\"look-container look-hide\" data-id=\"" + that.lookId + "\" data-type=\"" + that.type + "\">\n                " + screen + "\n                " + box + "\n            </div>";
        return container;
    },
    createScreen: function (that) {
        if (!that.showScreen) {
            return "";
        }
        var screen = "<div class=\"look-screen\"></div>";
        return screen;
    },
    createIframe: function (that) {
        var iframe = "<iframe src=\"" + that.src + "\"  frameborder=\"0\" width=\"100%\" height=\"100%\" scrolling=\"auto\" ></iframe>";
        return iframe;
    },
    createBox: function (that) {

        var type = that.type || "text";
        var skin = that.skin || "skin";
        var animateType = that.animateType || "elastic";
        var head = this.createHead(that);
        var body = this.createBody(that);
        var floor = this.createFloor(that);
        var box = "<div class=\"look-box " + type + " look-animate-" + animateType + " skin-" + skin + "\"  >\n" + head + "\n" + body + "\n" + floor + "\n</div>";
        return box;
    },
    createHead: function (that) {
        if (!that.titleBar) {
            return "";
        };

        var titleButtonsHtml = "";
        var head = "";
        if (that.skin == "0") {
            titleButtonsHtml = this.createMiniCloseBtn(that);
            head = titleButtonsHtml;

        } else {
            titleButtonsHtml = this.createTitleBtns(that);
            head = "<div class=\"look-head\">\n<div class=\"look-title\">" + that.title + "</div>\n<div class=\"look-title-btns\">\n" + titleButtonsHtml + "\n</div>\n</div>";

        };
        return head;
    },
    createBody: function (that) {
        var type = that.type || "text";
        var cont = "";
        var icon = that.icon;
        switch (type) {
            case "iframe":
                cont = this.createIframe(that);
                break;
            case "prompt":
                cont = this.createInput(that);
                break;
            default:
                cont = that.content;
        };
        if (typeof cont == "object") {
            (cont = JSON.stringify(cont));
        }

        if (icon) {
            cont = '<div class="look-icon look-bg icon-' + icon + '"></div>' + cont
        }
        var ispadding = icon ? 'look-padding' : '';

        var body = "<div class=\"look-body " + ispadding + "\">" + cont + "</div>";
        return body;
    },
    createFloor: function (that) {
        if (!that.buttonBar || !that.buttons || that.buttons.length == 0) {
            return "";
        }
        var btnhtml = this.createBtns(that);
        var floor = "<div class=\"look-floor\">\n<div class=\"look-floor-btns\">\n" + btnhtml + "\n</div>\n</div>";
        return floor;
    },
    createBtns: function (that) {

        var buttons = that.buttons;
        var btnhtml = "";

        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            var type = btn.type || "";
            btnhtml += '<div class="floor-btn ' + type + ' ">' + btn.text + '</div>';
        };
        return btnhtml;
    },
    createTitleBtns: function (that) {
        var titleButtonsHtml = "";
        var titleButtons = that.titleButtons;
        var iconfont = "&#xe685;"; //关闭图标
        for (var key in titleButtons) {
            if (that.titleBarButtons != "all") {
                var isBtn = $.inArray(key, that.titleBarButtons) != -1;
                if (!isBtn) {
                    continue;
                }
            }
            var val = titleButtons[key];
            switch (key) {
                case "close":
                    iconfont = "&#xe685;";
                    break;
                case "large":
                    iconfont = "&#xe616;";
                    break;
                case "large-copy":
                    iconfont = "&#xe605;";
                    break;
                case "small":
                    iconfont = "&#xe71f;";
                    break;
            };
            titleButtonsHtml += '<div class="title-btn ' + key + ' " data-type="' + key + '" ><i class="look-iconfont icon-' + key + '">' + iconfont + '</i> </div>';
        };
        return titleButtonsHtml;
    },
    createMiniCloseBtn: function (that) {
        return "<div class=\"mini-close look-bg\"></div>";
    },
    createInput: function (that) {
        !that.value && (that.value = "");
        $.isEmptyObject(that.content) && (that.content = "");
        var html = "\n        <p>" + that.content + "</p>\n        <input class=\"look-input\" value=\"" + that.value + "\" />\n        ";
        return html;
    },
    createWrap: function (that) {
        if (!that.dom) {
            return that;
        };
        // that.dom = typeof that.dom == "string" ? $(that.dom) : that.dom;
        var dom = that.dom;

        var animateType = that.animateType || "elastic";
        var titleButtons = that.titleButtons;
        var iconfont = "&#xe685;"; //关闭图标
        var btnhtml = this.createBtns(that);
        var container = that.wraphtml.container = $("<div class=\"look-container look-hide\" data-id=\"" + that.lookId + "\" data-type=\"" + that.type + "\"></div>");
        var screen = that.wraphtml.screen = $(this.createScreen(that));
        var box = that.wraphtml.box = $("<div class=\"look-box wrap " + " look-animate-" + animateType + " \" ></div>");
        var head = that.wraphtml.head = $(this.createHead(that));
        var body = that.wraphtml.body = $(this.createBody(that));
        var floor = that.wraphtml.floor = $(this.createFloor(that));
        var screen = $("<div class=\"look-screen\"></div>");
        dom.wrap(container).wrap(box).before(head).after(floor).wrap(body);
        dom.parents(".look-container[data-id='" + that.lookId + "']").prepend(screen);

    }
};

// 配置定位
Look.prototype.setPosition = function (_position) {

    var position = _position || this.position;
    // 只有将direction设置为false position里面的定位才会生效
    var direction = this.direction;

    var that = this;
    var e = that.$self.find(".look-box");
    var w = $(window).width(),
        h = $(window).height();
    var thisW = e[0].offsetWidth;
    var thisH = e[0].offsetHeight;
    var container = $(this.container);
    // var _eTop = container[0].scrollTop;
    // var _eLeft = container[0].scrollLeft;
    var centerX = (w - thisW) / 2; // 水平居中
    var centerY = (h - thisH) / 2; // 垂直居中
    var right = w - thisW;
    var bottom = h - thisH;
    if (direction) {
        switch (direction) {
            case "top":
                e.css({
                    'left': centerX,
                    'top': 0
                });
                that.position.left = centerX;
                that.position.top = 0;
                break;
            case "bottom":
                e.css({
                    'left': centerX,
                    'top': bottom
                });
                that.position.left = centerX;
                that.position.top = bottom;
                break;
            case "left":
                e.css({
                    'top': centerY,
                    'left': 0
                });
                that.position.left = 0;
                that.position.top = centerY;
                break;
            case "right":
                e.css({
                    'top': centerY,
                    'left': right
                });
                that.position.left = right;
                that.position.top = centerY;
                break;
            case "leftTop":
                e.css({
                    'top': 0,
                    'left': 0
                });
                that.position.left = 0;
                that.position.top = 0;
                break;
            case "rightTop":
                e.css({
                    'top': 0,
                    'left': right
                });
                that.position.left = right;
                that.position.top = 0;
                break;
            case "leftBottom":
                e.css({
                    'top': bottom,
                    'left': 0
                });
                that.position.left = 0;
                that.position.top = bottom;
                break;
            case "rightBottom":
                e.css({
                    'top': bottom,
                    'left': right
                });
                that.position.left = right;
                that.position.top = bottom;
                break;
            default:
                e.css({
                    'left': centerX,
                    'top': centerY
                });
                that.position.left = centerX;
                that.position.top = centerY;
                break;
        }
    } else {
        e.css(position);
    }


    return this;
};

// 将最新的显示层叠到最高
Look.prototype.maxShow = function () {
    LOOK.zIndex++;
    var zIndex = LOOK.zIndex;
    this.zIndex && (zIndex = this.zIndex);
    this.$self.find(".look-box").css("z-index", zIndex);
    this.$self.find(".look-screen").css("z-index", zIndex);
};

//拖拽
Look.prototype.mousePull = function (click, move) {
    //要点击的id，要拖动的id

    var isDown = false;
    var that = this;

    var box_X = 0;
    var box_Y = 0;

    click.click(function (e) {
        e.stopPropagation();
    });

    //按下后记录相对位置
    click.mousedown(function (e) {
        // 将最新的显示层叠到最高
        that.maxShow();

        var isMaxSize = that.isMaxSize;
        var isMinSize = that.isMinSize;
        if (isMaxSize || isMinSize) {
            isDown = false;
            return that;
        }

        box_X = e.pageX - move.offset().left + $(window).scrollLeft();
        box_Y = e.pageY - move.offset().top + $(window).scrollTop();
        move.css({
            right: that.position.right || "auto",
            bottom: that.position.bottom || "auto",
            left: move[0].offsetLeft,
            top: move[0].offsetTop
        });
        //asd
        isDown = true;
    });

    $(document).mousemove(function (e) {
        var rt = $(document).width() - (e.pageX + move.width() - box_X);
        var lf = e.pageX - box_X;
        var top = $(document).height() - (e.pageY + move.height() - box_Y);
        var bot = e.pageY - box_Y;
        if (isDown == true) {
            if (!that.isMove) {
                that.isMove = true;
            }
            if (rt < 0) {
                that.position.left = $(document).width() - move.width();
                move.css('left', that.position.left + 'px');
            } else if (lf < 0) {
                move.css('left', 0);
                that.position.left = 0;
            } else {
                that.position.left = e.pageX - box_X;
                move.css('left', that.position.left + 'px');
            }
            if (top < 0) {
                that.position.top = $(document).height() - move.height();
                move.css('top', that.position.top + 'px');
            } else if (bot < 0) {
                move.css('top', 0);
                that.position.top = 0;
            } else {
                that.position.top = e.pageY - box_Y;
                move.css('top', that.position.top + 'px');
            }
        };
    });
    $(document).mouseup(function (e) {
        isDown = false;
    });
};

Look.prototype.randomNum = function (len) {
    var m = "";
    for (var i = 0; i < len; i++) {
        m += Math.floor(Math.random() * 10);
    }
    return m;
};

// 校验ie 如果不传 则校验是不是ie  如果传参数 7，8，9，10，11 则校验是不是对应的ie版本
Look.prototype.ISIE = function (_ver, callback) {
    var ie = navigator.appName == "Microsoft Internet Explorer"; //是否IE
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    callback && callback();
    return _ver ? fIEVersion == _ver : ie;
};

Look.prototype.IE = function (_callback) {
    if (this.ISIE()) {
        setTimeout(function () {
            _callback && _callback();
        }, 0);
    } else {
        _callback && _callback();
    }
};

window.look = new Look();

window.look.msg = function (_obj) {
    var msg = new Look();
    msg.msg(_obj);
    return msg;
};
window.look.success = function (_obj) {
    var success = new Look();
    success.success(_obj);
    return success;
};
window.look.error = function (_obj) {
    var error = new Look();
    error.error(_obj);
    return error;
};
window.look.alert = function (_obj) {
    var alert = new Look();
    alert.alert(_obj);
    return alert;
};
window.look.confirm = function (_obj) {
    var confirm = new Look();
    confirm.confirm(_obj);
    return confirm;
};
window.look.prompt = function (_obj) {
    var prompt = new Look();
    prompt.prompt(_obj);
    return prompt;
};
window.look.iframe = function (_obj) {
    var iframe = new Look();
    iframe.iframe(_obj);
    return iframe;
};
window.look.wrap = function (_obj) {
    var wrap = new Look();
    wrap.wrap(_obj);
    return wrap;
};