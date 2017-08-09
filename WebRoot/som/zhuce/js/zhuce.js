/**
 * Created by hp on 2017/4/21.
 */
var res = [true, true, true, true];
var pass = /^(\w){6,20}$/;
var reg = /^1[34578][0-9]{9}/;
var txt = "";
// 超市注册显示
function seller_block() {
	$("#market").css("display", "block");
	ajaxInitSelect();
}
$("#seller").click(seller_block);
$("#check2").click(seller_block);
function seller_hide() {
	$("#market").css("display", "none");
}
$("#normal_user").click(seller_hide);
$("#check1").click(seller_hide);
function hideError(i) {
	$(".t_jia").eq(i).css("display", "none");
}

function showError(i) {
	$(".t_jia").eq(i).css("display", "block");
}

function testPassword() {
	var flag = true;

	if ($("#mima").val() == "" || ($("#mima").val().length < 6)
			|| ($("#mima").val().length > 20)) {
		showError(1);
		res[1] = false;
		flag = false;
	} else if (!pass.test($("#mima").val())) {
		showError(1);
		$("#mima").val("");
		res[1] = false;
		flag = false;
	} else {
		res[1] = true;

		if ($("#que").val() == "" || ($("#que").val()) == ($("#mima").val())) {
			hideError(2);
		} else {
			showError(2);
		}
	}

	return flag;
}

function judge() {
	var j = $('input:radio[name="accountPower"]:checked').val();
	var flag = true;

	if ($("#shou").val() == "" || (($("#shou").val().length) != 11)) {
		$(".t_jia").eq(0).html("请正确填写手机号码！").css("display", "block");
		flag = false;
	}
	if ($("#mima").val() == "") {
		showError(1);
		flag = false;
	} else {
		flag = testPassword();
	}

	if ($("#que").val() == "" || ($("#que").val()) != ($("#mima").val())) {
		showError(2);
		flag = false;
	}
	if ($(".yan").val() == "") {
		$(".t_jia").eq(3).html("请输入验证码！").css("display", "block");
		flag = false;
	} else if ($(".yan").val() != txt) {
		$(".t_jia").eq(3).html("验证码错误！").css("display", "block");
		flag = false;
	}

	var marketFlag = true;
	if (j == 1) {
		marketFlag = market();
	}

	return flag && marketFlag;
}

$("#shou").focus(function() {
	hideError(0);
});
$("#mima").focus(function() {
	hideError(1);
});
$("#que").focus(function() {
	hideError(2);
});

$("#shou").blur(function() {
	if (($(this).val() == "") || (($(this).val().length) != 11)) {
		$(".t_jia").eq(0).html("请正确填写手机号码！").css("display", "block");
		res[0] = false;
	} else if (!reg.test($(this).val())) {
		$(".t_jia").eq(0).html("请正确填写手机号码！").css("display", "block");
		$("#shou").val("");
		res[0] = false;
	} else
		res[0] = true;
});

$("#mima").blur(function() {
	testPassword();
});

$("#que").blur(function() {
	if ($(this).val() == "" || ($(this).val()) != ($("#mima").val())) {
		showError(2);
		res[2] = false;
	} else
		res[2] = true;
});

show();
function show() {
	txt = "";
	$(".yz").html("");
	for ( var i = 0; i < 4; i++) {
		var div = document.createElement("div");
		div.className = "div_yan";
		var color = "";
		for ( var a = 0; a < 6; a++) {
			color += Math.floor(Math.random() * 10);
		}
		var t = Math.floor(Math.random() * 10);
		div.style.color = "#" + color;
		txt += t;
		div.innerHTML = t;
		$(".yz").append(div);
	}
}
$(".sp").click(function() {
	show();
});

$(".yan").focus(function() {
	hideError(3);
});
$(".yan").blur(function() {
	if ($(".yan").val() == "") {
		$(".t_jia").eq(3).html("请输入验证码！").css("display", "block");
		res[3] = false;
	} else {
		if ($(".yan").val() != txt) {
			$(".t_jia").eq(3).html("验证码错误！").css("display", "block");
			show();
			res[3] = false;
		} else
			res[3] = true;
	}
});
$("#zh").click(function() {
	$(".t_jia").eq(0).css("display", "none");
	$(".t_jia").eq(1).css("display", "none");
	$(".t_jia").eq(2).css("display", "none");
	var accountPower = $('input:radio[name="accountPower"]:checked').val();
	var accountNumber = $("#shou").val();
	var accountPassword = $("#que").val();
	var jason = "";
	if (accountPower == 1) {
		var market_pic = $("#up_img").val();
		var market_name = $("#market_name").val();
		var detail = $("#market_id").val();
		var province = $("#province").find("option:selected").text();
		var province_id = $("#province").find("option:selected").val();
		var city = $("#city").find("option:selected").text();
		var city_id = $("#city").find("option:selected").val();
		var country = $("#contries").find("option:selected").text();
		var country_id = $("#contries").find("option:selected").val();
		console.log(country+"--"+country_id);
		jason = {
			"accountNumber" : accountNumber,
			"accountPassword" : accountPassword,
			"accountPower" : accountPower,
			"market_name" : market_name,
			"market_logo" : market_pic,
			"marketAddress_province.province_id" : province_id,
			"marketAddress_province.province_name" : province,
			"marketAddress_city.city_id" : city_id,
			"marketAddress_city.city_name" : city,
			"marketAddress_contry.contry_id" : country_id,
			"marketAddress_contry.contry_name" : country,
			"marketAddress_detailed" : detail
		};
	} else {
		jason = {
			"accountNumber" : accountNumber,
			"accountPassword" : accountPassword,
			"accountPower" : accountPower
		};
	}
	if (!judge()) {
		if (res[1] == false) {
			$(".t_jia").eq(1).css("display", "block");
		} else if (res[2] == false) {
			$(".t_jia").eq(2).css("display", "block");
		}
		res[3] = false;
	} else {
		$.ajax({
			type : "post",
			url : "/som/userAccount/register.do",
			data : jason,
			success : function(data) {
				show();
				// data返回1个状态
				// 用户存在：haveUser
				if (data == "haveUser") {
					$(".t_jia").eq(0).html("用户已存在").css("display", "block");
				}else{
					location.href = data;
				}
			}
		});
		return true;
	}
});
// 商家
function market() {
	// 图片value值
	var market_pic = $("#up_img").val();
	// 超市名字
	var market_name = $("#market_name").val();
	var province=$("#province").find("option:selected").text();
	var city=$("#city").find("option:selected").text();
	var country=$("#contries").find("option:selected").text();
	var detail = $("#market_id").val();
	var address=(detail == "")||(city==""||city=="请选择")||(province==""||province=="请选择")||(country==""||country=="请选择");
	var test = true;
	if (market_pic == "") {
		$(".tip_name_top").css("display", "block");
		$("#up_img").focus(function() {
			$(".tip_name_top").css("display", "none");
		});
		test = false;
	}
	if (market_name == "") {
		$(".tip_name").eq(0).css("display", "block");
		$("#market_name").focus(function() {
			$(".tip_name").eq(0).css("display", "none");
		});
		test = false;
	}
	if (address){
		$(".tip_name").eq(1).css("display", "block");
		$("#market_id").focus(function() {
			$(".tip_name").eq(1).css("display", "none");
		});
		test = false;
	}
	return test;
}

/*--------------------------------ajax 请求--------------------------------------*/

function ajaxInitSelect() {
	$.ajax({
		url : '/som/home/provinces.do',
		type : 'POST',
		dataType : 'text',
		data : {
			infoId : 'province'
		},
		success : createNewOption,
		error : function(data) {
			alert("ajaxInitSelect失败了");
		}
	});
}

function ajaxChangeProvinceSelect(infoId) {
	$.ajax({
		url : "/som/home/cities.do",
		type : "POST",
		dataType : "text",
		data : {
			"provinceId" : infoId
		},
		success : createNewOption,
		error : function(data) {
			alert("ajaxChangeProvinceSelect失败了");
		}
	});
}
function ajaxChangeCitySelect(infoId) {
	$.ajax({
		url : "/som/home/countries.do",
		type : "POST",
		dataType : "text",
		data : {
			"cityId" : infoId
		},
		success : createNewOption,
		error : function(data) {
			alert("ajaxChangeCitySelect");
		}
	});
}

function ajaxChooseCounty(infoId) {
	$.ajax({
		url : "/som/home/markets.do",
		type : "POST",
		dataType : "text",
		data : {
			"countryId" : infoId
		},
		success : createNewOption,
		error : function(data) {
			alert("ajaxChooseCounty失败了");
		}
	});
}
function selectOption(selectedId) {
	$("#" + selectedId).change(function() {
		var id = $("#" + selectedId + " option:selected").val();
		/*if (selectedId == "contries") {
			if (id == '请选择') {
				$("#marketInfo").empty();
			} else {
				ajaxChooseCounty(id); // 因为这两个请求的返回函数不一样
			}
		} else if (selectedId == "city") {
			ajaxChangeCitySelect(id);
		} else {
			ajaxChangeProvinceSelect(id);
		}*/
		if(selectedId=="province"){
			if (id == '请选择') {
				$("#city").empty();
				$("#contries").empty();
			}
			else ajaxChangeProvinceSelect(id);
		}
		else if (selectedId == "city") {
			if (id == '请选择') {
				$("#contries").empty();
			}
			else ajaxChangeCitySelect(id);

		}
		else{
			ajaxChooseCounty(id);
		}
	});
}

function createNewOption(information) {
	var JsonInformation = $.parseJSON(information);
	var selectedId = JsonInformation.class;
	$("#" + selectedId).empty();
	if (selectedId == "province") {
		$("#" + selectedId).append($("<option>").text("请选择"));
		for ( var i = 0; i < JsonInformation.province.length; i++) {
			$("#" + selectedId).append($("<option>", {
				value : JsonInformation.province[i].province_id
			}).text(JsonInformation.province[i].province_name));
		}
	} else if (selectedId == "city") {
		$("#" + selectedId).append($("<option>").text("请选择"));
		for ( var i = 0; i < JsonInformation.cities.length; i++) {
			$("#" + selectedId).append($("<option>", {
				value : JsonInformation.cities[i].city_id
			}).text(JsonInformation.cities[i].city_name));
		}
	} else {
		$("#" + selectedId).append($("<option>").text("请选择"));
		for ( var i = 0; i < JsonInformation.contries.length; i++) {
			$("#" + selectedId).append($("<option>", {
				value : JsonInformation.contries[i].contry_id
			}).text(JsonInformation.contries[i].contry_name));
		}
	}
	selectOption(selectedId);
	return true;
}
