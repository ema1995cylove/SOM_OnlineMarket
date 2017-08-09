package com.som.action;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.som.action.jsonfileter.DateValueProsess;
import com.som.action.jsonfileter.MaketJsonPropertyFilter;
import com.som.action.jsonfileter.UserOrdersPropertyFilter;
import com.som.model.LinkUserAddress;
import com.som.model.MarketBasicInformation;
import com.som.model.UserAccount;
import com.som.model.UserOrder;
import com.som.service.ILinkUserAddressService;
import com.som.service.IUserAccountService;
import com.som.service.IUserOrderService;
import com.som.tool.Tool;

@Controller
@RequestMapping("/buyersInfo")
public class UserInfomationAction {
	@Autowired
	private IUserAccountService userAccountService;
	@Autowired
	private ILinkUserAddressService userAddressService;
	@Autowired
	private IUserOrderService userOrderService;

	@RequestMapping("/getBuyer")
	public void getBuyerById(String id, String sign,
			HttpServletResponse response, HttpServletRequest request)
			throws Exception {
		// if(id==null)
		// return;
		System.out.println(sign);
		id = "2";
		try {
			int idI = Integer.parseInt(id);
			UserAccount user = userAccountService.find(idI);
			if (sign != null && sign.equals("userInfo"))
				sendUserBase(response, request, user);
			else if (sign != null && sign.equals("userAddress"))
				sendUserAddress(response, request, idI);
			else if (sign != null && sign.equals("vipMarket"))
				sendVipMarket(response, request, idI);
			else if (sign != null && sign.equals("userOrder"))
				sendUserOrders(response, request, idI);
		} catch (NumberFormatException e) {
			e.printStackTrace();
			System.out.println("非法参数");
		} catch (IOException e) {
			System.out.println("数据返回失败");
			e.printStackTrace();
		}
	}

	private void sendUserBase(HttpServletResponse response,
			HttpServletRequest request, UserAccount user) throws IOException {
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.registerJsonValueProcessor(Date.class, new DateValueProsess(
				"userBirthday"));
		jsonCon.setExcludes(new String[] { "userCarts", "userOrders",
				"userAddresses", "accountPower", "vipMarket" });
		request.getSession().setAttribute("userInfo", user);
		JSONObject jsonO = JSONObject.fromObject(user, jsonCon);
		response.getWriter().println(jsonO);
	}

	private void sendVipMarket(HttpServletResponse response,
			HttpServletRequest request, int userId) {
		UserAccount user = (UserAccount) request.getSession().getAttribute(
				"userInfo");
		System.out.println(user);
		if (user == null) {
			user = userAccountService.find(userId);
			if (user == null)
				return;
		}
		Set<MarketBasicInformation> markets = user.getVipMarket();
		System.out.println(markets.size());
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setJsonPropertyFilter(new MaketJsonPropertyFilter());
		JSONArray cartsJson = JSONArray.fromObject(markets, jsonCon);
		System.out.println(cartsJson);
	}

	private void sendUserOrders(HttpServletResponse response,
			HttpServletRequest request, int userId) throws Exception {
		UserAccount user = (UserAccount) request.getSession().getAttribute(
				"userInfo");
		System.out.println(user);
		if (user == null) {
			user = userAccountService.find(userId);
			if (user == null)
				return;
		}
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setJsonPropertyFilter(new UserOrdersPropertyFilter());
		jsonCon.registerJsonValueProcessor(Date.class, new DateValueProsess(
				"orderDate"));
		Set<UserOrder> orders = user.getUserOrders();
		JSONArray orderJosn = JSONArray.fromObject(orders, jsonCon);
		System.out.println(orderJosn);
		response.getWriter().println(orderJosn);

		System.out.println(user.getAccountNumber());
	}

	private void deleteUserOrder(String orderId) {
		if (orderId == null
				&& !org.apache.commons.lang.StringUtils.isNumeric(orderId))
			return;
		int orderIdIn = Integer.parseInt(orderId);
		UserOrder userOrder = userOrderService.find(orderIdIn);
		userOrder.setOrderStatus(1);
		userOrderService.update(userOrder);

	}

	private void sendUserAddress(HttpServletResponse response,
			HttpServletRequest request, int userId) throws IOException {
		UserAccount user = (UserAccount) request.getSession().getAttribute(
				"userInfo");
		System.out.println(user);
		if (user == null) {
			user = userAccountService.find(userId);
			if (user == null)
				return;
		}
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setExcludes(new String[] { "address_userAccount",
				"province_city", "city_province", "city_contries",
				"contry_city" });
		Set<LinkUserAddress> userAddresses = user.getUserAddresses();
		JSONArray jsona = JSONArray.fromObject(userAddresses, jsonCon);

		System.out.println(jsona);
		response.getWriter().println(jsona);
		System.out.println(user.getAccountNumber());
	}

	@RequestMapping("deleteUserAddress")
	public void deleteAddress(String addressId, HttpServletResponse response) {
		if (addressId == null)
			return;
		int IAddressId;
		try {
			IAddressId = Integer.parseInt(addressId);

		} catch (Exception e) {
			System.out.println("数据格式错误");
			return;
		}
		System.out.println(IAddressId);
		userAddressService.delete(IAddressId);
		try {
			response.getWriter().println();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping("addAddress")
	public void addAddress(LinkUserAddress address) {
		userAddressService.add(address);
	}

	public void midifyAddress(LinkUserAddress address) {
		Integer addressId = address.getId();
		if (addressId == null)
			return;
		LinkUserAddress useraddress = userAddressService.find(addressId);
		Tool.updateUser(useraddress, address);
		userAddressService.update(address);
	}

	@RequestMapping("saveUser")
	public void setUserInfo(UserAccount user, MultipartFile file,
			HttpServletResponse response, HttpServletRequest request) {
		// String fileName;
		// if(file==null)
		// return ;
		// if(!(fileName=saveFile(file,"userImage")).equals("")){
		// System.out.println(fileName);
		//
		// }
		System.out.println(user);
		int id = user.getAccountId();
		System.out.println(id);
		UserAccount user1 = userAccountService.find(id);
		Tool.updateUser(user1, user);
		userAccountService.update(user1);
		System.out.println("user1" + user1.getUserSex());
		System.out.println("user" + user.getUserSex());
		try {
			this.sendUserBase(response, request, user1);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private String saveFile(MultipartFile file, String Addpath) {
		String webPath = getClass().getResource("../../../../../").getPath()
				.substring(1);
		File userImage = new File(webPath + "/" + Addpath + "/"
				+ System.currentTimeMillis() + file.getOriginalFilename());
		try {
			if (!userImage.exists()) {
				userImage.createNewFile();
				file.transferTo(userImage);
			}
		} catch (IOException e) {
			System.out.println("创建文件失败");
			e.printStackTrace();
			return "";
		}
		return userImage.getName();
	}

	@RequestMapping("modifyPassword")
	public void modifyPassword() {

	}
}
