package com.som.action;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.model.UserAccount;
import com.som.model.UserCart;
import com.som.service.IMarketCommodityService;
import com.som.service.IUserAccountService;
import com.som.service.IUserCartService;

@Controller
@RequestMapping("userCart")
public class UserCartAction {

	@Autowired
	private IUserAccountService iuas;
	@Autowired
	private IUserCartService iucs;
	@Autowired
	private IMarketCommodityService imcs;

	@RequestMapping("add")
	public void add(HttpSession session, int marketCommdityID,
			int cartCommodityCount, HttpServletResponse response)
			throws IOException {
		UserAccount u = (UserAccount) session.getAttribute("user");
		UserCart usercart = iucs.getById(marketCommdityID, u.getAccountId());
		System.out.println("cartCommodityCount:test:"+cartCommodityCount);
		if (usercart != null) {
			usercart.setCartCommodityCount(usercart.getCartCommodityCount()+cartCommodityCount);
			iucs.update(usercart);
		} else {
			UserCart uc = new UserCart();

			uc.setCartCommodityCount(cartCommodityCount);
			uc.setMarketCommdity(imcs.find(marketCommdityID));
			uc.setCart_userAccount(u);

			iucs.add(uc);
		}
		response.getWriter().write("success");
	}

	@RequestMapping("delete")
	public void delete(int cart_user_id, int cart_commodity_id,
			int cartCommodityCount, HttpServletResponse response) {

		UserCart u = iucs.getById(cart_commodity_id, cart_user_id);
		iucs.delete(u.getId());
	}

	@RequestMapping("update")
	public void update(int cart_user_id, int cart_commodity_id,
			int cartCommodityCount, HttpServletResponse response) {

		UserCart u = iucs.getById(cart_commodity_id, cart_user_id);
		u.setCartCommodityCount(cartCommodityCount);
		iucs.update(u);
		System.out.println(u);
	}

	@RequestMapping("find")
	public void find(Integer id, HttpServletResponse response) throws IOException {
		System.out.println("usercart_find : "+id);

		UserAccount user = iuas.find(id);
		JsonConfig jc = new JsonConfig();
		System.out.println("start cycle");
		jc.setExcludes(new String[] {
				// useraccount
				"userBirthday", "userLogo", "accountPower", "accountPassword",
				"accountNumber", "userOrders", "userAddresses","vipMarket",
				// usercart
				"cart_userAccount",
				// marketCommdity
				"commodity_first_class", "commodity_second_class",
				// commodity_market
				"market_address", "market_user", "market_first",
				"market_commodity", "market_userOrders","vipUser",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String s = JSONObject.fromObject(user, jc).toString();
		System.out.println("this is test usercart :"+s);
		response.getWriter().write(s);
	}
}
