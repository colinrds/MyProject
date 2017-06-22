/**
 * @file Describe the file
 * author linhang(mail:colinued@163.com).
 */
(function(){
    //判断调用JS页面
    var pageUrl = function(){
        var theRequest = [];
        var strS = '';
        $("script").each(function(){
            var page = $(this).attr('src');
            if (page.indexOf("?") != -1) {
                var str = page.substr(1);
                strS = str.split("&");
                for(var i = 0; i < strS.length; i ++) {
                    theRequest[i] = unescape(strS[i].split("=")[1]);
                }
            }
        });
        return theRequest[0];
    };

    //滚动触发固定顶部
    $(window).scroll(function(){
        var st = $(window).scrollTop();
        if(st>200){
            $('#auto_menu').addClass('fixed_menu');
        }else{
            $('#auto_menu').removeClass('fixed_menu');
        }
    });

    if(pageUrl()=='index'){
        
    }
})();