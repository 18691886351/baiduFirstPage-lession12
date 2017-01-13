$(document).ready(function() {

    $("#nav_more").click(function() {
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


    $(".mobile .my-navs .title i").click(function() {
        if ($(".mobile .my-navs .title .edite").is(":visible") == false) {
            $(".mobile .my-navs .title .edite").show();
        } else {
            $(".mobile .my-navs .title .edite").hide();
        }
    });
});
