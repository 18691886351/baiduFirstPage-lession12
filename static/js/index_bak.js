$(document).ready(function() {

    //随着换肤透明度，改变自定义模块的class，用0-100
    var change_opacity = function(opacity) {
        var _reg = new RegExp('(skin_opacity_[0-9]{1,3})');
        var _className = $(".custom").attr("class");
        $(".custom").removeClass(_className.match(_reg)[0]);
        $(".custom").addClass("skin_opacity_" + opacity);
        localStorage.opacity = opacity; //保存透明度
    }

    var reset_opacity = function() {
        var _reg = new RegExp('(skin_opacity_[0-9]{1,3})');
        var _className = $(".custom").attr("class");
        $(".custom").removeClass(_className.match(_reg)[0]);
        $(".custom").addClass("skin_opacity_200"); //skin_opacity_200是不存在的，表示不进行透明度处理
        localStorage.removeItem("opacity");
    }

    var ori_main_logo = "./static/images/bd_logo1.png";

    var change_ski = function(data_index) {
        var img_url = "https://ss2.bdstatic.com/kfoZeXSm1A5BphGlnYG/skin/" + data_index + ".jpg?2";
        $(".skin-container").css({ "background-color": "#404040", "background-image": "url(" + img_url + ")" });
        $(".skin-font").addClass("skin-font-white");
        //修改主页logo
        $(".skin-main-logo").attr("src", "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png");
        //修改搜索btn的背景
        $("#baidu_bnt").addClass("skin-baidu-bnt");
        //保存skinName
        localStorage.isSkin = 1; //使用皮肤
        localStorage.skinName = data_index; //保存皮肤序号
    }

    var reset_ski = function() {
        $(".skin-container").attr("style", "");
        $(".skin-font").removeClass("skin-font-white");
        $(".skin-main-logo").attr("src", ori_main_logo);
        $("#baidu_bnt").removeClass("skin-baidu-bnt");
        localStorage.removeItem("skinName");
    }

    /*换肤中透明度实现点击与拖动*/
    var settOpacity = function(e) {
        var _Y = $("#s_bg_ajust_bar").offset().top;
        var _X = $("#s_bg_ajust_bar").offset().left;
        var _mouseX = e.pageX;
        var _width = $("#s_bg_ajust_bar").width();
        var _btnwidth = $("#s_bg_ajust_btn").width();
        var _offset = 0;
        if (_mouseX <= _X) {
            _offset = 0;
        } else if ((_mouseX - _X) < (_btnwidth / 2)) {
            _offset = 0;
        } else {
            _offset = _mouseX - _X - (_btnwidth / 2);
        }
        //alert("mouseX=" + _mouseX + ",X=" + _X + ",Y=" + _Y);
        /*      
        alert("mouseX=" + mouseX + ",X=" + X + ",Y=" + Y);
        alert(mouseX - X);
        */
        $("#s_bg_ajust_btn").css({ "transform": "translate3d(" + _offset + "px,0,0)" });
        //alert("_offset=" + _offset + ",_width=" + _width + ",_width-_btnwidth=" + (_width - _btnwidth) + ",_btnwidth=" + _btnwidth);
        var _percent = Math.abs(((_offset / (_width - _btnwidth)) * 100).toFixed(0));
        if (_percent > 0) _percent = _percent + 5 - _percent % 5;
        if (_percent > 100) _percent = 100;
        //alert("_percent=" + _percent);
        $("#s_bg_ajust_txt").text(_percent + "%");
        change_opacity(_percent);
    }

    /*从localStorage中读取isSkin和skinName与透明度*/
    //localStorage.clear();
    var isSkin = localStorage.isSkin;
    if (isSkin == null || isSkin == 0) {
        isSkin = 0; //不使用皮肤
    } else {
        var _skinName = localStorage.skinName;
        if (_skinName != null || _skinName.length != 0) {
            change_ski(_skinName);
        }
        var _opacity = localStorage.opacity;
        if (_opacity != null) {
            change_opacity(_opacity);
        }
    }

    /*实现了导航栏目中“搜索栏camera”的鼠标moveover以及moveout事件*/
    $("#camera").mouseover(function() {
        $(this).removeClass("camera_onmouseout");
        $(this).addClass("camera_onmouseover");
    })

    $("#camera").mouseout(function() {
        $(this).removeClass("camera_onmouseover");
        $(this).addClass("camera_onmouseout");
    })

    /*顶部搜索栏*/
    $("#camera2").mouseover(function() {
        $(this).removeClass("camera_onmouseout");
        $(this).addClass("camera_onmouseover");
    })

    $("#camera2").mouseout(function() {
        $(this).removeClass("camera_onmouseover");
        $(this).addClass("camera_onmouseout");
    })

    /*
    实现了按钮“百度一下”的鼠标moveover以及moveout事件
    */
    $("#baidu_bnt").mouseover(function() {
        $(this).removeClass("baidu_bnt_onmouseout");
        $(this).addClass("baidu_bnt_onmouseover");
    })

    $("#baidu_bnt").mouseout(function() {
        $(this).removeClass("baidu_bnt_onmouseover");
        $(this).addClass("baidu_bnt_onmouseout");
    })

    /*
    实现了搜索栏获得焦点后改变其父级元素的边框颜色,失去焦点还原
    */
    $("#baidu_text").focus(function() {
        $(this).parent().addClass("text_span_focus");
    })
    $("#baidu_text").blur(function() {
        $(this).parent().removeClass("text_span_focus");
    })

    /*导航栏的设置按钮mouseover与mouserout*/
    $("#setting").mouseover(function() {
        $("#setting_menu").show();
    })

    $("#setting").mouseout(function() {
        $("#setting_menu").hide();
    })

    /*导航栏的"更多产品"按钮mouseover与mouserout*/
    $("#products").mouseover(function() {
        $("#products_menu").show();
    })

    $("#products").mouseout(function() {
        $("#products_menu").hide();
    })

    $(".custom .custom-nav .menu").click(function() {
        var menu_name = $(this).attr("name");
        $("#" + menu_name).show();
        $("#" + menu_name).siblings().hide();
        $(this).css({ "background-color": "gray" })
        $(this).siblings().css({ "background-color": "transparent" });
        $(this).children(".name").css({ "color": "white", "font-weight": "bold" });
        $(this).siblings().children(".name").css({ "color": "black", "font-weight": "normal" });
    })

    $("#s_bg_ajust_bar").click(settOpacity);
    /*实现拖动效果*/
    var isMouseDown = 0;
    $("#s_bg_ajust_btn").mousedown(function() {
        isMouseDown = 1;
    });

    $("#s_bg_ajust_btn").mouseup(function() {
        isMouseDown = 0;
    });

    $("#s_bg_ajust_btn").mousemove(function(event) {
        var _X = $("#s_bg_ajust_bar").offset().left + $("#s_bg_ajust_bar").width();
        //alert("event.pageX =" + event.pageX + ",_X=" + _X);
        if (event.pageX >= _X) {
            return;
        }
        if (isMouseDown == 1) {
            settOpacity(event);
        }
    })

    /*换肤中鼠标mouseover过list-item时
    1.文字显示出现
    2.shadow透明度发生变化
    mouseout时,文字隐藏，shadow透明度变为0.
    3.改变预览img的src
    */
    $(".skin-img-item").mouseover(function() {
        $(this).children(".skin-img-item-writer").show();
        $(this).children(".skin-img-shadow").css({ "opacity": "0.5" });
        var img_sr = $(this).children(".skin-img-item-img").attr("src");
        $("#s_skin_preview_skin").attr("src", img_sr);
    });

    $(".skin-img-item").mouseout(function() {
        $(this).children(".skin-img-item-writer").hide();
        $(this).children(".skin-img-shadow").css({ "opacity": "0" });
    });

    /*设置皮肤*/
    $(".skin-img-item").click(function() {
        var data_index = $(this).attr("data-index");
        change_ski(data_index);
    });

    /*点击收起按钮，皮肤模块打开*/
    $("#skin-up-btn").click(function() {
            $(".skiner").slideToggle();
        })
        /*点击收起按钮，皮肤模块收起来*/
    $("#skin-close-btn").click(function() {
        $(".skiner").slideToggle();
    })

    /*点击不使用皮肤，界面还原，localStorage.isSkin=0表示未使用皮肤*/
    $("#noskin_btn").click(function() {
        reset_opacity();
        reset_ski();
        localStorage.isSkin = 0;
    })

    /*s_top_feed 回到顶部按钮mouseover与mouseout事件*/
    $("#s_top_feed").mouseover(function() {
        $(this).children(".text").show();
        $(this).children(".icon").hide();
    });

    $("#s_top_feed").mouseout(function() {
        $(this).children(".text").hide();
        $(this).children(".icon").show();
    });

    $("#s_top_feed").click(function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    });

    /*搜索栏input_div,获取焦点与失去焦点改变class*/
    $("#baidu_text").focus(function() {
        $(this).parent().addClass("text_span_focus");
    });
    $("#baidu_text").blur(function() {
        $(this).parent().removeClass("text_span_focus");
    });

    //toper中的input_div,获取焦点与失去焦点改变class
    $("#baidu_text2").focus(function() {
        $(this).parent().addClass("text_span_focus");
    });
    $("#baidu_text2").blur(function() {
        $(this).parent().removeClass("text_span_focus");
    });

    //mouseover展开weather-detail-panel，mouseout闭合weather-detail-panel
    $("#show-weather").mouseover(function() {
        $("#weather-detail-panel").show();
    })

    $("#show-weather").mouseout(function() {
        $("#weather-detail-panel").hide();
    })

    $(window).scroll(function() {
        var st = $(this).scrollTop();
        console.log("st=" + st);
        if (st < 300) {
            $("#toper-search").hide();
            $("#s_top_feed").hide();
        } else {
            $("#toper-search").show();
            $("#s_top_feed").show();
        }

        if (st < 50) {
            $("#s_top_feed").hide();
        } else {
            $("#s_top_feed").show();
        }

    });
})
