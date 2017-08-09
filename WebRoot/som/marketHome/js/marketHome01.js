/**
 * Created by Lenovo on 2017/4/23.
 */
$(function(){
     var urlImg=['/som/som/marketHome/images/slide1.png','../som/marketHome/images/slide2.png','../som/marketHome/images/slide3.png','../som/marketHome/images/slide4.png','../som/marketHome/images/slide5.png'];
    
     addElementDiv('.middleLine','classification');
    addElementDiv('.middleLine','hot');
    addElementDiv('.hot','slideViewer');
    addElementDiv('.slideViewer','common-da');
    addElementA('.common-da','common','btnLeft','btnRight');
    addElementDiv('.slideViewer','slide-group');
    addElementDiv('.slideViewer','slideButton');
    addElementRoll('.slide-group','slide',urlImg,'.slideButton','slideBtn');
    ajaxFirstClass();

    //初始化aJax
    function ajaxFirstClass(){
        $.ajax({
            url:"../../som/marketHome/firstClasses.do",
            type:"post",
            dataType:"json",
            success:showFirstClass,
            error:function(data){
                alert("ajaxFirstClass请求失败------"+data);
            }
        });
    }
    function ajaxHotCommodity(){
        $.ajax({
            url:"../../som/commodities/allCommoditys.do",
            type:"post",
            dataType:"json",
            success:showHotCommodity,
            error:function(data){
                alert("ajaxHotCommodity请求失败！");
            }
        });
    }

    function showFirstClass(data){
        var jsonData = data;
        var typeCount=jsonData.length;
        
        if(data == "error"){
        	alert(data);
        }
        
        addElementType('.classification','goods',typeCount,jsonData);
        goodsChange();
        $('.goods').click(function(){
        	var  id = this.id;
        	alert('当前大类ID为'+id);
        	location.href = "/som/marketHome/toCommodityList.do?confirstClassId="+id;
//        	$.ajax({
//                url:"url",
//                type:"post",
//                dataType:"json",
//                data:{first_class_id:id},
//                success:showHotCommodity,
//                error:function(data){
//                    alert("ajaxHotCommodity请求失败！");
//                }
//            });
        });
        
        ajaxHotCommodity();
    }
    
    function showHotCommodity(data){
    	var jsonData = data;
        
       addElementDiv('.hot','commodityViewer');
       addCommodity('.commodityViewer','commodity',jsonData,'f3','f1','f2',jsonData.length);
       aClick();
    }

        var adUrl='../som/marketHome/images/ad.png';
        addElementDiv('.middleLine','ad');
        addAd('.ad',adUrl);
    

    //添加Div
    function addElementDiv(obj,newClass,commmodityId,sign){
            var parent=$(obj);
            var ele=$('<div></div>');
            ele.appendTo(parent);
            ele.addClass(newClass);
            if(sign==="commodity")
            	ele.attr('id',commmodityId);
    }
    //添加商品种类列表
    function addElementType(obj,newClass,n,jsonData){
        var parent=$(obj);
        var ul = $('<ul></ul>');
        ul.appendTo(parent);

        for(var i=0;i<n;i++){
            var li = $('<li></li>');
            li.appendTo(ul);
            li.addClass(newClass);
            li.attr('id',jsonData[i].first_class_id);
            var a = $('<a></a>');
            a.appendTo(li);
            a.attr('href','#');
            //a.text(aMenu[i]);
            a.text(jsonData[i].first_class_name);
        }
    }

    //轮播图
    function addElementA(obj,newClass,class01,class02){
        var parent = $(obj);
        for(var i=0;i<2;i++){
            var a = $('<a></a>');
            a.addClass(newClass);
            a.attr('href','#');
            a.appendTo(parent);
        }
        parent.children().first().addClass(class01);
        parent.children().last().addClass(class02);
    }
    function addElementRoll(obj1,newClass1,urlImg,obj2,newClass2){
        var parent1=$(obj1);
        var parent2=$(obj2);
        for(var i=0;i<5;i++){
            var ele=$('<div></div>');
            ele.appendTo(parent1);
            ele.addClass(newClass1);

            var img = $('<img>');
            img.attr("src",urlImg[i]);
            img.appendTo(ele);

            var btn=$('<button></button>');
            btn.appendTo(parent2);
            btn.addClass(newClass2);
        }
    }

    //添加热门商品
    function addCommodity(obj,newClass,jsonData,aClass,spanClass,btnClass,commodityCount){
    	//addCommodity('.commodityViewer','commodity',jsonData,'f3','f1','f2',4);
        var parent = $(obj);
        var con = commodityCount>4?4:commodityCount; 
        for(var i=0;i<con ;i++){
            addElementDiv(obj,newClass,jsonData[i].commodity_id,"commodity");
        }
        parent.children('div').each(function(item){
            var a1 = $('<a></a>');
            a1.appendTo(this);
            a1.attr('href','#');
            var img = $('<img>');
            img.attr('src',jsonData[item].commodity_picture0);  
            img.appendTo(a1);

            var a2 = $('<a></a>');
            a2.appendTo(this);
            a2.addClass(aClass);
            a2.text(jsonData[item].commodity_name).attr('href','#');

            var aSpan=[];
            for(var i=0;i<2;i++){
                var span = $('<span></span>');
                span.addClass(spanClass);
                span.appendTo(this);
                aSpan[i]=span;
            }
            aSpan[0].text('￥'+jsonData[item].commodity_price);
            aSpan[1].text('优惠价:￥'+jsonData[item].commodity_vip_price);
            aSpan[0].after('<br>');

            var btn = $('<button></button>');
            btn.appendTo(this);
            btn.addClass(btnClass);
            btn.text('加入购物车');
        });
    }

    //添加右侧广告条
     function addAd(obj,adUrl){
         var parent = $(obj);
         var img = $('<img>');
         img.attr("src",adUrl);
         img.appendTo(parent);
     }
     
     function goodsChange(){
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
             };
         } 
     };

     var commodityId;
     function toLogin(loginHref) {
    		if(loginHref.path != "hasLogin"){
    			location.href = loginHref.path;
    		}else{
    			$.ajax({
    				url : "/som/userCart/add.do",
    				type : "POST",
    				data : {
    					"marketCommdityID":commodityId,
    					"cartCommodityCount":1
    				},
    				success:function(){
    	            	alert("添加成功");
    	            },
    				error : function(data) {
    					alert("pre default");
    				}
    			});
    		}
    	}
     
     function aClick(){
    	 var a = $('.commodity').find('a').each(function(index,elem){
    		 $(this).on("click",function(){
    			 var myId = $(this).parent().attr("id");
        		 location.href = "/som/marketHome/toCommodityDetaild.do?commodityId="+ myId; 
    		 });
    	 });
    	 $('.commodity').find('button').click(function(item){
    		 commodityId = $(this).parent().attr("id");
    		 console.log(commodityId);
    		 var pre = "/som/home/toMarketHome.do?marketId="+marketId;
			// 校验登录
			$.ajax({
				url : "/som/check/checkLogin.do",
				type : "POST",
				dataType : "json",
				data : {"pre":pre},
				success : toLogin,
				error : function(data) {
					alert("login default");
				}
			});
    	 });
     }
});

//解析并获取URL的参数
function getQueryString(name) { // name为传入参数
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
//上一个页面的名字，不带.HTML
var marketId = getQueryString("marketId");