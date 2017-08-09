function initAjax(info) {
	creatNewInfo(info);
	init();
}

var commodityID;
var commoditySend;
function creatNewInfo(information) {
	console.log(information);
	var info = $.parseJSON(information);
	commoditySend =info;
	var bigbigPath = [];
	bigbigPath.push(info.commodity_picture0);
	bigbigPath.push(info.commodity_picture1);
	bigbigPath.push(info.commodity_picture2);
	bigbigPath.push(info.commodity_picture3);

	$(".smallImgInfo").each(function(index, el) {
		var newImg = $("<img>", {
			src : bigbigPath[index],
			class : "smallImg"
		});
		$(this).append(newImg);
	});
	var newimg = $("<img>", {
		src : bigbigPath[0],
		class : "bigImg"
	});
	$("#bigImg").append(newimg);
	var newImg = $("<img>", {
		src : bigbigPath[0],
		class : "bigest"
	});
	$("#bigbigImg").append(newImg);
	
	commodityID = info.commodity_id;
	var marketName = info.commodity_market.market_name;
	var name = info.commodity_name;
	var count = info.commodity_count;
	var price = info.commodity_price;
	var vipPrice = info.commodity_vip_price;
	var brand = info.commodity_brand;
	var specifications = info.commodity_specifications;
	$("#marketName").text("【" + marketName + "】");
	$("#commodityName").text(name);
	$("#brand").text(brand);
	$("#standard").text(specifications);
	$("#count").text(count);
	$("#price").text("￥" + price);
	$("#vipPrice").text("￥" + vipPrice);

	clickButton(count);
}

function clickButton(max) {
	var v = $(".input").attr('value');

	$(".input").blur(function() {
		if ($(".input").val().length == 0)
			$(".input").val(1);
		$(".input").attr('value', $(".input").val());
		v = $(".input").attr('value');
	});
	$(".up").click(function(event) {
		v = parseInt(v);
		if (v + 1 >= max)
			v = max;

		$(".input").val(v++);
	});
	$(".down").click(function(event) {
		v = parseInt(v);
		if (v - 1 <= 0)
			v = 0;
		$(".input").val(v--);
	});

	$("#buy").click(function() {
		num = $(".input").val();
		var pre = "/som/marketHome/toCommodityDetaild.do?commodityId="+commodityID+"&commodityCount="+num;
		// 校验登录
		$.ajax({
			url : "/som/check/checkLogin.do",
			type : "POST",
			dataType : "json",
			data : {"pre":pre},
			success : toLogin,
			error : function(data) {
				alert("pre default");
			}
		});

	});
}
var num;
function toLogin(loginHref) {
	if(loginHref.path != "hasLogin"){
		location.href = loginHref.path;
	}else{
		$.ajax({
			url : "/som/userCart/add.do",
			type : "POST",
			data : {
				"marketCommdityID":commoditySend.commodity_id,
				"cartCommodityCount":num
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
	}
}

function init() {
	$(".smallImgInfo").hover(function() {
		$("#bigImg").empty();
		var newimg = $("<img>", {
			src : $(this).children('img').attr('src'),
			class : "bigImg"
		});
		$("#bigImg").append(newimg);
		$("#bigbigImg").empty();
		var newImg = $("<img>", {
			src : $(this).children('img').attr('src'),
			class : "bigest"
		});
		$("#bigbigImg").append(newImg);
	});

	var bigImg = $("#bigImg");
	var bigbigImg = $("#bigbigImg");
	var bigbig = bigbigImg.children("img")[0];
	bigImg.mouseenter(function(event) {
		bigbigImg.show();
	}).mouseleave(function() {
		bigbigImg.hide();
	});

	var x = 0;
	var y = 0;
	var preX = 0;
	var preY = 0;

	preX = bigbigImg.outerWidth() / bigImg.outerWidth();
	preY = bigbigImg.outerHeight() / bigImg.outerHeight();
	bigImg.mousemove(function(event) {
		var event = event || window.event;

		x = event.clientX - $(this).offset().left;
		y = event.clientY - $(this).offset().top;
		var scrollX = x * preX;
		var scrollY = y * preY;
		scrollX = scrollX > 800 - this.offsetWidth
				? 800 - this.offsetWidth
				: scrollX;
		scrollY = scrollY < 0 ? 0 : scrollY;
		$(".bigest").css({
			"left" : -scrollX + "px",
			"top" : -scrollY + "px"
		});
	});
	var width = $(window).width() - 220;
	$(".leftDiv").css({
		"left" : width + "px",
		"top" : 200 + "px"
	});
}

function slider() {
	var scrollHeight = $(".leftDiv").outerHeight();
	var len = $(".slider-main").children().length;
	var img = $(".slider-main").children();
	var isNow = 0;
	var timer = null;
	var lenSpan = $(".slider-ctrl").children().length;
	var spans = $(".slider-ctrl").children();

	for ( var i = 1; i < len; i++) {
		$(".slider-main").children().eq(i).css({
			top : scrollHeight
		});
	}

	timer = setInterval(autoPlay, 3000);

	function setSquare() {
		for ( var i = 1; i < lenSpan - 1; i++) {
			spans.eq(i).attr('class', 'slider-ctrl-con');
		}
		spans.eq(isNow + 1).attr('class', 'slider-ctrl-con current');
	}

	function autoPlay() {
		img.eq(isNow).animate({
			top : -scrollHeight + "px"
		}, 2000);
		++isNow >= len ? isNow = 0 : isNow;
		img.eq(isNow).css({
			top : scrollHeight
		});

		img.eq(isNow).animate({
			top : "30px",
		}, 2000);
		setSquare();
	}
	function clickSpans() {
		spans.eq(0).click(function(event) {
			autoPlay();
		});
		function clicks(k) {
			return function() {
				if (k - 1 > isNow) {
					img.eq(isNow).animate({
						top : -scrollHeight + "px"
					}, 2000);
					isNow = k - 1;
					img.eq(isNow).css({
						top : scrollHeight + "px"
					});
				}
				if (k - 1 < isNow) {
					img.eq(isNow).animate({
						top : scrollHeight + "px"
					}, 2000);
					isNow = k - 1;
					img.eq(isNow).css({
						top : -scrollHeight + "px"
					});
				}
				img.eq(isNow).animate({
					top : "30px"
				}, 2000);
				setSquare();
			}
		}
		for ( var k = 1; k < lenSpan - 1; k++) {
			spans.eq(k).click(clicks(k));
		}

		spans.eq(lenSpan - 1).click(function(event) {
			img.eq(isNow).animate({
				top : scrollHeight + "px"
			}, 2000);
			--isNow < 0 ? isNow = len - 1 : isNow;
			img.eq(isNow).css({
				top : -scrollHeight + "px"
			});

			img.eq(isNow).animate({
				top : "30px",
			}, 2000);
			setSquare();
		});
	}

	$(".leftDiv").mouseover(function(event) {
		clearInterval(timer);
	});
	$(".leftDiv").mouseout(function(event) {
		clearInterval(timer);
		timer = setInterval(autoPlay, 3000);
	});

	clickSpans();
}

/*--------------------------------ajax 请求--------------------------------------*/
function ajaxInit(id) {
	$.ajax({
		url : "/som/commodities/commdity.do",
		type : 'POST',
		dataType : 'text',
		success : initAjax,
		error : function(data) {
			alert("ajaxInit失败了");
		}
	});
}