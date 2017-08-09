/**
 * Created by hp on 2017/4/14.
 */

var res = [true,true,true,true];
var reg = /^1[34578][0-9]{9}/;
$(".name").focus(function() {
	$(".res1").css("display", "none");
});
$(".name").blur(function() {
	if (($(this).val() == "") || (($(this).val().length) != 11)) {
		$(".res1").html("请正确填写手机号码！").css("display", "block");
		res[0] = false;
	} else if (!reg.test($(this).val())) {
		$(".res1").html("请正确填写手机号码！").css("display", "block");
		$(".name").val("");
		res[0] = false;
	} else
		res[0] = true;
});
$(".mima").focus(function() {
	$(".res").css("display", "none");
});
$(".mima").blur(
		function() {
			if ($(this).val() == "" || ($(this).val().length < 6)
					|| ($(this).val().length > 20)) {
				$(".res").html("请输入6-20位密码!").css("display", "block");
				res[1] = false;
			} else
				res[1] = true;
		});

var txt = "";
show();
function show() {
	txt = "";
	$(".yan_b").html("");
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
		$(".yan_b").append(div);
	}
}
//解析并获取URL的参数
function getQueryString(name) { // name为传入参数
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
//上一个页面的名字，不带.HTML
var pre = getQueryString("pre");

$(".b_c").click(function() {
	show();
});

$(".yanzheng").focus(function() {
	$(".yan").css("display", "none");
});
$(".yanzheng").blur(function() {
	if ($(".yanzheng").val() == "") {
		$(".yan").html("请输入验证码！");
		$(".yan").css("display", "block");
		res[2] = false;
	} else {
		if ($(".yanzheng").val() != txt) {
			$(".yan").html("验证码错误！");
			$(".yan").css("display", "block");
			show();
			res[2] = false;
		} else
			res[2] = true;
	}
});
function check() {
	var j = $('input:radio[name="accountPower"]:checked').val();
	if (j == null) {
		$(".user_f").css("display", "block");
		res[3] = false;
	}
	if ($(".name").val() == "") {
		$(".res1").css("display", "block");
		res[0] = false;
	}
	if ($(".mima").val() == "") {
		$(".res").css("display", "block");
		res[1] = false;
	}
	if ($(".yanzheng").val() == "") {
		$(".yan").html("请输入验证码！");
		$(".yan").css("display", "block");
		res[2] = false;
	} else {
		if ($(".yanzheng").val() != txt) {
			$(".yan").html("验证码错误！");
			$(".yan").css("display", "block");
			show();
			res[2] = false;
		}
	}
}

$(".send").click(
		function() {
			$(".res1").css("display", "none");
			$(".res").css("display", "none");
			check();
			if ((res[0] && res[1] && res[2] && res[3]) == false) {
				return false;
			} else {
				$.ajax({
					type : "post",	
					url : "/som/userAccount/login.do",
					data : $("#deng_form").serialize()+"&pre="+pre,
					success : function(data) {
						console.log(data);
						show();
						if (data == "nouser") {
							$(".res1").html("没有该用户！").css("display", "block");
						} else if (data == "pwError") {
							$(".res").html("密码错误！").css("display", "block");
						} else {
							location.href = data;
						}
					}
				});
			}
		});