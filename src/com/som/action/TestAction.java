package com.som.action;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.model.LinkMarketAddress;
import com.som.model.MarketBasicInformation;
import com.som.model.UserAccount;
import com.som.service.IMarketBasicInformationService;
import com.som.service.IUserAccountService;

@Controller
@RequestMapping("/test")
public class TestAction {

	@Autowired
	private IMarketBasicInformationService imbis;
	@Autowired
	private IUserAccountService iuas;

	@RequestMapping("test")
	public void test(LinkMarketAddress l, HttpServletResponse response)
			throws IOException {
		System.out.println(l);
	}

	@RequestMapping("receive")
	public void receive(UserAccount u, MarketBasicInformation mbi,
			HttpServletResponse response) throws IOException {
		System.out.println("utest:" + u);
		System.out.println("mbitest:" + mbi);
		
		response.getWriter().write("success");
	}

	@RequestMapping("/find")
	public String find(HttpServletResponse response) throws IOException {
		UserAccount u = iuas.find(1);
		MarketBasicInformation m = imbis.getByUserId(u.getAccountId());

		JsonConfig jc = new JsonConfig();
		JsonConfig jc1 = new JsonConfig();

		jc1.setExcludes(new String[] { "vipMarket", "userOrders",
				"userAddresses", "userCarts", "accountPassword", });
		jc.setExcludes(new String[] {
				// MarketBasicInformation
				"vipUser", "market_userOrders", "market_commodity",
				"market_first", "market_user",
				// LinkMarketAddress
				"marketBasicInformation",
				// AddressProvince
				"province_city",
				// AddressCity
				"city_province", "city_contries",
				// AddressContry
				"contry_city",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String json = JSONObject.fromObject(m, jc).toString();
		String us = JSONObject.fromObject(u, jc1).toString();
		json = "{\"user\":" + us + ",\"market\":" + json + "}";
		System.out.println(json);
		response.getWriter().write(json);
		return json;
	}
}
