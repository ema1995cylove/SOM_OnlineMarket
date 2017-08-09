/**
 * Created by Lenovo on 2017/4/27.
 */
$(function(){
    var marketHomeUrl="marketHome.html";
    var sortWay=['默认','折扣','价格','销量'];
    var imgUrl=['/som/som/commodityList/images/moren.png',
                '/som/som/commodityList/images/jiage.png',
                '/som/som/commodityList/images/jiage.png',
                '/som/som/commodityList/images/jiage.png'];
    
    var currentFirstClass=0;
    var currentSecondClass=0;
    var type = 0;
    ajaxFirstClass();
    //ajax请求
    function ajaxFirstClass(){
        $.ajax({
            url:"/som/marketFirstClass/find.do",
            type:"post",
            dataType:"text",
            data:"",
            success:showFirstClass,
            error:function(data){
                alert("ajaxFirstClass请求失败！");
            }
        });
    }
    function ajaxSecondClass(){
        $.ajax({
            url:"/som/marketSecondClass/find.do",
            type:"post",
            dataType:"text",
            data:"",
            success:showSecondClass,
            error:function(data){
                alert("ajaxSecondClass请求失败！");
            }
        });
    }
    function ajaxCommodityList(){
        $.ajax({
            url:"/som/commodities/find1.do",
            type:"post",
            dataType:"text",
            data:{first_class_id:1},
            success:showCommodity,
            error:function(data){
                alert("ajaxCommodityList请求失败！");
            }
        });
    }

    function showFirstClass(data){              //显示商品类列表
        var jsonData = $.parseJSON(data);
        var typeCount=jsonData.length;

        addElementDiv('.middleLine','classification');
        addElementDiv('.middleLine','commodityList fl');
        addElementType('.classification','goods',typeCount,jsonData);
        addElementDiv('.classification','rightMenu');
        firstClassClick();

        ajaxSecondClass();
        ajaxCommodityList();
    }

    function showSecondClass(data){                 //显示商品小类列表
        var jsonData = $.parseJSON(data);
        showTypeList(jsonData);
        //secondClassClick();
    }

    function showCommodity(data){
        var jsonData = $.parseJSON(data);
        if(type == 0){
        	var typeCount=jsonData.firstList.length; 
        }else{
        	var typeCount = jsonData.sencondList.length;
        }
        //currentFirstClass = jsonData.firstList[0].commodity_first_class.first_class_id;

        $('.adLine').remove();
        $('.commodityList').empty();
        addElementDiv('.commodityList','choiceMessage');
        if(type == 0){
        	addFirstTypeName('.choiceMessage','f1',marketHomeUrl,'f2 fl',jsonData);
        }else{
        	addSecondTypeName('.choiceMessage','f1',marketHomeUrl,'f2 fl',jsonData);
        }
        addElementDiv('.choiceMessage','brand');
        addElementDiv('.brand','pinpai f1 fl');
        $('.pinpai').text('品牌:');
        addElementDiv('.brand','brandMenu fl f3');
        addBrand('.brandMenu',jsonData,typeCount);          //显示商品品牌
        addElementDiv('.choiceMessage','sort');
        addSort('.sort','fl sortMenu',sortWay,imgUrl);

        addElementDiv('.commodityList','commodityShow');            // 显示商品列表
        showCommodityList('.commodityShow','commodityMessage','f5',jsonData,'f2','f4',typeCount);
        aClick();
        
        commodityListEffect();

        addElementDiv('.commodityList','pageButton');           //翻页按钮
        addElementDiv('.pageButton','M-box3');
        
        addElementDiv('.middleLine','adLine fl');
        $('.adLine').text('招商电话: 1234567890');
        $('.adLine').html().replace(' ','<br/>');
    }

    //添加Div
    function addElementDiv(obj,newClass){
        var parent=$(obj);
        var ele=$('<div></div>');
        ele.appendTo(parent).addClass(newClass);
    }
    //添加商品大类列表
    function addElementType(obj,newClass,n,jsonData){
        var parent=$(obj);
        var ul = $('<ul></ul>');
        ul.appendTo(parent);

        for(var i=0;i<n;i++){
            var li = $('<li></li>');
            li.appendTo(ul).addClass(newClass).attr('id',jsonData[i].first_class_id);
            var a = $('<a></a>');
            a.appendTo(li).attr('href','#').text(jsonData[i].first_class_name);
        }
    }
    function firstClassClick(){
        $('.goods').click(function(){
            var  id =this.id;
            type = 0;

        	$.ajax({
        		url:"/som/commodities/find1.do",
                type:"post",
                dataType:"text",
                data:{first_class_id:id},
                success:showCommodity,
                error:function(data){
                    alert("firstClassClick请求失败！");
                }
            });
        });
    }

    //添加商品小类
    function addSecondClass(obj,jsonData,index){
        $(jsonData).each(function(item){
            if(this.market_first_class.first_class_id == index+1){
            	//console.log(index);
                var a = $('<a></a>');
                a.appendTo(obj).attr('href','#').text(this.second_class_name);
                a.attr('id',this.market_first_class.first_class_id);
                a.attr('alt',this.second_class_id);
            }
        });
    }
    function secondClassClick(){
        $('.rightMenu').children('a').click(function(){
        	type = 1;
        	
            var firstId = $(this).attr('id');
            var secondId = $(this).attr('alt');

            $.ajax({
            	url:"/som/commodities/find2.do",
                type:"post",
                dataType:"text",
                data:{first_class_id:firstId,second_class_id:secondId},
                success:showCommodity,
                error:function(data){
                    alert("secondClassClick请求失败！");
                }
            });
        });
    }

    //添加商品的当前种类
    function addFirstTypeName(obj,aClass,marketHomeUrl,spanClass,jsonData){
        var parent = $(obj);
        var a=$('<a></a>');
        var p1 = $('<span></span>');

        a.appendTo(parent).addClass(aClass).attr('href',marketHomeUrl).text('全部商品');
        p1.addClass('fl');p1.text('>');
        a.after(p1);
        var span = $('<span></span>');
        span.addClass(spanClass).appendTo(parent);
        span.text(jsonData.firstList[0].commodity_first_class.first_class_name);
    }
    
    function addSecondTypeName(obj,aClass,marketHomeUrl,spanClass,jsonData){
        if(jsonData.sencondList.length == 0){
        	alert("没有此类商品~~");
        	return ;
        }
        var parent = $(obj);
        var a=$('<a></a>');
        var p1 = $('<span></span>');
        var p2 = $('<p></p>');
        
        a.appendTo(parent).addClass(aClass).attr('href',marketHomeUrl).text('全部商品');
        p1.addClass('fl').text('>');
        p2.addClass('fl').text('>');
        a.after(p1);
        
        var span1 = $('<span></span>');
        span1.addClass(spanClass).appendTo(parent).text(jsonData.sencondList[0].commodity_first_class.first_class_name);
        span1.after(p2);
        var span2 = $('<span></span>');
        span2.addClass(spanClass).appendTo(parent).text(jsonData.sencondList[0].commodity_second_class.second_class_name);
            
    }
    //添加商品的品牌
    function addBrand(obj,jsonData,brandCount){
        var parent = $(obj);
        for(var i=0;i<brandCount;i++){
            var span = $('<span></span>');
            if(type == 0){
            	span.text(jsonData.firstList[i].commodity_brand).appendTo(parent);
            }else{
            	span.text(jsonData.sencondList[i].commodity_brand).appendTo(parent);
            }
        }
    }
    //添加显示时的排序方式
    function addSort(obj,spanClass,sortWay,imgUrl){
        var parent = $(obj);
        var p = $('<p></p>');
        var aSpan=[];
        p.addClass('fl').text('排序:').appendTo(parent);
        for(var i=0;i<4;i++){
            var span = $('<span></span>');
            var img = $('<img>');
            span.addClass(spanClass).text(sortWay[i]).appendTo(parent);
            aSpan[i]=span;
            img.attr('src',imgUrl[i]).appendTo(span);
        }
        aSpan[0].addClass('sortLive');
    }

    //显示商品
    function showCommodityList(obj,divClass,aClass,jsonData,
                                spanClass,btnClass,commodityCount){
        var parent = $(obj);
        for(var i=0;i<commodityCount;i++){
            addElementDiv(obj,divClass);
        }
        parent.children('div').each(function(item){
        	if(type == 0){
        		$(this).attr('id',jsonData.firstList[item].commodity_id);
            }else{
            	$(this).attr('id',jsonData.sencondList[item].commodity_id);
            }

            var a1 = $('<a></a>');
            a1.appendTo(this).attr('href','#');
            var img = $('<img>');
            if(type == 0){
            	img.attr("src",jsonData.firstList[item].commodity_picture0).appendTo(a1);
            }else{
            	img.attr("src",jsonData.sencondList[item].commodity_picture0).appendTo(a1);
            }
           
            var a2 = $('<a></a>');
            if(type == 0){
            	a2.appendTo(this).addClass(aClass).text(jsonData.firstList[item].commodity_name).append('<br/>');
            }else{
            	a2.appendTo(this).addClass(aClass).text(jsonData.sencondList[item].commodity_name).append('<br/>');
            }

            var span = $('<span></span>');
            if(type == 0){
            	span.addClass(spanClass).text('￥'+jsonData.firstList[item].commodity_price).after('<br>').appendTo(this);
            }else{
            	span.addClass(spanClass).text('￥'+jsonData.sencondList[item].commodity_price).after('<br>').appendTo(this);
            }
           
            var btn = $('<button></button>');
            btn.appendTo(this).text('加入购物车').addClass(btnClass);
        });
    }
    function aClick(){
        $('.commodityMessage').children('a').click(function(item){
           var id = this.parentElement.id;
           location.href = "/som/marketHome/toCommodityDetaild.do?commodityId="+ id;
            alert('商品详情页面，当前商品ID为'+id);
        });
        $('.commodityMessage').find('button').click(function(item){
            var id = this.parentElement.id;
            $.ajax({
    			url : "/som/userCart/add.do",
    			type : "POST",
    			data : {
    				"marketCommdityID":id,
    				"cartCommodityCount":1
    			},
    			success : function(data) {
    				if(data=="success"){
    					alert("添加成功");
    				}
    			},
    			error : function(data) {
    				alert("pre default");
    			}
    		});
        });
    }

    //翻页按钮
    function pageButton(obj,btnText){
        var parent = $(obj);
        for(var i=0;i<5;i++){
            var btn = $('<button></button>');
            btn.text(btnText[i]).appendTo(parent);
        }
    }

    //列表显示功能
    function showTypeList(jsonData){
        var aGood=$('.goods');
        var oMenu=$('.rightMenu');
        var timer=0;
        var k=0;

        aGood.each(function(item){
            this.onmouseover=function(){
                clearTimeout(timer);
                aGood.each(function(item){
                    this.className='goods';
                    oMenu.empty();
                });
                this.className='goods goods-bg';
                oMenu.css('display','block');
                if(item>4){
                    oMenu.css('top','333px');
                }else{
                    var changeTop=185+35*item;
                    oMenu.css('top',changeTop+"px");
                }
                addSecondClass(oMenu,jsonData,item);     //更换小类显示
                secondClassClick();
            };
        });

        aGood.each(function(item){
            this.onmouseout= function (){
            	k=item;
                this.className = 'goods';
                timer=setTimeout(function(){
                    oMenu.css('display','none');
                },1000);
            };
        });
        
        oMenu.mouseover(function(){
            clearTimeout(timer);
            oMenu.css('display','block');
            $(jsonData).each(function(item){
           		if(this.market_first_class.first_class_id - 1 == k){
                       aGood[k].className='goods goods-bg';
                }
           	});
        });

        oMenu.mouseout(function(){
            oMenu.css('display','none');
            aGood.each(function(item){
                this.className='goods';
            });
        });
    }

    function commodityListEffect(){
    	var oSortM=$('.sortMenu');
        var aCommodityList=$('.commodityMessage');
        //按排续选择商品
        oSortM.each(function(item){
            this.onclick=function(){
                oSortM.each(function(item){
                    this.className='fl sortMenu';
                });
                this.className='fl sortMenu sortLive';
            }
        });

        //商品列表
        aCommodityList.each(function(item){
            this.onmouseover=function(){
                aCommodityList.each(function(item){
                    this.className='commodityMessage';
                });
                this.className='commodityMessage commodityLive';
            };
            this.onmouseout=function(){
                this.className='commodityMessage';
            }
        });
    }
    
});