/**
 * Created by Lenovo on 2017/3/29.
 */
window.onload=function(){
    var aGood=document.getElementsByClassName('goods');

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
};