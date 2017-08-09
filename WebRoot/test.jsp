<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="som/load/js/jquery-3.0.0.js"></script>
<title>Insert title here</title>

</head>
<body>
	<button id="ss">hello</button>
	<button id="cc">cchhh</button>
</body>

<script>
	$("#cc").click(function() {
		
		var province = {"province_id":1,"province_name":"p"};
		var city = {"city_id":3,"city_name":"天津"};
		var country = {"contry_id":1,"contry_name":"朝阳区"};
		var detail = "jjjjj";
		var jason={
			marketAddress_province:province,
			marketAddress_city:city,
			marketAddress_contry:country,
			marketAddress_detailed:detail
		};
		$.ajax({
			type : "post",
			url : "/som/test/test.do",
			data :jason,
			dataType:"json",
			success : function(s) {
				console.log(s);
				alert(s);
			},
			error:function(e){
				console.log(e);
			}
		});
	});
	$("#ss").click(function() {
		var province = {"province_id":"1","province_name":"p"};
		var city = {"city_id":"3","city_name":"天津"};
		var country = {"contry_id":"1","contry_name":"朝阳区"};
		var detail = "jjjjj";
		var jason={
			"accountNumber":"15619252163",
			"accountPassword":"123456",
			"accountPower":"1",
			"market_name":"soil",
			"market_logo":"cccc",
			"market_address.marketAddress_province.province_id":1,
			"market_address.marketAddress_province.province_name":"p",
			"market_address.marketAddress_city.city_id":3,
			"market_address.marketAddress_city.city_name":"天津",
			"market_address.marketAddress_contry.contry_id":1,
			"market_address.marketAddress_contry.contry_name":"朝阳区",
			"market_address.marketAddress_detailed":detail
		};
		$.ajax({
			type : "post",
			url : "/som/test/receive.do",
			data :jason,
			success : function(s) {
				console.log(s);
				alert(s);
			},
			error:function(e){
				console.log(e);
			}
		});

	});
</script>

</html>