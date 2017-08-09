/**
 * Created by Lenovo on 2017/4/30.
 */
$(function(){
    var telephone='1234567890';
    var style = '均码';

    ajaxUserMessage();
    //初始化aJax
    function ajaxUserMessage(){
        $.ajax({
            url:"/som/account/find.do",
            type:"post",
            dataType:"text",
            data:{oderId:1},
            success:showUserMessage,
            error:function(data){
                alert("ajaxUserMessage请求失败！");
            }
        });
    }

    function showUserMessage(data){
        var jsonData = $.parseJSON(data);

        addElementDiv('.middleLine','baseMessage f1');      //添加收货信息
        userMessage('.baseMessage',jsonData,telephone,'modify','address');
        $('.choice').click(function(){
        	var addressCount = 0;
        	if($(this).index()==2){
        		addressCount = $(this).index()-1;
        	}else{
        		addressCount = $(this).index();
        	}
        	
            $('.address').text('收货地址:'+jsonData[0].user.userAddresses[addressCount].user_province.province_name+
            		jsonData[0].user.userAddresses[addressCount].user_city.city_name+
            		jsonData[0].user.userAddresses[addressCount].user_contry.contry_name+
            		jsonData[0].user.userAddresses[addressCount].user_detailAddress);
        });
        $('.modify').click(function(){
            alert('跳转至用户信息界面');
        });
        
        showOrderMessage(jsonData);                //显示订单商品信息
    }

    function showOrderMessage(jsonData){
    	var count = jsonData.length;
        var line2 = $('<hr style="width: 90%;color: #666666;">');
        line2.appendTo($('.middleLine'));
        
        var nothing = $('<div></div>');
        nothing.addClass('nothing').text('什么都没有了呀！');

        addElementDiv('.middleLine','orderMessage');        //添加订单信息
        orderMessage('.orderMessage',count,'market',jsonData,style);
        var line3 = $('<hr style="width: 90%;color: #666666;">');
        line3.appendTo($('.middleLine'));

        var totalPrice = 0;
        $(jsonData[0].orderDetailed).each(function(item){
            totalPrice += jsonData[0].orderDetailed[item].orderCommodity.commodity_price;
        });
        addElementDiv('.middleLine','account');     //结算按钮及备注框
        addAccount('.account',totalPrice);

        $('.delete').click(function(){
        	var id = "";
            $('body').dailog({
                type:'default',
                title:'提示！',
                discription:'您确认要取消订单吗？',
                hideScroll:true,
                isInput:false},function(ret) {
                if(ret.index===0){
                    for(var i=0;i<count;i++){
                        id = id+jsonData[i].oderId+' ';
                    }
                    $.ajax({
                        url:"/som/account/deleteAll.do",
                        type:"post",
                        dataType:"text",
                        data:{oderId:id},
                        success:function(data) {
                        	$('.orderMessage').empty().appendTo('nothing');
                        	$('.totalPrice').text('合计:'+'0.00');
                        },
                        error:function(data){
                            alert("order_id请求失败！");
                        }
                    });
                }
            });
        });

        $('.sum').click(function(){
        	alert('向后台发送所有订单的确认信息，并跳转至支付页面！');
        });
        
        $('.cancel').on('click',function(){
        	$this = $(this);
            $('body').dailog({
                type:'default',
                title:'提示！',
                discription:'您确认要删除商品吗？',
                hideScroll:true,
                isInput:false},function(ret) {
                if(ret.index===0){
                    var id =  $this.parents(".order").attr('id');
                    var alt = $this.parents(".order").attr('alt');
                    
                    $this.parents(" .order").slideUp().remove();
                    $(jsonData[0].orderDetailed).each(function(item){
                        totalPrice += jsonData[0].orderDetailed[item].orderCommodity.commodity_price;
                    });
                    $('.totalPrice').text('合计:'+'￥'+totalPrice.toFixed(2));
                    
                    if($('.order').length == 0){
                        $('.orderMessage').empty();
                        $('.orderMessage').append(nothing);
                        var shopping = $('<button></button>');
                        shopping.text('现在去购物').appendTo(nothing);
                        shopping.click(function(){
                        	alert('跳转至超市首页！');
                        });
                    }
                    $('.totalPrice').text('合计:'+'0.00');
                    $.ajax({
                        url:"/som/account/deleteOne.do",
                        type:"post",
                        dataType:"text",
                        data:{id:alt},
                        success:function(data) {
                        	$this.parents(" .order").slideUp().remove();
                        },
                        error:function(data){
                            alert("ajaxOrderMessage请求失败！");
                        }
                    });
                }
            });
        });
    };

    //添加Div
    function addElementDiv(obj,newClass){
        var parent=$(obj);
        var ele=$('<div></div>');
        ele.appendTo(parent);
        ele.addClass(newClass);
    }
    //添加收货信息
    function userMessage(obj,jsonData,telephone,buttonClass,address){
        var parent = $(obj);
        var aSpan = [];
        for(var i=0;i<2;i++){
            var span = $('<span></span>');
            span.appendTo(parent);
            aSpan[i]=span;
        }
        aSpan[0].text('收货人:'+jsonData[0].user.userName).after('<br>');
        aSpan[1].addClass(address).text('收货地址:'+jsonData[0].user.userAddresses[0].user_province.province_name+
            jsonData[0].user.userAddresses[0].user_city.city_name+
            jsonData[0].user.userAddresses[0].user_contry.contry_name+
            jsonData[0].user.userAddresses[0].user_detailAddress).after('<br>');
        var form = $('<form></form>');
        var singleChoice=[];
        form.appendTo(parent);
        for(var i=0;i<jsonData[0].user.userAddresses.length;i++){
            var input = $('<input>');
            input.appendTo(form).attr('type','radio').attr('name','address').addClass('choice');
            input.val(i).after(jsonData[0].user.userAddresses[i].user_province.province_name+
                jsonData[0].user.userAddresses[i].user_city.city_name+
                jsonData[0].user.userAddresses[i].user_contry.contry_name+
                jsonData[0].user.userAddresses[i].user_detailAddress+'<br>');
            singleChoice[i] = input;
        }
        singleChoice[0].attr('checked','checked');
        var span2 = $('<span></span>');
        span2.appendTo(parent).text('联系方式:'+telephone);

        var btn = $('<button></button>');
        btn.text('更改收货信息').appendTo(parent).addClass(buttonClass);
    }

    //添加订单信息
    function orderMessage(obj,marketCount,newClass,jsonData,style){
        var parent = $(obj);
        for(var i=0;i<marketCount;i++){
            addElementDiv(obj,newClass);
        }
        parent.children('div').each(function(item){
            var div = $('<div></div>');
            div.appendTo(this).addClass('marketName').text(jsonData[item].marketBaseInfamation.market_name);

            var divA = [];
            for(var i=0;i<jsonData[item].orderDetailed.length;i++){
                var com = $('<div></div>');
                com.appendTo(this).addClass('order f2').attr('id',jsonData[item].orderDetailed[i].orderCommodity.commodity_id);
                com.attr('alt',jsonData[item].orderDetailed[i].id);
                divA[i] = com;

                var a1 = $('<a></a>');
                a1.appendTo(divA[i]).attr('href','#');
                var img = $('<img>');
                img.appendTo(a1).attr("src",'/som/som/account/images/'+jsonData[item].orderDetailed[i].orderCommodity.commodity_picture0).addClass('fl');

                var aDiv=[];
                for(var j=0;j<4;j++){
                    var div0 = $('<div></div>');
                    div0.appendTo(divA[i]).addClass('fl m');
                    aDiv[j]=div0;
                }
                aDiv[0].addClass('orderName');
                aDiv[1].addClass('orderStyle');
                aDiv[2].addClass('count').text('数量:'+jsonData[item].orderDetailed[i].orderCommodityCount+'件');
                aDiv[3].addClass('price').text('￥'+jsonData[item].orderDetailed[i].orderCommodity.commodity_price);

                var a2 = $('<a></a>');
                a2.appendTo(aDiv[0]).attr('href','#').text(jsonData[0].orderDetailed[i].orderCommodity.commodity_name);
                var span = $('<span></span>').appendTo(aDiv[1]).text('尺码:'+style);

                var btn = $('<button></button>');
                btn.appendTo(divA[i]).addClass('cancel dw-btn btn-danger has-hover').text('删除');
            }
        });
    }

    //备注及结算
    function addAccount(obj,totalPrice){
        var parent = $(obj);
        var text=$('<textarea class="fl" placeholder="备注:"></textarea>').appendTo(parent);
        var span = $('<span></span>');
        var btn1 = $('<button></button>');
        var btn2 =$('<button></button>');
        addElementDiv(obj,'totalPrice fl f3');
        span.text('￥'+totalPrice.toFixed(2));
        $('.totalPrice').text('合计:'+span.text());
        btn2.appendTo(parent).addClass('sum f4').text('结算');
        btn1.appendTo(parent).addClass('delete f4').text('取消订单');     
    }
});