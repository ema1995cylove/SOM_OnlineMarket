/**
 * Created by Lenovo on 2017/3/31.
 */
window.onload=function(){
    var oShift=document.getElementsByClassName('shift');
    var oSm=document.getElementsByClassName('shopMenu');
    var timer=0;

    oShift[0].onmouseover=function(){
        oSm[0].className='shopMenu live2';
    };
    oShift[0].onmouseout=function(){
        timer=setTimeout(function(){
            oSm[0].className = 'shopMenu';
        },1000);
    };
    oSm[0].onmouseover=function(){
        clearTimeout(timer);
        oSm[0].className='shopMenu live2';
    };
    oSm[0].onmouseout=function(){
        oSm[0].className = 'shopMenu';
    };
};