//key=f893e6a1af41f3de78e6e88d3f9253fe
/*--------------------------------init----------------------------------------*/
function init(){
    //进入界面先申请省的下拉框
    ajaxInitSelect();
    var userAddress = "";
//    acquireUserCity(userAddress);
//    console.log("qqqq"+userAddress);
//    if(userAddress){
//        ajaxChooseCounty(userAddress);
//    }else{
//        ajaxChooseCounty("111");
//    }
}

/*------------------------------------------------------------------------*/

/*获取用户的地区*/
function acquireUserCity(userAddress){
    var lnglatXY =[];
    AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation,'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation,'error', onError);//返回定位出错信息
        console.log(lnglatXY);   
    });
    //解析定位结果
    function onComplete(data) {
        lnglatXY.push(data.position.getLng());
        lnglatXY.push(data.position.getLat());

        AMap.plugin('AMap.Geocoder', function() {
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                 geocoder_CallBack(result);
                }
            }); 
        });
        
    }
    //解析定位错误信息
    function onError(data) {
        console.log('定位失败');
    }
    function geocoder_CallBack(data) {
      //  var address = data.regeocode.formattedAddress; //返回地址描述
        var country = data.regeocode.addressComponent.district;//返回区
        var countryAdcode = data.regeocode.addressComponent;//返回区编号
        console.log(country);
        userAddress = country;
    }
}

/*按钮实现的翻页事件*/
function turnPageUp(){
    $("#pageUp").on("click",function(){
        ajaxTurnPageUp();
    });
}

function turnPageDown(){
    $("#pageDown").on("click",function(){
        ajaxTurnPageDown();
    });
}


/*点击超市以后将该超市的id值传给后台*/
function clickMarket(){
    $(".marketDiv").click(function(event) {
        var id = $(this).attr("id");//获取到该元素的id值
        //然后将id 值传给后台 进行翻页
       // ajaxChooseAmarket(id);
      location.href = "/som/home/toMarketHome.do?marketId="+id; 
   });
}
///*将每个div里面添加相应的图片信息*/
function createNewMarketInfo(information){
    createNewDiv(information);
    $(".marketDiv").each(function(index, el) {
        var str = createNewMarket(information);
        $(this).append(str[index]);
    });
    clickMarket();

}
/*创建超市图片的标签*/
function createNewMarket(information){
    var JsonInformation = $.parseJSON(information);
    var outPut = [];
    var length =JsonInformation.markets.length;
    for (var i = 0; i < length; i++) {
        var info = JsonInformation.markets[i];
        var add = info.market_address.marketAddress_province.province_name+"省"
        +info.market_address.marketAddress_city.city_name +"市"
        +info.market_address.marketAddress_contry.contry_name+"区"
        +info.market_address.marketAddress_detailed;
        outPut.push("<img src="+info.market_logo+" class= marketLogo alt=我是第"+ info.market_id+"个logo/><a href=#>"+ add+"</a>");
    } 
    return outPut;
}
/*创建超市的详情的div*/
function createNewDiv(information){
    var JsonInformation = $.parseJSON(information);
    var outPut= [];
    var length =JsonInformation.markets.length;
    for (var i = 0; i < length; i++) {
        var info = JsonInformation.markets[i];
        outPut.push("<div id =" + info.market_id +" class= marketDiv></div>");
    }
    $("#marketInfo").empty();
    $("#marketInfo").append(outPut);
}

function selectOption(selectedId){
    $("#"+selectedId).change(function() {
       var id = $("#"+ selectedId +" option:selected").val();
        if(selectedId =="contries"){
            if(id =='请选择'){
            	$("#marketInfo").empty();
            }else{
            	 ajaxChooseCounty(id);  //因为这两个请求的返回函数不一样	
            }
        }else if(selectedId =="city"){
           ajaxChangeCitySelect(id);
        }else{
        	ajaxChangeProvinceSelect(id);
        }
    });
}


function createNewOption(information){
    var JsonInformation = $.parseJSON(information);
    var selectedId = JsonInformation.class;
    $("#"+selectedId).empty();
    if(selectedId == "province"){
        $("#"+ selectedId).append($("<option>").text("请选择"));
        for (var i = 0; i < JsonInformation.province.length; i++) {
            $("#"+ selectedId).append($("<option>",
             {value :JsonInformation.province[i].province_id})
            .text(JsonInformation.province[i].province_name));
        } 
    }else if(selectedId == "city"){
        $("#"+ selectedId).append($("<option>").text("请选择"));
        for (var i = 0; i < JsonInformation.cities.length; i++) {
            $("#"+ selectedId).append($("<option>",
             {value :JsonInformation.cities[i].city_id})
            .text(JsonInformation.cities[i].city_name));
        } 
    }else{
       $("#"+ selectedId).append($("<option>").text("请选择"));
        for (var i = 0; i < JsonInformation.contries.length; i++) {
            $("#"+ selectedId).append($("<option>",
             {value :JsonInformation.contries[i].contry_id})
            .text(JsonInformation.contries[i].contry_name));
        } 
    }
    selectOption(selectedId);
    return true;
}

/*--------------------------------ajax 请求--------------------------------------*/
function ajaxInitSelect(){
    $.ajax({
        url: '/som/home/provinces.do',
        type: 'POST',
        dataType: 'text',
        data: {infoId: 'province'},
        success : createNewOption,
        error:function(data){
            alert("ajaxInitSelect失败了");
        }
    });  
}

function ajaxChangeProvinceSelect(infoId){  
   $.ajax({
    url :"/som/home/cities.do",
    type :"POST",
    dataType:"text",
    data :{"provinceId": infoId},
    success : createNewOption,
    error:function(data){
        alert("ajaxChangeProvinceSelect失败了");
        }
    });
}
function ajaxChangeCitySelect(infoId){  
	   $.ajax({
	    url :"/som/home/countries.do",
	    type :"POST",
	    dataType:"text",
	    data :{"cityId": infoId},
	    success : createNewOption,
	    error:function(data){
	        alert("ajaxChangeCitySelect");
	        }
	    });
	}

function ajaxChooseCounty(infoId){
    $.ajax({
    url :"/som/home/markets.do",
    type :"POST",
    dataType:"text",
    data :{"countryId": infoId},
    success : createNewMarketInfo,
    error:function(data){
        alert("ajaxChooseCounty失败了");
        }
    });
}

function ajaxChooseAmarket(id){
    $.ajax({
        url: '',
        type: 'POST',
        dataType: "text",
        data: {"infoId": id },
        success:function(){
            alert("我选择了一个超市，请跳转至该超市首页 (*￣︶￣)");
        },
        error:function(){
            alert("阿偶~ajaxChooseAmarket出错了");
        }
    });
}
