
// 显示数据

var id;
$.ajax({
    type : "post",
    url : "/som/check/checkLogin.do",
    data:{"pre":"shopping.html"},
    dataType:"json",
    success : function(data){
    	if(data.path != "hasLogin"){
    		location.href = data.path;
    	}else{
			if(data.power != 0){
				location.href = "/som/index.html";
				alert("商家~~");
			}else{
				id = data.userId;
				show();
			}
    	}
    }
});
var infolist = [];
	function show() {
		infolist = [];
		$(".tab").remove();
		$(".mid_last").remove();
		var table = $("<table class='tab'><tr class='first_line'><td class='check_box'>"
				+ "<input type='checkbox' id='select'>"
				+ "<label for='select'>全选</label> </td> "
				+ "<td>商品信息</td> <td class='line'>单价（元）</td>"
				+ "<td class='line'>数量</td><td class='line'>金额（元）</td>"
				+ " <td class='line'>操作</td> </tr></table>");

		$.ajax({
			type : "post",
			// 获取数据的端口
			url : "/som/userCart/find.do",
			data : {"id" : id},
			dataType : "json",
			success : function(data) {
				// alert(data[0].accountId);
				var datalist = data.userCarts;
				// alert(datalist.length);
				for ( var i = 0; i < datalist.length; i++) {
					// 存储信息
					var info = {
						"cart_user_id" : data.accountId,
						"cart_commodity_id" : datalist[i].marketCommdity.commodity_id,
						"cartCommodityCount" : datalist[i].cartCommodityCount,
						"market_id":datalist[i].marketCommdity.commodity_market.market_id
					};
					infolist.push(info);

					var commodity = datalist[i].marketCommdity;
					var number = datalist[i].cartCommodityCount;
					var price = commodity.commodity_price;
					var totalprice = number * price;
					var market_id=commodity.commodity_market.market_id;
					var market_name=commodity.commodity_market.market_name;

					if(infolist.length==1){
						var m_top=$("<tr class='market_name'><td colspan='6'><div class='s_name'>"+market_name+"</div></td></tr>");
						table.append(m_top);
					}
					var is_ok=false;
					
					for(var j=0;j<infolist.length;j++){
						if (market_id != infolist[j].market_id){
							is_ok=true;
						}
					}

					if(is_ok==true){
						var m_top=$("<tr class='market_name'><td colspan='6'><div class='s_name'>"+market_name+"</div></td></tr>");
						table.append(m_top);
					}
					
					var ware = $(" <tr class='common_line'> "
							+ "<td class='check_box'><input  class='good_check' type='checkbox' ></td> "
							+ "<td> <div class='line_pic'> "
							+ "<a href=''><img id='hah' height='100%' width='100%' src='"+ commodity.commodity_picture0+ "'></a>"
							+ "</div> <div class='line_a'> <a href='#'>"
							+ commodity.commodity_name
							+ "</a> </div> </td> "
							+ "<td class='line'><div class='money'>￥</div><div class='price'>"
							+ price
							+ "</div> </td> "
							+ "<td class='line'><div class='num_all'><button class='subtract'>-</button><input class='num' value='"
							+ number
							+ "'><button class='add'>+</button></div></td> "
							+ "<td class='line'><div class='money'>￥</div> <div class='total_price'>"
							+ totalprice
							+ "</div></td> "
							+ "<td class='line'><div class='operate'><button class='del_btn'>删除</button></div></td> </tr>");
					table.append(ware);
				}

				$(".mid").append(table);
				$("#select").bind("click", select_click);
				$(".subtract").bind("click", subtract_click);
				$(".add").bind("click", add_click);
				$(".good_check").bind("click", check_good);
				$(".num").bind("change", num_change);
				$(".del_btn").bind("click", del_info);

			}

		});
		var bottom = $("<div class='mid_last'> <div class='last_l'><label class='amount_label'>总计</label>"
				+ " <input class='amount' disabled></div> "
				+ "<div class='last_r'><button class='pay'>结算</button></div></div>");
		$(".mid_bottom").append(bottom);
		// 删除事件
		/* $(".pay").bind("click", paying); */
	}
	// 全选事件

	function select_click() {
		if ($(this).is(":checked")) {
			$(".good_check").prop("checked", true);
			total_p();
		}

		else {
			$(".good_check").prop("checked", false);
			$(".amount").val(0);
		}
	}
	// 减号事件
	function subtract_click() {
		var index = $(".subtract").index(this);
		var a = infolist.slice(index, index + 1);
		if ($(".num").eq(index).val() <= 1) {
			$(".num").eq(index).val("1");
		} else {
			$(".num").eq(index).val($(".num").eq(index).val() - 1);
		}
		caculate(index);
		total_p();

		a[0].cartCommodityCount = $(".num").eq(index).val();
		$.ajax({
			type : "post",
			url : "/som/userCart/update.do",
			data : a[0]
		});

	}
	// 加号事件
	function add_click() {
		var index = $(".add").index(this) ;
		var a = infolist.slice(index, index + 1);
		$(".num").eq(index).val(parseInt($(".num").eq(index).val()) + 1);
		caculate(index);
		total_p();

		// a为后台需要的数据
		a[0].cartCommodityCount = $(".num").eq(index).val();
		$.ajax({
			type : "post",
			url : "/som/userCart/update.do",
			data : a[0]
		});

	}
	// 勾选计算价钱
	function check_good() {
		if ($(this).is(":checked")) {
			var cnt=0;
			total_p();
			for ( var i = 0; i < $(".good_check").length; i++) {
				if ($(".good_check").eq(i).is(":checked")) {
					cnt++;
				}
			}
			if (cnt == $(".good_check").length) {

				$("#select").prop("checked", true);
			}
		} else {
			$("#select").prop("checked", false);
			total_p();
		}

	}
	// 数量改变事件
	function num_change() {
		var index = $(".num").index(this) ;
		var a = infolist.slice(index, index + 1);
		if ($(".num").eq(index).val() <= 1)
			$(".num").eq(index).val(1);
		caculate(index);

		a[0].cartCommodityCount = $(".num").eq(index).val();
		$.ajax({
			type : "post",
			url : "/som/userCart/update.do",
			data : a[0]
		});

	}
	// 计算总价
	function caculate(index) {
		$(".total_price").eq(index).html(
				($(".num").eq(index).val() * $(".price").eq(index).html())
						.toFixed(2));
	}
	// 计算总购物车价格
	$(".amount").val(0);

	// 更换总计价格
	function total_p() {
		$(".amount").val(0);
		var p = 0;
		for ( var i = 0; i < $(".good_check").length; i++) {
			if ($(".good_check").eq(i).is(":checked")) {
				p += parseInt($(".total_price").eq(i).html());
			}

		}
		$(".amount").val(p.toFixed(2));

	}

	// 删除事件
	function del_info() {
		var id =  $(".del_btn").index(this);
		// 后台需要的数据为a,a为页面加载时的Jason数据
		var a = infolist.splice(id, id + 1);
		$.ajax({
			type : "post",
			url : "/som/userCart/delete.do",
			data : a[0],
			success : function(data) {
				show();
			}
		});
	}
	// 付款事件
	/*
	 * function paying(){ $.ajax({}); }
	 */

