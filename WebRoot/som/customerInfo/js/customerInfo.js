/*-------------------------- 这是用户信息修改的 js ------------------- */
function initBaseData(JsonInfo){
    //var JsonInfo = $.parseJSON(info);
    $("#baseInfo").data('info', JsonInfo);
    $(".phone input").val(showTel(JsonInfo.accountNumber));
    $("#userName").val(JsonInfo.userName);
    $("#tel").text(JsonInfo.accountNumber);
    $("input:radio[name='sex'][value="+ JsonInfo.userSex +"]").prop('checked', true);
    showBirth("year",  "month", "day", JsonInfo.userBirthday);
}

function checkChange(name, birthday, sex){
    var oldData = $("#baseInfo").data('info');  
    return oldData.userName == name && oldData.userBirthday == birthday && oldData.userSex == sex;
}
function init(){
    var headerInfo = ["查看个人信息","查看收货地址","查看我的订单","修改密码","查看我的会员"];
    var $myInfo = $(".myInfo");
    var $infoHead = $(".infoHead");
    $(".info").each(function(index, el) {
        $(this).on('click',function(event) {
            $infoHead.text(headerInfo[index]);
            $myInfo.hide();
            $($myInfo[index]).show();
            var a = {id:"1",sign:"userInfo"};
            var b = {id:"1",sign:"userAddress"};
            var c = {id:"1",sign:"userOrder"};
            var e = {id:"1",sign:"vipMarket"};
            // switch(index){
            //     case 0:
            //         initAjax(a);
            //         break;
            //     case 1:
            //         initAddressAjax(b);
            //         break;
            //     case 2:
            //         initOrder(c);
            //         break;                
            //     case 3:
            //         break; 
            //     case 4:
            //         showMyVipAjax(e);
            //         break;                  
            // };
        });          
    });

}
function initBaseInfo(){
    var headerInfo = ["查看个人信息"];
    var $myInfo = $(".myInfo");
    var $infoHead = $(".infoHead");
    
    $("#baseInfo").show();
    $(".infoHead").text(headerInfo[0]);

    $(".changeHeader").on("click",function(){
        $(".selectFile").show();
        $(".upload").show();
        $(this).hide();
    });

    $(".selectFile").on("click",function(){
        $btn_file =  $("#btn_file");
        $btn_file.click();
    });
    $("#modify").on('click',function(event) {
        $(this).empty();
        $(this).append($("<span>"));
        $(this).append("4-20个字符，一个汉字为2个字符");
        $(this).css('color', '#BCBCBC');
        $name = $(".name input");
        $name.attr({
            disabled: false,
            maxlength:20
        });
    });

    $("#submitInfo").on('click',function() {
        var name = $(".name input").val();
        var birth =[];
        var select = $(".birth select");
        var birthday = "";
        var sex = $("input:radio:checked").val();
        console.log(sex);
        select.each(function(index, el) {    
            var temp = $(el).find('option:selected').text();
            if(temp < 10){
                temp = "0" + temp;
            }
            birth.push(temp);
        });
        birthday = birth.join("-");
        if(checkChange(name, birthday, sex)){
            console.log("没有发生修改！");     
        }else{
            //如果改变发送ajax请求
            var oldData = $("#baseInfo").data('info');
            var sendData = {
                userName: name,
                userBirthday:birthday,
                accountNumber:oldData.accountNumber,
                userSex:sex
            };
            changeBaseInfoAjax(sendData);
        }
        $(".name input").attr({disabled: true});
        $("#modify").empty();
        $("#modify").text("修改");
        $("#modify").css('color', "red");
        alert("修改成功！");
    });
        
    $("#cancleInfo").on('click', function(event) {
        var oldData = $("#baseInfo").data('info');
        initBaseData(oldData);
        $(".name input").prop({disabled: true});
        $("#modify").empty();
        $("#modify").text("修改");
        $("#modify").css('color', "red");
    });
}

function showTel(tel){
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    tel = tel.replace(reg, "$1****$2");
    return tel;
}
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
function showMonth($month, Month){
    for (var i = 1; i <= 12; i++) {
        var option = $("<option>").text(i).val(i);
        $month.append(option); 
    }
    $("#month option[value = " + Month+ "]").attr('selected', true);
}
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
function showBirth(yearId, monthId, dayId, birthInfo){
    var $year = $("#" + yearId);
    var $month = $("#" + monthId);
    var $day = $("#" + dayId);
    var year = 2017;
    var month = 1;

    var aa = birthInfo.split("-");
    var userYear = aa[0];
    var uesrMonth = aa[1];
    var uesrDay = aa[2];
    uesrMonth = parseInt(uesrMonth);
    uesrDay = parseInt(uesrDay);

    showYear($year, userYear);
    showMonth($month, uesrMonth);
    $year.change(function(){
        year = $year.find("option:selected").text();
        showDay($day, year, month, 1);
    });
    $month.change(function(){
            month = $month.find("option:selected").text();
            showDay($day, year, month, 1);
    });     
    showDay($day, year, month, uesrDay);       
}


/*-------------------------这是收货地址更改的js -----------------------*/
function initAddressData(JsonAddress){
    var JsonAddress = $.parseJSON(addressData);
    var addressArr = JsonAddress;
    var len = addressArr.length;
    $(".tip").find('li').text(len);
    for (var i = 0; i < len; i++) {
        createNewAddress(addressArr[i]);
    }
    addressButton();
    ajaxProvinceSelect();
}

function selectOption(selectedId){
    $("#"+selectedId).change(function() {
       var id = $("#"+ selectedId +" option:selected").val();
        console.log(id);
        if(selectedId =="province"){
            ajaxChangeProvinceSelect(id);
        }else if(selectedId =="city"){
            ajaxChangeCitySelect(id);
        }
    });
}


function createNewOption(JsonInformation){
    //console.log(information);
    var JsonInformation = $.parseJSON(information);
    var selectedId = JsonInformation.class;
    $("#"+selectedId + " option:not(:first)").remove();
    if(selectedId == "province"){
       //$("#"+ selectedId).append($("<option>").text("省/直辖市"));
        for (var i = 0; i < JsonInformation.province.length; i++) {
            $("#"+ selectedId).append($("<option>",
             {value :JsonInformation.province[i].province_id})
            .text(JsonInformation.province[i].province_name));
        } 
    }else if(selectedId == "city"){
       // $("#"+ selectedId).append($("<option>").text("市"));
        for (var i = 0; i < JsonInformation.cities.length; i++){
            $("#"+ selectedId).append($("<option>",
             {value :JsonInformation.cities[i].city_id})
            .text(JsonInformation.cities[i].city_name));
        } 
    }else{
      // $("#"+ selectedId).append($("<option>").text("区/县"));
        for (var i = 0; i < JsonInformation.contries.length; i++){
            $("#"+ selectedId).append($("<option>",
             {value :JsonInformation.contries[i].contry_id})
            .text(JsonInformation.contries[i].contry_name));
        } 
    }
    selectOption(selectedId);
    return true;
}

function changeAddress($this){
    $this.find(".deleteAddress").on('click', function(event) {
        var m_data = $(this).parents("tr").data('addressInfo');
        showAddress(m_data);
    });
}
function showAddress(m_data){
    $("#post").attr("statue", m_data.id);
    $("#detailAddress").val(m_data.detailAddress);
    $("#province option:selected").prop('selected', false);
    $("#city option:selected").prop('selected', false);
    $("#contry option:selected").prop('selected', false);
    $("#province option[value = " + m_data.province.province_id + "]").prop('selected', true);
    $("#city option[value = " + m_data.city.city_id + "]").prop('selected', true);
    $("#contry option[value = " + m_data.contry.contry_id + "]").prop('selected', true);
}

function deleteAddress($this){
    $this.find(".deleteAddress").on('click', function(event) {
        var len = $(".tip").find('li').text();
        var deleteid = $(this).parents("tr").attr("id").substring(7);
        var sendId = {orderId: deleteid};
        deleteAddressAjax(sendId);
        $(this).parents("tr").remove();
        $(".tip").find('li').text(--len);
    });
}

function createAddress(information){
    var JsonInformation = $.parseJSON(information);
    createNewAddress(JsonInformation);
}

function createNewAddress(addressInfo){
    var $saveAddressTbody = $("#myAddress");
    var add =addressInfo.province.province_name
    + addressInfo.city.city_name
    + addressInfo.contry.contry_name
    + addressInfo.detailAddress;
    var oldData = $("#baseInfo").data('info');
    var name  = oldData.userName;
    var tel = oldData.accountNumber;
    var post = "714200";
    var $tr = $("<tr>").data("addressInfo", addressInfo).attr('id', "address"+addressInfo.id);
    $tr.append($("<td>").text(name));
           
    var add = $("<td>").text(add);
    $tr.append(add);
    $tr.append($("<td>").text(post));
    $tr.append($("<td>").text(tel));
    var modity =$("<td>"); 
    modity.append($("<a>").text("修改").attr("class", "modifyAddress"));
    modity.append($("<a>").text("删除").attr("class", "deleteAddress"));
    $tr.append(modity);
    $saveAddressTbody.append($tr);
    changeAddress($tr);
    deleteAddress($tr);
}

function initAddress(){
    var oldData = $("#baseInfo").data('info');
    var name  = oldData.userName;
    var tel = oldData.accountNumber;
    var post = "714200";
    $("#addressName").val(name);
    $("#post").val(post);
    $("#telephone").val(tel);
}

function addressButton(){
    $("#1111").on("click", function(){
        var name = $("#addressName").val();
        var tag = $("#post").attr('statue'); 
        if(!name){
            alert("名字不能为空，请重新输入！");
        }
        var address = "";
        var prov = $("#province option:selected").text();
        var prov_id = $("#province option:selected").val();
        var city = $("#city option:selected").text();
        var city_id = $("#city option:selected").val();
        var qu = $("#contry option:selected").text();
        var qu_id = $("#contry option:selected").val();
        var detail = $("#detailAddress").val();
        var post =  $("#post").val();
        var tel = $("#telephone").val();
        address = prov + city + qu + detail;
        if(!tel){
            alert("联系方式不能为空，请重新输入！");
        }
        var addressJson = {
            "province":{
                "province_id" : prov_id,
                "province_name" : prov},
            "city" :{
                "city_name" : city,
                "city_id" : city_id
             },
            "contry":{
                "contry_name": qu,
                "contry_id" : qu_id
            },
            "detailAddress":detail,
            "id" : ""
        };
        if(!tag){
            // 如果是新产生的地址，发送ajax 然后 生成元素
            // 如果是修改的地址，发送ajax  的同时 直接生成元素
            tag = ++$("#myAddress tr").length;
            createNewAddressAjax(addressJson);
            $(".tip").find('li').text(tag);     
        }else{
            $("#address" + tag).data('addressInfo', addressJson);
            var str = '<td>'+ name +'</td> <td>'+ address
            +'</td> <td>714200</td> <td>'+ tel+'</td><td><a class="modifyAddress">修改</a><a class="deleteAddress">删除</a></td>';
            $("#address" + tag).html(str);
            $("#post").removeAttr("statue");
        }
        $("#province option[value = -1]").prop('selected', true); 
        $("#city option[value = -1]").prop('selected', true);
        $("#contry option[value = -1]").prop('selected', true);
        $("#detailAddress").val("");
        $("#address" + tag + " .deleteAddress").on('click', function(event) {
            $(this).parents("tr").remove();
        });
        $("#address" + tag + " .modifyAddress").on('click', function(event) {
            var m_data = $(this).parents("tr").data('addressInfo');
            showAddress(m_data);
        });
    });
}
/*-------------------------这是收货地址更改的js -----------------------*/


function selectOtherOrder(){
    $(".filter td").on('click',function(event) {
        var stat = $(this).attr("id");
        var val = $(this).attr("value");
        $(this).siblings().css({"background-color":"#F8F6F4"});
        $(this).css({"background-color":"#fff"});
        var data = $(".orderInfo").data('orderInfo');
        $("#orderTable").empty();
        $.each(JsonInformation, function(index, element){
            var i = 0;
            if(element.statue == stat){
                createOneOrder(element, "order"+i);
                i++;
            } 
        }); 
    });
}
function deleteOrder(){
    $(".deleteOrder").each(function(index, val) {
        $(this).on('click', function(event) {
            var tag = $(this).parent().attr("class");
            $(this).parents("tr").siblings("." + tag).remove();
            $(this).parents("tr").remove();
            alert(111);
       });
    });
}

function initOrderInfo(JsonInformation){
    // var JsonInformation = $.parseJSON(information);
    $(".orderInfo").data('orderInfo', JsonInformation);
    $.each(JsonInformation, function(index, element){
        createOneOrder(element, "order"+index);
   });  
}


function createOneOrder(ele, tag){
    var date = ele.orderDate ;
    var num = "订单号：" + ele.orderCode;
    var allPrice = "￥ ";
    var orderState = ele.order_state;
    var orderTable = $("#orderTable");
    var colspan = (ele.orderDetailed).length;
    var allMoney = 0;

    var $td = $("<td>").attr({"colspan" : 6 ,"class":"space"});
    $td.append($("<li>").text(date));
    $td.append(num);
    var $tr = $("<tr>").attr('class', tag).append($td);
    orderTable.append($tr);

    $.each(ele.orderDetailed, function(index, el){
        if(index == 0){
            allMoney += el.orderCommodity.commodity_price * el.orderCommodityCount;
            var $td1 = $("<td>");
            $td1.append($("<img>").attr("src",el.orderCommodity.commodity_picture0));
            $td1.append($("<li>").text(el.orderCommodity.commodity_name));
            var $tr = $("<tr>").attr('class', tag);
            $tr.append($td1);
            $tr.append($("<td>").text("￥ " + el.orderCommodity.commodity_price));
            $tr.append($("<td>").text(el.orderCommodityCount));
            
            $tr.append($("<td>").attr({"rowspan":colspan,"class":"allMoney"}));
            $tr.append($("<td>").attr("rowspan",colspan).text(orderState));
            $tr.append($("<td>").attr({"rowspan":colspan,"class":"deleteOrder"}).text("删除"));
            orderTable.append($tr);
        }else{
            allMoney += el.orderCommodity.commodity_price * el.orderCommodityCount;
            var $td1 = $("<td>");
            $td1.append($("<img>").attr("src",el.orderCommodity.commodity_picture));
            $td1.append($("<li>").text(el.orderCommodity.commodity_name));
            var $tr = $("<tr>").attr('class', tag);
            $tr.append($td1);
            $tr.append($("<td>").text("￥ " + el.orderCommodity.commodity_price));
            $tr.append($("<td>").text(el.orderCommodityCount));
            orderTable.append($tr);
        }
    });
    $("." + tag ).children(".allMoney").text("￥" + allMoney);
}

/*----------------------ajax---------------------------------*/
/**/
function initAjax(){
    $.ajax({
        url:"",
        type:"POST",
        dataType:"text",
        data:"",
        success:initBaseData,
        error:function(){
            alert("initAjax失败了！");
        }
    });
}

function changeBaseInfoAjax(sendData){
    $.ajax({
        url:"",
        type:"POST",
        dataType:"text",
        data:sendData,
        success:initBaseData,
        error:function(){
            alert("changeBaseInfoAjax失败了！");
        }
    });
}

function ajaxProvinceSelect(){
    $.ajax({
        url: 'http://localhost:8080/som/home/provinces.do',
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
    url :"http://localhost:8080/som/home/cities.do",
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
    url :"http://localhost:8080/som/home/countries.do",
    type :"POST",
    dataType:"text",
    data :{"cityId": infoId},
    success : createNewOption,
    error:function(data){
        alert("ajaxChangeCitySelect");
        }
    });
}

function initAddressAjax(data){
    $.ajax({
        url:"",
        type:"POST",
        dataType:"text",
        data: data,
        success:initAddressData,
        error:function(){
            alert("initAddressAjax失败辣！");
        }
    });
}

function deleteAddressAjax(data){
    $.ajax({
        url:"http://localhost:8080/som/buyersInfo/deleteUserAddress.do",
        type:"POST",
        dataType:"text",
        data:data,
        success:initAddressData,
        error:function(){
            alert("deleteAddressAjax失败辣！");
        }
    });
}

function createNewAddressAjax(data){
    $.ajax({
        url:"",
        type:"POST",
        dataType:"text",
        data: data,
        success:createAddress,
        error:function(){
            alert("changeAddressAjax失败辣！");
        }
    });
}

function initOrder(){
    $.ajax({
        url:"",
        type:"POST",
        dataType:"POST",
        data:"",
        success:"",
        error:function(){
            alert("initOrder失败辣！");
        }
    });
}

function modifyPasswordAjax(){
    $.ajax({
        url:"",
        type:"POST",
        dataType:"text",
        data:"",
        success:"",
        error:function(){
            alert("modifyPasswordAjax出错辣！");
        }

    });
}

function showMyVipAjax(){
    $.ajax({
        url:"",
        type:"POST",
        datatype:"text",
        data:"",
        success:"",
        error:function(){
            alert("showMyVipAjax出错辣！");
        }
    });
}