package com.som.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.model.UserOrder;
import com.som.service.IUserOrderDetailedService;
import com.som.service.IUserOrderService;

@Controller
@RequestMapping("account")
public class AccountAction {
	@Autowired
	private IUserOrderService service;
	// @Autowired
	// private UserOrder user;
	@Autowired
	private IUserOrderDetailedService service1;

	@RequestMapping("find")
	public void find(HttpServletRequest request, HttpServletResponse response,
			Integer oderId) throws IOException {

		UserOrder user = service.find(oderId);

		response.setCharacterEncoding("utf-8");

		JsonConfig cfg = new JsonConfig();
		cfg.setExcludes(new String[] { "accountPassword", "accountNumber",
				"accountPower", "userLogo", "userBirthday", "userOrders",
				"vipMarket", "cart_userAccount", "marketCommdity",
				" address_userAccount", "marketBasicInformation",
				"province_city", "city_province", "city_contries",
				"contry_city", "market_address", "market_user",
				"market_userOrders", "vipUser", "market_first",
				"market_commodity", "order", "commodity_market",
				"commodity_count", "commodity_brand",
				"commodity_specifications", "commodity_picture1",
				"commodity_vip_price", "commodity_picture2",
				"commodity_picture3", "secondClasses", "market_first_class" });
		JSONArray json = JSONArray.fromObject(user, cfg);
		System.out.println(json.toString());
		response.getWriter().println(json.toString());

	}

	@RequestMapping("deleteOne")
	private void deleteOne(HttpServletRequest request,
			HttpServletResponse response, Integer id) {

		service1.delete(id);
		try {
			response.getWriter().println();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@RequestMapping("deleteAll")
	private void deleteAll(HttpServletRequest request,
			HttpServletResponse response, String oderId) {

		String[] str = oderId.split(" ");
		int[] num = new int[str.length];
		for (int i = 0; i < num.length; i++) {
			num[i] = Integer.parseInt(str[i]);
			service.delete(num[i]);
		}
		try {
			response.getWriter().println("");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		;
	}

	@RequestMapping("test")
	public void test(HttpServletResponse response) throws InterruptedException,
			IOException {
		System.out.println("test");
		Thread.sleep(10000);

		response.getWriter().println();
	}

	@RequestMapping("test1")
	public void test2(HttpServletResponse response)
			throws InterruptedException, IOException {
		System.out.println("test1");
		Thread.sleep(10000);

		response.getWriter().println();
	}

}
