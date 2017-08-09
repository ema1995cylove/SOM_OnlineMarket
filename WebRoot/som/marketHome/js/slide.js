

$(function(){
    // 轮播图开始
    var left = $('.btnLeft');//获取左点击
    var right = $('.btnRight');//获取右点击
    var aSmall = $('.slideBtn');
    var aLi = $('.slide');
    var iNow = 0;
    // 左点击
    left.click(function(){
        iNow--;
        // 判断回流
        if(iNow<0){
            iNow=5;
        }
        aLi.eq(iNow).siblings().stop().animate({
            opacity:0
        },1000);
        aLi.eq(iNow).stop().animate({
            opacity:1
        },1000);
        aSmall.eq(iNow).addClass('btnActive').siblings().removeClass('btnActive');
    });
    // 右点击切换
    right.click(function(){
        iNow++;
        if(iNow>5){
            iNow=0;
        }
        aLi.eq(iNow).siblings().stop().animate({
            opacity:0
        },1000);
        aLi.eq(iNow).stop().animate({
            opacity:1
        },1000);
        aSmall.eq(iNow).addClass('btnActive').siblings().removeClass('btnActive');

    });
    //手动切换
    aSmall.mouseover(function(){
        var n = $(this).index();
//        var iNow = $(this).index();
//        alert(iNow);
        iNow = n;
        aLi.eq(iNow).siblings().stop().animate({
            opacity:0
        },1000);
        aLi.eq(iNow).stop().animate({
            opacity:1
        },1000);
        aSmall.eq(iNow).addClass('btnActive').siblings().removeClass('btnActive');

    });
    // 封装函数体
    function move1(){
        aLi.eq(iNow).siblings().stop().animate({
            opacity:0
        },1000);
        aLi.eq(iNow).stop().animate({
            opacity:1
        },1000);

        aSmall.eq(iNow).addClass('btnActive').siblings().removeClass('btnActive');
    }
    // 定个定时器的初始值
    function run2(){
        iNow++;
        if(iNow>5){
            iNow=0;
        }
        move1();
    }
// 定时器
    timer = setInterval(run2,800);
//当鼠标划入，停止轮播图切换
    $(".slideViewer").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(run2,800);
    });

    //左侧商品种类列表显示效果
    var aGood=$('.goods');

    for(var i=0;i<aGood.length;i++){
        aGood[i].index=i;
        aGood[i].onmouseover=function(){
            for(var k=0;k<aGood.length;k++){
                aGood[k].className='goods';
            }
            this.className='goods goods-bg';
        };
        aGood[i].onmouseout=function(){
            this.className='goods';
        }
    }
});