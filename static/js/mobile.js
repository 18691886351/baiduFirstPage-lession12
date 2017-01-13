jikelession12.baidufirstpageMobile = (function() {
    
	var me={};

    function init() {
    	render();
    	bind();
    }

    function render() {
    	me.navMorebtn=$("#nav_more");//第一排导航最右侧的“更多”按钮
    	me.myNavPopUpMenuBtn=$(".mobile .my-navs .title i");//我的导航最右侧的按钮，显示弹出菜单
    }

    function bind() {
        me.navMorebtn.click(function() {
            if ($(this).attr("status") == "close") {
                $(this).html("&#xe607;");
                $(this).attr("status", "open");
                $(".mobile .navs .secondary-shell").show();
            } else {
                $(this).html("&#xe608;");
                $(this).attr("status", "close");
                $(".mobile .navs .secondary-shell").hide();
            }
        });

        me.myNavPopUpMenuBtn.click(function() {
            if ($(".mobile .my-navs .title .edite").is(":visible") == false) {
                $(".mobile .my-navs .title .edite").show();
            } else {
                $(".mobile .my-navs .title .edite").hide();
            }
        });
    }
    return {
        init: init
    }

})();


$(document).ready(function() {
	jikelession12.baidufirstpageMobile.init();
});
