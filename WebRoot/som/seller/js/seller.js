/**
 * Created by hp on 2017/5/24.
 */
var is_cilck=false;

//check login
$.ajax({
    type : "post",
    url : "/som/check/checkLogin.do",
    data:{"pre":"shopseller.html"},
    dataType:"json",
    success : function(data){
    	if(data.path != "hasLogin"){
    		location.href = data.path;
    	}else{
			if(data.power != 1){
				location.href = "/som/index.html";
			}else{
				show_one();
			}
    	}
    }
});

$(".good").click(function(){
   if(is_cilck==false){
       $(".ul_list").slideDown();
       is_cilck=true;
   }
    else{
       $(".ul_list").slideUp();
       is_cilck=false;
   }

});
//超市信息top
$(".top").click(function(){
    all();
    $(".top_right").css("display","block");
    show_one();
});
//基本信息
$(".basic").click(function(){
    all();
    $(".first").css("display","block");
    show_selfinfo();
});

//收款方式
$(".sell_way").click(function(){
    all();
    $(".seven").css("display","block");
});
//会员管理6
$(".controll_user").click(function(){
    all();
    $(".six").css("display","block");
    show_six();
});
//订单管理5
$(".controll_order").click(function(){
    all();
    $(".five").css("display","block");
    show_five();
});
//大分类2
$(".select_one").click(function() {
    all();
    $(".second").css("display", "block");
    show_second();
});
//小分类3
$(".select_two").click(function() {
    all();
    $(".third").css("display", "block");
    show_smallcategory();
});
//商品管理4
$(".select_three").click(function() {
    all();
    $(".four").css("display", "block");
    show_good();
});
//整体收起来
function all(){
    $(".top_right").css("display","none");
    $(".first").css("display","none");
    $(".second").css("display", "none");
    $(".third").css("display", "none");
    $(".four").css("display", "none");
    $(".five").css("display","none");
    $(".six").css("display","none");
    $(".seven").css("display","none");

}
//清空
function clean_one(object){
    object.val("");
}
function clean_two(object,i){
    object.eq(i).val("");
}
//修改密码
$(".btn_pass").click(function(){
    $(".change_password").css("display","block");
});
//取消修改
$(".cancel_c1").click(function(){
    $("#oldPassword").val("");
    $("#newPassword").val("");
    $("#repeatPassword").val("");
    $(".change_password").css("display","none");
});
$("input:password").on('blur', function() {
    var newPassword = $("#newPassword").val();
    var repeatPassword = $("#repeatPassword").val();
    var len = $(this).val().length;
    if(len < 6){
        $(this).siblings('.minPassword').show();
        $(this).siblings('.maxPassword').hide();
    }else if(len > 20){
        $(this).siblings('.maxPassword').show();
        $(this).siblings('.minPassword').hide();
    }else{
        $(this).siblings('.minPassword').hide();
        $(this).siblings('.maxPassword').hide();
        if(!repeatPassword){
            $("#differentPassword").hide();
        }else  if(!(newPassword == repeatPassword))
            $("#differentPassword").show();
        else
            $("#differentPassword").hide();
    }
});
//确定修改密码
$(".sure_c1").click(function(){
    var pass_new=$("#repeatPassword").val();
    var pass=$("#oldPassword").val();
    var uid = market_data.user.accountId;
    $.ajax({
        type : "post",
        url : "/som/mbia/editBasicPwd.do",
        data : {
        	userid:uid,
        	accountPassword:pass,
        	newPwd:pass_new
        },
        success : function(data){
            //重新登录
        	if(data == "pwdError"){
        		alert("原密码错误");
        	}else{
        		alert("success");
	        	clean_one($("#repeatPassword"));
	        	clean_one($("#oldPassword"));
	        	clean_one($("#newPassword"));
	        	$(".change_password").css("display","none");
        	}
        }
    });
});
//添加大分类
$(".add_pic").click(function(){
    $(".add_category").css("display","block");
});
$(".add_add").click(function(){
    $(".add_category").css("display","block");
});
//添加小分类函数
function add_small_category_click(){
    var v = $("#third_small_category").val();
    if(v >= 0){
        $(".add_category1").css("display","block");
    }else{
        alert("先选择大类~");
    }
}
//添加小分类
$(".add_pic1").click(add_small_category_click);
$(".add_add1").click(add_small_category_click);
//取消添加
$(".cancel").click(function(){
    $(".add_category").css("display","none");
});
$(".cancel1").click(function(){
    $(".add_category1").css("display","none");
});
//添加商品
$(".four_pic").click(add_good_click);
$("#four_a").click(add_good_click);
function add_good_click(){
    var v = $("#four_se").val();
    if(v >= 0){
        $(".f_right").css("display","block");
    }else{
        alert("先选择商品分类~");
    }
}
//取消添加
$(".cancel3").click(function(){
    $(".f_right").css("display","none");
});
//得到超市数据
var market_data;
//top数据
//申请数据会员信息
var vip_customer;
    function show_six(){
        $(".six_table").remove();
        vip_customer="";
        var tab=$("<table class='six_table'><tr class='user_first'>" +
            "<td >序号</td> " +
            "<td>用户号</td>" +
            "<td>会员名</td> " +
            "<td>操作</td> </tr> </table>");
        //实际
        $.ajax({
            type : "post",
            // 获取数据的端口
            url : "/som/mbia/marketVipUserFind.do",
            data : {
                //上传数据
                market_id:market_data.market.market_id
            },
            dataType : "json",
            success : function(data){
                var info=data[0].vipUser;
                vip_customer=info;
                for(var i=0;i<info.length;i++){
                    var user=i+1;
                    var data_tr=$("<tr>" +
                        "<td >"+user+"</td>" +
                        "<td>"+info[i].accountNumber+"</td>" +
                        "<td>"+info[i].userName+"</td>" +
                        "<td><button class='del_u'>删除</button></td> </tr>");
                    tab.append(data_tr);

                }
                $(".sm_user").append(tab);
                $(".del_u").bind("click",six_del);
            }
        });
    }
//会员删除
    function six_del(){
        var id =  $(".del_u").index(this);
        var index= vip_customer[id].accountNumber;
        $.ajax({
            type : "post",
            url : "/som/mbia/marketVipUserDelete.do",
            data : {
                market_id:market_data.market.market_id,
                accountNumber:index
            },
            success : function(data) {
            	if(data== "success"){
            		show_six();
            	}else if (data == "nouser"){
            		alert("用户不存在或者用户已删除~");
            	}else{
            		alert("超市出错~");
            	}
            }
        });
    }
//会员添加信息
    $(".sure_vip").click(function(){
    	var reg = /^1[34578][0-9]{9}/;
        var info=$(".user_addn").val();
        if (!reg.test(info)){
            $(".user_addn").val("请输入正确的电话号码!");
            $(".user_addn").focus(function(){
                $(".user_addn").val("");
            });
            return;
        }
        $.ajax({
            type : "post",
            url : "/som/mbia/marketVipUserAdd.do",
            data : {
                market_id:market_data.market.market_id,
                accountNumber:info
            },
            success : function(data) {
                clean_one($(".user_addn"));
            	if(data == "nouser"){
            		alert("用户未注册~");
            	}else if(data=="hasVipUser"){
            		alert("该用户已经是会员了~");
            	}else{
            		show_six();
            	}
            }
        });
    });
        
    
//订单管理
    function show_five(){
        //正式
        $(".five_partb").remove();
        var body=$("<div class='five_partb'></div>");
       $.ajax({
            type : "post",
            url : "/som/mbia/marketOrderFind.do",
            //数据
            data : {"marketId":market_data.market.market_id},
            dataType:"json",
            success : function(data) {
                for(var i=0;i<data.length;i++){
                    var total_price=0;
                    var order=data[i];
                    var year = order.orderDate.year+1900;
                    var month =  order.orderDate.month+1;
                    var day =  order.orderDate.date;
                    var tab=$("<table class='five_table'>" +
                        "<tr style='background-color:#F9F9F9'> " +
                        "<td colspan='4' style='height: 35px;line-height: 35px;border-left: 2px solid  #F10180'> " +
                        "<div class='order_num'> <span>订单号：</span>" +
                        "<div class='num_or'>"+order.orderCode+"</div></div> " +
                        "<div class='order_user'> <span>收货人：</span>" +
                        "<div class='num_user'>"+order.user.accountNumber+"</div> </div>" +
                        " <div class='order_time'> <span>下单时间：</span>" +
                        "<div class='num_time'>"+year+"-"+month+"-"+day+"</div>" +
                        "</div> <div class='order_total'><span>订单总额：￥</span>" +
                        "<div class='price_total'></div> </div></td> </tr></table>");
                    for(var j=0;j<order.orderDetailed.length;j++){
                    	var detail = order.orderDetailed[j];
                    	var commodity = detail.orderCommodity;
                        var pic=commodity.commodity_picture0;
                        var name=commodity.commodity_name;
                        var price=commodity.commodity_price*detail.orderCommodityCount;
                        total_price+=price;
                        var five_tr;
                        if(j==0){
                             five_tr=$("<tr> <td style='width: 50%'>" +
                                "<div class='fivet_pic'>" +
                                "<img src='"+pic+"'></div>" +
                                " <div class='five_info'>"+name+" </div> </td>" +
                                " <td style='width: 16%'> <span>￥</span>"+price+" </td> " +
                                "<td style='width: 16%' rowspan='"+order.orderDetailed.length+"' class='situation'>已完成</td> </tr>");
                        }
                        else{
                             five_tr=$("<tr> <td style='width: 50%'>" +
                                "<div class='fivet_pic'>" +
                                "<img src='"+pic+"'></div>" +
                                " <div class='five_info'>"+name+" </div> </td>" +
                                " <td style='width: 16%'> <span>￥</span>"+price+" </td></tr>");
                        }
                        tab.append(five_tr);
                    }
                    body.append(tab);
                    $(".five_part").append(body);
                    $(".price_total").eq(i).html(total_price);
                }
            }
        });
    }
//top首页
    function show_one(){
        $("#market_logo").remove();
        market_data="";
        $.ajax({
            type : "post",
            url : "/som/mbia/basicInfo.do",
            dataType : "json",
            success : function(data) {
                market_data=data;
                var address = data.market.market_address;
                var add=address.marketAddress_province.province_name+address.marketAddress_city.city_name+address.marketAddress_contry.contry_name+address.marketAddress_detailed;
                var pic=$("<img id='market_logo' style='width:100%;height:100%'src='"+data.market.market_logo +"'>");
                $(".info_pic").append(pic);
                $(".s_name").html(data.market.market_name);
                $(".s_address").html(add);
            }
        });
    }
//修改大类
    function market1_change(){
        var index = $(".cat_change").index(this) ;
        $(".change_info").eq(index).css("display", "block");
    }
//取消修改
    function cancel_c2(){
        var index = $(".cancel_c2").index(this) ;
        $(".change_info").eq(index).css("display", "none");
    }
//完成修改
    function sure_c2(){
    var index = $(".sure_c2").index(this) ;
    var id=second_data[index].first_class_id;
    var info=$(".input_firstm").eq(index).val();
    if (info==""){
        $(".input_firstm").val("请输入大类的名称!")
                .focus(function(){
                    $(this).val("");
                });
            return;
     }
    $(".change_info").eq(index).css("display", "none");
    $.ajax({
        type : "post",
        url : "/som/mbia/marketFirstSE.do",
        data : {
        	"first_class_name":info,
        	"first_class_id":id,
        	market_id:market_data.market.market_id,
        	flag:"update"
        },
        dataType:"json",
        success : function(data) {
            clean_two($(".input_firstm"),index);
        	if(data.msg=="hasFirstClass"){
	    		alert("hasFirstClass");
	    	}else{
	    		show_second();
	    	}
        }
    });
}
//删除大类
function del_2(){
        var index = $(".cat_del").index(this) ;
        var info=second_data[index].first_class_name;
        var mfcid=second_data[index].first_class_id;
        $.ajax({
            type : "post",
            url : "/som/mbia/marketFirstSE.do",
            data : {
            	"first_class_name":info,
            	"first_class_id":mfcid,
            	market_id:market_data.market.market_id,
            	flag:"delete"
            },
            dataType:"json",
            success : function(data) {
            	if(data.msg=="firstNotExits"){
            		alert("firstNotExits");
            	}else{
            		show_second();
            	}
            }
        });
    }
//大分类
var second_data;
function show_second(){
        second_data="";
        $(".sm_body").remove();
        $(".add_category").css("display","none");
        var mid_body=$("<div class='sm_body'></div>");
        //正式
        $.ajax({
            type : "post",
            url : "/som/mbia/marketFirstFind.do",
            data : {market_id:market_data.market.market_id},
            dataType:"json",
            success : function(data) {
                second_data=data.market_first;
                $(".cat_pic_bottom").empty();
                $(".cat_right_bottom").empty();
                var market_name=market_data.market.market_name;
                var market_logo=market_data.market.market_logo;
                var  market_first=data.market_first;
                $(".cat_pic_bottom").append($("<img src='"+market_logo+"'>"));
                $(".cat_right_bottom").html(market_name);
                //显示数据
                for(var i=0;i<market_first.length;i++){
                    var category=$("<div class='category'>" +
                        " <div class='cat_way'>" +
                        "<div class='cat_pic'>" +
                        "<img src='"+market_logo+"'>" +
                        "</div> <div class='cat_right'>"+market_name+"</div> </div>" +
                        " <div class='cat_mid'>"+market_first[i].first_class_name+"</div> " +
                        "<div class='cat_bottom'> " +
                        "<div class='change_info'> <input placeholder='请输入新的类名' class='input_firstm'> " +
                        "<div class='sure_no'> <div class='sure_c2'>√</div>" +
                        " <div class='cancel_c2'>×</div> </div> </div> " +
                        "<div class='cat_change'>修改 </div>" +
                        " <div class='cat_del'>删除 </div> </div> </div>");
                    mid_body.append(category);
                }
                $(".second_mid").append(mid_body);
                $(".cat_change").bind("click",market1_change);
                $(".cancel_c2").bind("click",cancel_c2);
                $(".sure_c2").bind("click",sure_c2);
                $(".cat_del").bind("click",del_2);
            }
        });
    }
//确认添加大类
$(".sure_a2").click(function(){
    var info=$("#add_market1").val();
    if (info==""){
        $("#add_market1").val("请输入大类的名称!")
            .focus(function(){
                $(this).val("");
            });
        return;
    }
    var flag = "add";
    $.ajax({
        type : "post",
        url : "/som/mbia/marketFirstSE.do",
        data : {
        	first_class_name:info,
        	market_id:market_data.market.market_id,
        	"flag":flag
        },
        dataType:"json",
        success : function(data) {
            clean_one($("#add_market1"));
        	if(data.msg=="hasFirstClass"){
        		alert("hasFirstClass");
        	}else{
        		show_second();
        	}
        },
        error:function(e){
        	console.log(e);
        	console.log(e.responseText);
        	alert("s:"+e);
        }
    });

});
//小分类开始
function show_smallcategory(){
    $(".cat_pic_bottom").empty();
    $(".cat_right_bottom").empty();
    $(".third_mid_body").remove();
    $(".add_category1").css("display","none");
    var market_name=market_data.market.market_name;
    var market_logo=market_data.market.market_logo;
    $(".cat_pic_bottom").append($("<img src='"+market_logo+"'>"));
    $(".cat_right_bottom").html(market_name);
    $.ajax({
        type : "post",
        url : "/som/mbia/marketFirstFind.do",
        data : {"market_id":market_data.market.market_id},
        dataType:"json",
        success : function(data) {
            var market_first=data.market_first;
            var id_name="third_small_category";
            var firstline=$("<option>--请选择大分类--</option>");
            new_option(market_first,id_name,firstline);
        }
    });
}
//新建option
function new_option(info,id_name,firstline){
    $("#"+id_name).empty();
    $("#"+id_name).append(firstline);
    var first_info=firstline.text();
    if(first_info=='--请选择大分类--'){
        for(var i=0;i<info.length;i++){
            $("#"+id_name).append($("<option>",
                {value :info[i].first_class_id})
                .text(info[i].first_class_name));
        }
    }
    else{
        for(var i=0;i<info.length;i++){
            $("#"+id_name).append($("<option>",
                {value :info[i].second_class_id})
                .text(info[i].second_class_name));
        }
    }

}
//类改变

$("#third_small_category").change(function(){
	 var id=$("#third_small_category option:selected").val();
    if(id =='--请选择大分类--'){
        $(".third_mid").empty();
    }else{
        third_small_category(id);  //因为这两个请求的返回函数不一样
    }
});
$("#four_fi").change(function(){
	var id=$("#four_fi option:selected").val();
    if(id =='--请选择大分类--'){
    	$(".four_mid").empty();
    }else{
    	four_small_category(id);  //因为这两个请求的返回函数不一样
    }
});
$("#four_se").change(function(){
	var id=$("#four_se option:selected").val();
    if(id =='--请选择小分类--'){
        $(".four_mid").empty();
    }else{
        four_good(id);  //因为这两个请求的返回函数不一样
    }
});
//小类产生在小类页面里
var third_data;
function third_small_category(id){
    $(".third_mid_body").remove();
    third_data="";
    var body=$("<div class='third_mid_body'></div>");
    $.ajax({
        type : "post",
        url : "/som/mbia/marketSecondFind.do",
        data : {"first_class_id":id},
        dataType:"json",
        success : function(data) {
            third_data=data.secondClasses;
            var market_name=market_data.market.market_name;
            var market_logo=market_data.market.market_logo;
            var second_class=data.secondClasses;
	        for(var i=0;i<second_class.length;i++){
	        	var data_info=second_class[i].second_class_name;
		        var cate=$("<div class='family'> <div class='fam_way'>" +
		            " <div class='fam_pic'>" +
		            "<img src='"+market_logo+"'></div> " +
		            "<div class='fam_right'>"+market_name+"</div> </div>" +
		            " <div class='fam_mid'>"+data_info+"</div> " +
		            "<div class='fam_bottom'> <div class='change_fam'> " +
		            "<input class='new_market_second' placeholder='请输入新的类名'> " +
		            "<div class='sure_or'> <div class='sure_c3'>√</div>" +
		            " <div class='cancel_c3'>×</div> </div> </div> " +
		            "<div class='fam_change'>修改 </div> <div class='fam_del'>删除 </div> </div></div>");
		            body.append(cate);
	        }
            $(".third_mid").append(body);
            $(".fam_change").bind("click",market2_change);
            $(".cancel_c3").bind("click",cancel_c3);
            $(".sure_c3").bind("click",sure_c3);
            $(".fam_del").bind("click",fam_del);
        }
    });
}
//修改小类
function market2_change(){
    var index = $(".fam_change").index(this) ;
    $(".change_fam").eq(index).css("display", "block");
}
//取消修改
function cancel_c3(){
    var index = $(".cancel_c3").index(this) ;
    $(".change_fam").eq(index).css("display", "none");
}
//完成修改
function sure_c3(){
    var index = $(".sure_c3").index(this) ;
    var id=third_data[index].second_class_id;
    var info=$(".new_market_second").eq(index).val();
    if (info==""){
        $(".new_market_second").val("请输入小类的名称!")
                               .focus(function(){
            $(this).val("");
        });
        return;
    }
    $(".change_fam").eq(index).css("display", "none");
    $(".fam_mid").eq(index).html(info);
    $.ajax({
        type : "post",
        url : "",
        data : {
            "marketId":market_data.market.market_id,
            "second_class_id":id},
        success : function(data) {
            clean_two($(".new_market_second"),index);
        }
    });
}
//删除小类
function fam_del(){
    var index = $(".fam_del").index(this) ;
    var id=third_data[index].second_class_id;
    $.ajax({
        type : "post",
        url : "",
        data :  {
            "market_id":market_data.market.market_id,
            "second_class_id":id},
        dataType:"json",
        success : function(data) {

            show_second();
        }
    });
}
//确认添加小类
$(".sure_a3").click(function(){
    var id=$("#third_small_category").val();
    if(id==""||isNaN(id)){
        alert("请选择大分类！");
        return;
    }
    var info=$("#add_market2").val();
    if (info==""){
        $("#add_market2").val("请输入小类的名称!").focus(function(){
            $(this).val("");
        });
        return;
    }
    $.ajax({
        type : "post",
        url : "/som/mbia/marketSecondSE.do",
        data :  {
            "first_class_id":id,
            "msc.second_class_name":info,
            flag:"add"
        },
        dataType:"json",
        success : function(data) {
            clean_one($("#add_market2"));
            show_second();
        },
        error:function (e){
        	console.log(e);
        }
    });
});
//商品
function show_good(){
	 $(".four_mid_body").remove();
    $(".f_right").css("display","none");
    $.ajax({
        type : "post",
        url : "/som/mbia/marketFirstFind.do",
        data : {"market_id":market_data.market.market_id},
        dataType:"json",
        success : function(data) {
            var market_first=data.market_first;
            var id_name="four_fi";
            var firstline=$("<option>--请选择大分类--</option>");
            new_option(market_first,id_name,firstline);

        }
    });
}
//商品小类
function four_small_category(id){
    $.ajax({
        type : "post",
        url :"/som/mbia/marketSecondFind.do",
        data : {"first_class_id":id},
        //id是大分类的id
        dataType:"json",
        success : function(data) {
            var market_second=data.secondClasses;
            var id_name="four_se";
            var firstline=$("<option>--请选择小分类--</option>");
            new_option(market_second,id_name,firstline);
        }
    });
}
//商品
var good_info;
function  four_good(id){
    $(".four_mid_body").remove();
    good_info="";
    var body=$("<div class='four_mid_body'></div>");
    $.ajax({
        type : "post",
        url : "/som/mbia/marketCommodityFind.do",
        data : {"second_class_id":id},
        //id是小分类的id
        dataType:"json",
        success : function(data) {
            good_info=data;
            for(var i=0;i<data.length;i++){
                var info=data[i];
                var good=$("<div class='f_good'>" +
                    "<div class='good_change'><div class='change_title'>" +
                    " <div class='cancel2'>×</div>修改商品信息 </div>" +
                    " <div class='r_change'> <div class='r_ch'><label>商品名称:</label>" +
                    "<input class='good_namec' value='"+info.commodity_name+"'>" +
                    "<div class='tip_good'>信息不能为空！</div></div> " +
                    "<div class='r_ch'><label>库存（件）:</label><input class='good_numc' value='"+info.commodity_count+"'>" +
                    "<div class='tip_good'>信息不能为空！</div></div> " +
                    "<div class='r_ch'><label>价格（元）:</label><input class='good_pricec' value='"+info.commodity_price+"'>" +
                    "<div class='tip_good'>信息不能为空！</div></div> " +
                    "<div class='r_ch'><label>vip价格(元):</label><input class='good_vipc' value='"+info.commodity_vip_price+"'>" +
                    "<div class='tip_good'>信息不能为空！</div></div>" +
                    " <button class='sure_c4'>确认修改</button> </div> </div>" +
                    " <div class='g_pic'> <img src='"+info.commodity_picture0+"'> </div> " +
                    "<div class='g_name'>"+info.commodity_name+"("+info.commodity_count+"件)</div> " +
                    "<div class='g_line'> <div class='line_r' style='border-right: 1px dashed #DBDBDB;'>" +
                    "<span class='line_s'>价格：</span> " +
                    "<div class='pri'> ￥ <span class='price'>"+info.commodity_price+"</span></div> </div>" +
                    " <div class='line_r'> <span class='line_s'>vip：</span> " +
                    "<div class='pri'> ￥<span class='vip_p'>"+info.commodity_vip_price+"</span></div> </div> </div> " +
                    "<div class='g_line' style='border: none'> <div class='line_r'>" +
                    " <div class='four_change'>修改</div> </div> " +
                    "<div class='line_r'> <div class='four_del'>删除</div> </div> </div> </div>");
                body.append(good);
            }
            $(".four_mid").append(body);
            $(".four_change").bind("click",good_change);
            $(".cancel2").bind("click",cancel2);
            $(".sure_c4").bind("click",sure_c4);
            $(".four_del").bind("click",four_del);
        }
    });
}
//修改商品
function good_change(){
    var index = $(".four_change").index(this) ;
    $(".good_change").eq(index).css("display", "block");
}
//取消修改
function cancel2(){
    var index = $(".cancel2").index(this) ;
    $(".good_change").eq(index).css("display", "none");
}
//完成修改
function sure_c4(){
    var index = $(".sure_c4").index(this) ;
    var j=1;
    var change=good_info[index];
    var tip_id=index*4;
    var name=$(".good_namec").eq(index).val();
    var num=$(".good_numc").eq(index).val();
    var price=$(".good_pricec").eq(index).val();
    var v_p=$(".good_vipc").eq(index).val();
    if(name==""){
        $(".tip_good").eq(tip_id).css("display","block");
        $(".good_namec").eq(index).focus(function(){
            $(".tip_good").eq(tip_id).css("display","none");
        });
        j=0;
    }
    if(num==""){
        $(".tip_good").eq(tip_id+1).css("display","block");
        $(".good_numc").eq(index).focus(function(){
            $(".tip_good").eq(tip_id+1).css("display","none");
        });
        j=0;
    }
    if(price==""){
        $(".tip_good").eq(tip_id+2).css("display","block");
        $(".good_pricec").eq(index).focus(function(){
            $(".tip_good").eq(tip_id+2).css("display","none");
        });
        j=0;
    }
    if(v_p==""){
        $(".tip_good").eq(tip_id+3).css("display","block");
        $(".good_vipc").eq(index).focus(function(){
            $(".tip_good").eq(tip_id+3).css("display","none");
        });
        j=0;
    }
    if(j==0){
        return;
    }
    change.commodity_name=name;
    change.commodity_count=num;
    change.commodity_price=price;
    change.commodity_vip_price=v_p;
    $(".good_change").eq(index).css("display", "none");
    $.ajax({
        type : "post",
        url : "",
        data : "",
        dataType:"json",
        success : function(data) {}
    });
}
//删除商品
function four_del(){
    var index = $(".four_del").index(this) ;
    var id=good_info[index].commodity_id;
    $.ajax({
        type : "post",
        url : "",
        data : {"commodity_id":id},
        dataType:"json",
        success : function(data) {
            $(".f_good").eq(index).remove();
        }
    });
}
//确认添加商品
//添加图片
$(".add_pic_button").click(function(){
    $(".logo_up").css("display","block");
});
$("#btn_Start").click(function(){
    $(".logo_up").css("display","none");
});
//显示图片
$("#file1").change(function(){
    var fileinfo=document.getElementById("file1");
    var list=document.getElementById("imglist1");
    pic_change(fileinfo,list);
});
$("#file2").change(function(){
    var fileinfo=document.getElementById("file2");
    var list=document.getElementById("imglist2");
    pic_change(fileinfo,list);
});
$("#file3").change(function(){
    var fileinfo=document.getElementById("file3");
    var list=document.getElementById("imglist3");
    pic_change(fileinfo,list);
});
$("#file4").change(function(){
    var fileinfo=document.getElementById("file4");
    var list=document.getElementById("imglist4");
    pic_change(fileinfo,list);
});
function pic_change(file,list){
    if(window.URL!=undefined){
        url=window.URL.createObjectURL(file.files[0]);
    }else if(window.webkitURL!=undefined){
        url=window.webkitURL.createObjectURL(file.files[0]);
    }
    list.src=url;
}
//确认添加商品
$(".sure_a4").click(function(){
    var j=1;
    var jason="";
    var first_class_id=$("#four_fi option:selected").val();
    var second_class_id=$("#four_se option:selected").val();
    var commodity_count=$("#add_good_num").val();
    var commodity_name=$("#add_good_n").val();
    var commodity_price=$("#add_good_price").val();
    var commodity_vip_price=$("#add_good_v_price").val();
    var commodity_brand=$("#add_good_brand").val();
    var commodity_specifications=$("#add_good_standard").val();
    var commodity_picture0=$("#file1").val();
    var commodity_picture1=$("#file2").val();
    var commodity_picture2=$("#file3").val();
    var commodity_picture3=$("#file4").val();
    var pic_num=(commodity_picture0=="")&&(commodity_picture0=="")&&(commodity_picture0=="")&&(commodity_picture0=="");
    if(commodity_name==""){
        $(".add_tip").eq(0).css("display","block");
        $("#add_good_n").focus(function(){
            $(".add_tip").eq(0).css("display","none");
        });
        j=0;
    }
    if(commodity_brand==""){
        $(".add_tip").eq(1).css("display","block");
        $("#add_good_brand").focus(function(){
            $(".add_tip").eq(1).css("display","none");
        });
        j=0;
    }
    if(commodity_count==""){
        $(".add_tip").eq(2).css("display","block");
        $("#add_good_num").focus(function(){
            $(".add_tip").eq(2).css("display","none");
        });
        j=0;
    }
    if(commodity_price==""){
        $(".add_tip").eq(3).css("display","block");
        $("#add_good_price").focus(function(){
            $(".add_tip").eq(3).css("display","none");
        });
        j=0;
    }
    if(commodity_vip_price==""){
        $(".add_tip").eq(4).css("display","block");
        $("#add_good_v_price").focus(function(){
            $(".add_tip").eq(4).css("display","none");
        });
        j=0;
    }
    if(commodity_specifications==""){
        $(".add_tip").eq(5).css("display","block");
        $("#add_good_standard").focus(function(){
            $(".add_tip").eq(5).css("display","none");
        });
        j=0;
    }
    if(pic_num){
        $(".add_tip").eq(6).css("display","block");
        $(".add_pic_button").click(function(){
            $(".logo_up").css("display","block");
            $(".add_tip").eq(6).css("display","none");
        });
        j=0;
    }
    if(j==0){
        return;
    }
    jason={
        "market_id":market_data.market.market_id,
        "first_class_id":first_class_id,
        "second_class_id": second_class_id,
        "commodity_brand":commodity_brand,
        "commodity_count":commodity_count,
        "commodity_name":commodity_name,
        "commodity_price":commodity_price,
        "commodity_specifications":commodity_specifications,
        "commodity_vip_price":commodity_vip_price,
        "commodity_picture":commodity_picture0,
        "commodity_picture1":commodity_picture1,
        "commodity_picture2":commodity_picture2,
        "commodity_picture3":commodity_picture3
    };
    alert("start upload");
    $.ajax({
        type : "post",
        url : "/som/mbia/marketCommoditySave.do",
        data : jason,
        dataType:"json",
        success : function(data) {
            // 清空数据
            clean_one($("#add_good_num"));
            clean_one($("#add_good_n"));
            clean_one($("#add_good_price"));
            clean_one($("#add_good_v_price"));
            clean_one($("#add_good_brand"));
            clean_one($("#add_good_standard"));
            clean_pic($("#file1"),$("#imglist1"));
            clean_pic($("#file2"),$("#imglist2"));
            clean_pic($("#file3"),$("#imglist3"));
            clean_pic($("#file4"),$("#imglist4"));
        }
    });

});
function clean_pic(object_in,object_pic){
    object_in.val("");
    object_pic.attr('src',"");
}
//个人信息
//修改用户名
$(".change_user_n").click(function(){
    $("#user_names").attr("disabled",false);
});
//修改个人信息
$(".first_save").click(function(){
    var info=market_data.user;
    var birth=info.userBirthday;
    var name=$("#user_names").val();
    var aa = birth.split("-");
    var userYear = aa[0];
    var uesrMonth = aa[1];
    var uesrDay = aa[2];
    uesrMonth = parseInt(uesrMonth);
    uesrDay = parseInt(uesrDay);
    var year=$("#year").find("option:selected").text();
    var month=$("#month").find("option:selected").text();
    var day=$("#day").find("option:selected").text();
    console.log(name);
    console.log(info.userName);
    console.log(name==info.userName);
    console.log(year==userYear && month==uesrMonth && day==uesrDay);
    var nameSign = true;
    var dateSign = true;
    if(name==info.userName){
    	$(".tip_name").css("display","block");
    	nameSign = false;
    }
    if(year==userYear && month==uesrMonth && day==uesrDay){
        $(".tip_day").css("display","block");
        dateSign =false;
    }
    if(dateSign || nameSign){
        $(".tip_name").css("display","none");
        $(".tip_day").css("display","none");
	    var date = new Date(year,month-1,day);
	    $.ajax({
	        type : "post",
	        url : "/som/mbia/editBasicInfo.do",
	        data : {
	            "userBirthday":date,
	            "userName":name},
	        success : function(data) {
	        	//修改market里面的日期
	        	all();
	        	$(".top_right").css("display","block");
	            show_one();
	          
	        }
	    });
    }
});
//取消修改信息
$(".first_cancel").click(function(){
    show_selfinfo();
});
$("#soil").click(function() {
	$("#tip_name").css("disabled","block");
});
//显示个人信息
function show_selfinfo(){
    var info=market_data.user;
    $(".market_user").html(info.accountNumber);
    showBirth("year","month","day");
    $("#user_names").val(info.userName)
                    .attr("disabled",true);
}
//显示年份
function showYear($year, Year){
    var dateNow = new Date();
    var yearNow = dateNow.getFullYear();
    var yearStart = yearNow - 120;
    for (var i = yearNow; i >= yearStart; i--) {
        var option = $("<option>").text(i).val(i);
        $year.append(option);
    }
    $("#year option[value = " + Year + "]").attr('selected', true);
}
//显示月份
function showMonth($month, Month){
    $month.empty();
    for (var i = 1; i <= 12; i++) {
        var option = $("<option>").text(i).val(i);
        $month.append(option);
    }
    $("#month option[value = " + Month+ "]").attr('selected', true);
}
//显示日期
function showDay($day, year, month, Day){
    $day.empty();
    //date 的月份下标从0开始,日期从1开始，0表示上个月的最后一天
    var date = new Date(year, month,0);
    days = date.getDate();
    for (var i = 1; i <= days; i++) {
        var option = $("<option>").text(i).val(i);
        $day.append(option);
    }
  $("#day option[value = " + Day + "]").attr('selected', true);
}
//显示年月日
function showBirth(yearId, monthId, dayId){
    var birth=market_data.user.userBirthday;
    var $year = $("#" + yearId);
    var $month = $("#" + monthId);
    var $day = $("#" + dayId);
    var dateNow = new Date();
    var year = dateNow.getFullYear();
    var month = dateNow.getMonth();
    var day=dateNow.getDate();
    //用户原数据
    var userYear="";
    var uesrMonth="";
    var uesrDay="";
    //用户生日不为空时
    if(birth!=null){
        var aa = birth.split("-");
        var userYear = aa[0];
        var uesrMonth = aa[1];
        var uesrDay = aa[2];
        uesrMonth = parseInt(uesrMonth);
        uesrDay = parseInt(uesrDay);
    }
    //用户生日为空时为现在日期
    else{
        userYear=year;
        uesrMonth=month+1;
        uesrDay=day;
    }
    showYear($year, userYear);
    showMonth($month, uesrMonth);
    showDay($day, userYear, uesrMonth, uesrDay);
    $year.change(function(){
        year = $year.find("option:selected").text();
        showMonth($month, 1);
        showDay($day, year, month, 1);
    });
    $month.change(function(){
        month = $month.find("option:selected").text();
        showDay($day, year, month, 1);
    });
}