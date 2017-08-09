package com.som.action;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.adapter.JsonValueProcessorImpl;
import com.som.model.MarketBasicInformation;
import com.som.model.MarketCommodity;
import com.som.model.MarketFirstClass;
import com.som.model.MarketSecondClass;
import com.som.model.UserAccount;
import com.som.model.UserOrder;
import com.som.service.IMarketBasicInformationService;
import com.som.service.IMarketCommodityService;
import com.som.service.IMarketFirstClassService;
import com.som.service.IMarketSecondClassService;
import com.som.service.IUserAccountService;
import com.som.service.IUserOrderService;

@Controller
@RequestMapping("mbia")
public class MarketBasicInformationAction {
	@Autowired
	private IMarketBasicInformationService imbis;
	@Autowired
	private IMarketFirstClassService imfcs;
	@Autowired
	private IMarketSecondClassService imscs;
	@Autowired
	private IMarketCommodityService imcs;
	@Autowired
	private IUserOrderService iuos;
	@Autowired
	private IUserAccountService iuas;

	// VIP用户的删除
	@RequestMapping("marketVipUserDelete")
	public void marketVipUserDelete(int market_id, String accountNumber,
			HttpServletResponse response) throws IOException {

		// 查出这个超市的VIP用户，
		MarketBasicInformation m = imbis.find(market_id);
		// 查出这个要删除的用户
		UserAccount u = iuas.getByAccount(accountNumber);
		// 把关联关系一删
		if (m != null) {
			if (u != null) {
				m.getVipUser().remove(u);
				imbis.update(m);
				response.getWriter().write("success");
			} else {
				response.getWriter().write("nouser");
			}
		} else {
			response.getWriter().write("nomarket");
		}
		// 任何一步出错就返回错误信息
	}

	// VIP用户的添加
	@RequestMapping("marketVipUserAdd")
	public void marketVipUserAdd(int market_id, String accountNumber,
			HttpServletResponse response) throws IOException {

		// 查出这个超市的VIP用户，
		MarketBasicInformation m = imbis.find(market_id);
		// 查出这个要添加的用户
		UserAccount u = iuas.getByAccount(accountNumber);
		// 把关联关系一+
		if (u == null) {
			response.getWriter().write("nouser");
		} else {
			if (m.getVipUser().contains(u)) {
				response.getWriter().write("hasVipUser");
			} else {
				m.getVipUser().add(u);
				imbis.update(m);
			}
		}
	}

	// VIP用户查询
	@RequestMapping("marketVipUserFind")
	public void marketVipUserFind(int market_id, HttpServletResponse response)
			throws IOException {
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(marketVipUserFindDemo(market_id));
	}

	private String marketVipUserFindDemo(int marketId) {
		JsonConfig jc = new JsonConfig();

		MarketBasicInformation m = imbis.find(marketId);

		jc.setExcludes(new String[] {
				// MarketBasicInformation
				"market_logo", "market_name", "market_userOrders",
				"market_commodity", "market_first", "market_user",
				"market_address",
				// UserAccount---vipUser
				"vipMarket", "userOrders", "userAddresses", "userCarts",
				"accountPower", "accountPassword",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String s = JSONArray.fromObject(m, jc).toString();
		return s;
	}

	// 订单查询
	@RequestMapping("marketOrderFind")
	public void marketOrderFind(int marketId, HttpServletResponse response)
			throws IOException {
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(marketOrderFindDemo(marketId));
	}

	private String marketOrderFindDemo(int marketId) {
		JsonConfig jc = new JsonConfig();

		List<UserOrder> l = iuos.getByMarketId(marketId);

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
		return s;
	}

	// 商品的修改增加
	@RequestMapping("marketCommoditySave")
	public void marketCommoditySave(int market_id, int first_class_id,
			int second_class_id, MarketCommodity mc,
			HttpServletResponse response, File[] commodity_picture)
			throws IOException {// TODO

		System.out.println("markettest"+market_id);
		System.out.println(mc);
		System.out.println(commodity_picture.length);

		// 为了保证信息的正确，还是要一个超市的ID进行保证，以及一个大类ID,小类ID加以验证
		// 查出超市，再查出超市的大类信息，再查出对应的小类信息，以及商品信息，验证是否存在对应的商品
		// 存在就进行UPDATE
		// 不存在就返回报错信息
	}

	// 商品查询
	@RequestMapping("marketCommodityFind")
	public void marketCommodityFind(int second_class_id,
			HttpServletResponse response) throws IOException {
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(marketCommodityFindDemo(second_class_id));
	}

	private String marketCommodityFindDemo(int secondId) {
		JsonConfig jc = new JsonConfig();

		List<MarketCommodity> l = imcs.getBySecondId(secondId);

		jc.setExcludes(new String[] {
				// MarketCommodity
				"commodity_market", "commodity_first_class",
				"commodity_second_class",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String s = JSONArray.fromObject(l, jc).toString();
		return s;
	}

	// 小类的修改添加
	@RequestMapping("marketSecondSE")
	public void marketSecondSave(int first_class_id, MarketSecondClass msc,
			String flag, HttpServletResponse response) throws IOException {// TODO
		// 其实，在这种情况下，大类肯定是有的，超市肯定也是有的，不存在什么没超市没大类的之类的情况，应该！！
		// 查出超市，再查出超市的大类信息，再查出对应的小类信息，进行验证这个超市是否存在这个小类
		MarketFirstClass f = imfcs.find(first_class_id);
		Set<MarketSecondClass> s = f.getSecondClasses();
		MarketSecondClass ms = null;
		if (!flag.equals("add")) {
			ms = imscs.find(msc.getSecond_class_id());
		}
		if (s.contains(ms)) {
			if (flag.equals("delete")) {
				s.remove(ms);
				imfcs.update(f);
				imscs.delete(msc.getSecond_class_id());
				response.getWriter().write("");
			} else {
				response.getWriter().write("hasSecondClass");
			}
		} else {
			if (flag.equals("add")) {
				s.add(msc);
				imfcs.update(f);
				response.getWriter().write("{}");
			} else if (flag.equals("update")) {
				imscs.update(ms);
				response.getWriter().write("{}");
			} else {
				response.getWriter().write("secondNotExits");
			}
		}
		// 存在就进行UPDATE
		// 不存在就返回报错信息
	}

	// 小类的查询
	@RequestMapping("marketSecondFind")
	public void marketSecondFind(int first_class_id,
			HttpServletResponse response) throws IOException {
		response.setCharacterEncoding("utf-8");
		String js = marketSecondFindDemo(first_class_id);
		response.getWriter().write(js);
	}

	// 查询大类,根据ID查，然后带出小类
	private String marketSecondFindDemo(int firstClassId) {
		JsonConfig jc = new JsonConfig();

		MarketFirstClass firstClass = imfcs.find(firstClassId);

		jc.setExcludes(new String[] {
				// MarketSecondClass
				"market_first_class",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String s = JSONObject.fromObject(firstClass, jc).toString();
		return s;
	}

	// 大类 修改&添加&add
	@RequestMapping("marketFirstSE")
	public void marketFirstEdit(int market_id, MarketFirstClass mfc,
			String flag, HttpServletResponse response) throws IOException {
		// 为了保证信息的正确，还是要一个超市的ID进行保证
		MarketBasicInformation m = imbis.find(market_id);
		// 查出超市，再查出超市的大类信息，进行验证这个超市是否存在这个大类
		Set<MarketFirstClass> l = m.getMarket_first();

		if (l.contains(mfc)) {
			if (flag.equals("delete")) {
				m.getMarket_first().remove(mfc);
				imbis.update(m);
				imfcs.delete(mfc.getFirst_class_id());
				response.getWriter().println("{}");
			} else {
				response.getWriter().write("{\"msg\":\"hasFirstClass\"}");
			}
		} else {
			if (flag.equals("add")) {
				m.getMarket_first().add(mfc);
				imbis.update(m);
				response.getWriter().write("{}");
			} else if (flag.equals("update")) {
				imfcs.update(mfc);
				response.getWriter().write("{}");
			} else {
				response.getWriter().println("{\"msg\":\"firstNotExits\"}");
			}
		}
		// 存在就进行UPDATE
		// 不存在就返回报错信息
	}

	// 大类查询
	@RequestMapping("marketFirstFind")
	public void marketFirstFind(int market_id, HttpServletResponse response)
			throws IOException {
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(marketFirstFindDemo(market_id));
	}

	// 根据用户ID查超市，获得超市大类信息
	private String marketFirstFindDemo(int market_id) {
		JsonConfig jc = new JsonConfig();

		MarketBasicInformation m = imbis.find(market_id);

		jc.setExcludes(new String[] {
				// MarketBasicInformation
				"market_logo", "market_name", "vipUser", "market_userOrders",
				"market_commodity", "market_user", "market_address",
				// MarketFirstClass
				"secondClasses",
				// 多出的属性？
				"hibernateLazyInitializer" });
		String s = JSONObject.fromObject(m, jc).toString();
		return s;
	}

	// 修改用户密码
	@RequestMapping("editBasicPwd")
	public void editBasicPwd(String accountPassword, String newPwd, int userid,
			HttpServletResponse response) throws IOException {
		System.out.println(userid);
		System.out.println(accountPassword);

		UserAccount u = iuas.find(userid);
		if (u.getAccountPassword().equals(accountPassword)) {
			u.setAccountPassword(newPwd);
			iuas.update(u);
			response.getWriter().write("success");
		} else {
			response.getWriter().write("pwdError");
		}
	}

	// 修改用户基本信息
	@RequestMapping("editBasicInfo")
	public void editBasicInformation(HttpServletResponse response,
			HttpSession session, UserAccount ua) throws IOException {
		UserAccount u = (UserAccount) session.getAttribute("user");
		u.setUserBirthday(ua.getUserBirthday());
		u.setUserName(ua.getUserName());
		iuas.update(u);
		response.getWriter().write("success");
		// 找出存在的useraccount
		// 存在就吧需要保存的进行set
		// 不存在就返回错误信息
	}

	// 获取超市商户所有者的基本信息
	@RequestMapping("userBasicInfo")
	public void userBasicInformation(HttpServletResponse response,
			HttpSession session) throws IOException {
		response.setCharacterEncoding("utf-8");
		UserAccount u = (UserAccount) session.getAttribute("user");

		if (u == null) {
			// 没有找到用户。
			// 返回登录页面
			response.getWriter().write("nouser");
		} else {
			String s = userBasicInformationDemo(u);
			System.out.println(s);
			response.getWriter().write(s);
		}
	}

	private String userBasicInformationDemo(UserAccount u) {
		JsonConfig jc = new JsonConfig();
		jc.registerJsonValueProcessor(Date.class,
				JsonValueProcessorImpl.Adapter_Date());
		jc.setExcludes(new String[] { "vipMarket", "userOrders",
				"userAddresses", "userCarts", "accountPower",
				"accountPassword", });
		return JSONObject.fromObject(u, jc).toString();
	}

	// 访问超市基本信息，第一个页面
	@RequestMapping("basicInfo")
	public void basicInformation(HttpServletResponse response,
			HttpSession session) throws IOException {
		response.setCharacterEncoding("utf-8");
		UserAccount u = (UserAccount) session.getAttribute("user");
		if (u == null || u.getAccountPower().equals(0)) {
			// 没有找到用户。
			// 返回登录页面
			response.getWriter().write("{\"msg\":\"nouser\"}");
		} else {
			response.getWriter().write(basicInformationDemo(u));
		}
	}

	// 根据用户手机号查超市获得超市基本信息
	private String basicInformationDemo(UserAccount u) {
		MarketBasicInformation m = imbis.getByUserId(u.getAccountId());

		JsonConfig jc = new JsonConfig();
		JsonConfig jc1 = new JsonConfig();
		jc1.registerJsonValueProcessor(Date.class,
				JsonValueProcessorImpl.Adapter_Date());

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
		System.out.println(json);
		String us = JSONObject.fromObject(u, jc1).toString();
		json = "{\"user\":" + us + ",\"market\":" + json + "}";
		System.out.println(json);
		return json;
	}
}
