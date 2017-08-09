package com.som.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.model.LinkMarketAddress;
import com.som.model.MarketBasicInformation;
import com.som.model.UserAccount;
import com.som.service.ILinkMarketAddressService;
import com.som.service.IMarketBasicInformationService;
import com.som.service.IUserAccountService;

@Controller
@RequestMapping("userAccount")
public class UserAccountAction {

	@Autowired
	private IUserAccountService iuas;
	@Autowired
	private IMarketBasicInformationService imbis;
	@Autowired
	private ILinkMarketAddressService ilmas;

	// 购物车初始化
	// @RequestMapping("cart")
	// public void userCart(int id, HttpServletResponse response)
	// throws IOException {
	// UserAccount user = iuas.find(id);
	// response.setCharacterEncoding("utf-8");
	// JsonConfig jc = new JsonConfig();
	// jc.setExcludes(new String[] {
	// // useraccount
	// "userBirthday", "userLogo", "accountPower", "accountPassword",
	// "accountNumber", "userOrders", "userAddresses",
	// // usercart
	// "userAccount",
	// // marketCommdity
	// "commodity_first_class", "commodity_second_class",
	// // commodity_market
	// "market_address", "market_user", "market_first",
	// "market_commodity", "userOrders",
	// // 多出的属性？
	// "hibernateLazyInitializer" });
	// String s = JSONArray.fromObject(user, jc).toString();
	// response.getWriter().write("success");
	// }

	// 注册跳这里
	@RequestMapping("register")
	public void register(UserAccount u, MarketBasicInformation mbi,
			LinkMarketAddress lma, String pre, HttpSession session,
			HttpServletResponse response) throws IOException {
		// TODO 这里全部应该加到事物中，不然没法错误后返回！！！
		response.setCharacterEncoding("utf-8");
		UserAccount user = iuas.getByAccount(u.getAccountNumber());
		System.out.println("registertest:" + mbi);
		System.out.println("registertest:" + u);
		System.out.println("registertest:" + lma);

		if (user != null) {
			response.getWriter().write("haveUser");
		} else {
			iuas.add(u);
			user = iuas.getByAccount(u.getAccountNumber());
			if (user.getAccountPower().equals(1)) {
				// 说明是商家用户
				ilmas.add(lma);
				lma = ilmas.getByPCCD(										//根据省ID、市ID、区ID和具体地址查询
						lma.getMarketAddress_province().getProvince_id(), 	//pid
						lma.getMarketAddress_city().getCity_id(), 			//cid,市ID
						lma.getMarketAddress_contry().getContry_id(), 		//COID，区ID
						lma.getMarketAddress_detailed());					//detail
				mbi.setMarket_address(lma);
				mbi.setMarket_user(user);
				imbis.add(mbi);
			}
			session.setAttribute("user", user);
			if (pre == null || pre.equals("null") || pre.trim().equals(""))
				// 如果为空就跳平台首页
				pre = "index.html";
			response.getWriter().write(pre);
		}
	}

	// 查找用户，在登录时使用
	@RequestMapping("login")
	public void findUser(UserAccount u, String pre,
			HttpServletResponse response, HttpServletRequest request,
			HttpSession session) throws IOException {
		UserAccount user = iuas.getByAccount(u.getAccountNumber());
		response.setCharacterEncoding("utf-8");
		// 账号不对
		// 状态不对
		// 密码不对

		if (user == null || u == null
				|| !u.getAccountPower().equals(user.getAccountPower())) {
			response.getWriter().write("nouser");
			return;
		}

		if (u.getAccountPassword().equals(user.getAccountPassword())) {
			session.setAttribute("user", user);
			if (pre.equals("null") || pre.trim().equals("")) {
				// 如果为空就跳平台首页
				pre = "index.html";
			}
			response.getWriter().write(pre);
			return;
		}
		System.out.println("mimacuowu");
		response.getWriter().write("pwError");
	}
}
