

$(function(){
    // �ֲ�ͼ��ʼ
    var left = $('.btnLeft');//��ȡ����
    var right = $('.btnRight');//��ȡ�ҵ��
    var aSmall = $('.slideBtn');
    var aLi = $('.slide');
    var iNow = 0;
    // ����
    left.click(function(){
        iNow--;
        // �жϻ���
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
    // �ҵ���л�
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
    //�ֶ��л�
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
    // ��װ������
    function move1(){
        aLi.eq(iNow).siblings().stop().animate({
            opacity:0
        },1000);
        aLi.eq(iNow).stop().animate({
            opacity:1
        },1000);

        aSmall.eq(iNow).addClass('btnActive').siblings().removeClass('btnActive');
    }
    // ������ʱ���ĳ�ʼֵ
    function run2(){
        iNow++;
        if(iNow>5){
            iNow=0;
        }
        move1();
    }
// ��ʱ��
    timer = setInterval(run2,800);
//����껮�룬ֹͣ�ֲ�ͼ�л�
    $(".slideViewer").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(run2,800);
    });

    //�����Ʒ�����б���ʾЧ��
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