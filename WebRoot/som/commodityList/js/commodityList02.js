$(function(){
    var aGood=$('.goods');
    var oSortM=$('.sortMenu');
    var aCommodityList=$('.commodityMessage');
    var aMenu=['女装','鞋靴','童装玩具','家电','美妆','珠宝','运动','游戏','美食','鲜花','房产','家具','汽车','办公','百货','学习'];
    var oMenu=$('.rightMenu');
    var timer=0;

    //左侧商品列表
    //alert(aGood.length);
    for(var i=0;i<aGood.length;i++){
        aGood[i].index=i;
        aGood[i].onmouseover=function(){
            clearTimeout(timer);
            for(var k=0;k<aGood.length;k++){
                aGood[k].className='goods';
                //oMenu.innerHTML='';
            }
            this.className='goods goods-bg';
            oMenu.style.display='block';
            if(this.index>10){
                oMenu.style.top=542+'px';
            }else{
                oMenu.style.top=185+35*this.index+'px';
            }
            oMenu.innerHTML=aMenu[this.index];
        };
    }

    for(var j=0;j<aGood.length;j++){
        aGood[j].onmouseout= function (){
            this.className = 'goods';
            timer=setTimeout(function(){
                oMenu.style.display='none';
            },1000);
        };
    }
    oMenu.onmouseover=function(){
        clearTimeout(timer);
        oMenu.style.display='block';
        for(var i=0;i<aGood.length;i++){
            if(oMenu.innerHTML==aMenu[i]){
                aGood[i].className='goods goods-bg';
            }
        }
    };
    oMenu.onmouseout=function(){
        oMenu.style.display='none';
        for(var i=0;i<aGood.length;i++){
            aGood[i].className='goods';
        }
    };

    //按排续选择商品
    for(var i=0;i<oSortM.length;i++){
        oSortM[i].index=i;
        oSortM[i].onclick=function(){
            for(var k=0;k<oSortM.length;k++){
                oSortM[k].className='fl sortMenu';
            }
            this.className='fl sortMenu sortLive';
        };
    }

    //商品列表
    for(var i=0;i<aCommodityList.length;i++){
        aCommodityList[i].index=i;
        aCommodityList[i].onmouseover=function(){
            for(var k=0;k<aCommodityList.length;k++){
                aCommodityList[k].className='commodityMessage';
            }
            this.className='commodityMessage commodityLive';
        };
        aCommodityList[i].onmouseout=function(){
            this.className='commodityMessage';
        };
    }
});