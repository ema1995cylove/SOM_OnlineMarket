package com.som.test;

import java.util.HashMap;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.som.model.MarketBasicInformation;
import com.som.model.MarketCommodity;
import com.som.model.MarketFirstClass;
import com.som.model.UserAccount;
import com.som.model.UserOrder;
import com.som.service.IAddressCityService;
import com.som.service.IAddressCountryService;
import com.som.service.IAddressProvinceService;
import com.som.service.ILinkMarketAddressService;
import com.som.service.ILinkUserAddressService;
import com.som.service.IMarketBasicInformationService;
import com.som.service.IMarketCommodityService;
import com.som.service.IMarketFirstClassService;
import com.som.service.IUserAccountService;
import com.som.service.IUserCartService;
import com.som.service.IUserOrderDetailedService;
import com.som.service.IUserOrderService;

public class Demo {
	static ApplicationContext ctx = new ClassPathXmlApplicationContext(
			"applicationContext.xml");

	public static void main(String[] args) {
		IMarketBasicInformationServiceTest();
	}

	@SuppressWarnings("unused")
	private static void ILinkMarketAddressServiceTest() {
		ILinkMarketAddressService ilmas = (ILinkMarketAddressService) ctx
				.getBean("linkMarketAddressServiceImpl");
	}

	@SuppressWarnings("unused")
	private static void IMarketFirstClassServiceTest() {
		IMarketFirstClassService imfcs = (IMarketFirstClassService) ctx
				.getBean("marketFirstClassServiceImpl");

		JsonConfig jc = new JsonConfig();

		MarketFirstClass firstClass = imfcs.find(2);

		jc.setExcludes(new String[] {
				// MarketSecondClass
				"market_first_class",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String s = JSONObject.fromObject(firstClass, jc).toString();
		System.out.println(s);
	}

	@SuppressWarnings("unused")
	private static void IAddressProvinceServiceTest() {
		IAddressProvinceService iaps = (IAddressProvinceService) ctx
				.getBean("addressProvinceServiceImpl");
	}

	@SuppressWarnings("unused")
	private static void IAddressCityServiceTest() {
		IAddressCityService iacs = (IAddressCityService) ctx
				.getBean("addressCityServiceImpl");
	}

	@SuppressWarnings("unused")
	private static void IAddressContryServiceTest() {
		IAddressCountryService iacos = (IAddressCountryService) ctx
				.getBean("addressContryServiceImpl");
	}

	private static void IUserOrderServiceTest() {
		IUserOrderService iuos = (IUserOrderService) ctx
				.getBean("userOrderServiceImpl");
		JsonConfig jc = new JsonConfig();

		List<UserOrder> l = iuos.getByMarketId(1);

		jc.setExcludes(new String[] {
				// UserOrder
				"marketBaseInfamation",
				// UserAccount
				"vipMarket", "userOrders", "userAddresses", "userCarts",
				"userBirthday", "userLogo",
				"accountPower",
				"accountPassword",
				// orderDetailed
				"order",
				// MarketCommodity
				"commodity_second_class", "commodity_first_class",
				"commodity_market", "commodity_picture1", "commodity_picture2",
				"commodity_picture3", "hibernateLazyInitializer" });
		String s = JSONArray.fromObject(l, jc).toString();
		System.out.println(s);
	}

	@SuppressWarnings("unused")
	private static void IUserCartServiceTest() {
		IUserCartService iucs = (IUserCartService) ctx
				.getBean("userCartServiceImpl");

		iucs.delete(2);
	}

	@SuppressWarnings("unused")
	private static void ILinkUserAddressServiceTest() {
		ILinkUserAddressService iluas = (ILinkUserAddressService) ctx
				.getBean("linkUserAddressServiceImpl");
	}

	@SuppressWarnings("unused")
	private static void IMarketCommodityServiceTest() {
		IMarketCommodityService imcs = (IMarketCommodityService) ctx
				.getBean("marketCommodityServiceImpl");
		JsonConfig jc = new JsonConfig();

		List<MarketCommodity> l = imcs.getBySecondId(2);

		jc.setExcludes(new String[] {
				// MarketCommodity
				"commodity_market", "commodity_first_class",
				"commodity_second_class",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String s = JSONArray.fromObject(l, jc).toString();
		System.out.println(s);
	}

	private static void IMarketBasicInformationServiceTest() {
		IMarketBasicInformationService imbis = (IMarketBasicInformationService) ctx
				.getBean("marketBasicInformationServiceImpl");
		IUserAccountService iuas = (IUserAccountService) ctx
				.getBean("userAccountServiceImpl");
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
		json = "{\"user\":\"" + us + "\",\"market\":" + json + "}";

		System.out.println(json);
	}

	@SuppressWarnings("unused")
	private static void IUserOrderDetailedServiceTest() {
		IUserOrderDetailedService iusodds = (IUserOrderDetailedService) ctx
				.getBean("userOrderDetailedServiceImpl");
	}
}
