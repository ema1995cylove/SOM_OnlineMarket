package com.som.action;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.action.jsonfileter.CommodityMarketJsonFilter;
import com.som.model.MarketBasicInformation;
import com.som.model.MarketCommodity;
import com.som.service.IMarketBasicInformationService;
import com.som.service.IMarketCommodityService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@Controller
@RequestMapping("/commodities")
public class CommodityAction {
	@Autowired
	private IMarketCommodityService MarketCommodityService;
	@Autowired
	private IMarketBasicInformationService imbis;
	
	
	@Autowired
	private IMarketCommodityService imcService;
	@RequestMapping("/commdity")
	public void getCommodity(Integer commodityId, HttpServletResponse response,
			HttpSession session) throws IOException {
		//System.out.println("commodityId"+commodityId);
		Object value = session.getAttribute("commodityId");
		Integer idI = null;
		if(value != null){
			idI = (Integer) value;
		}
		if(commodityId != null){
			idI = commodityId;
		}
		if(value == null && commodityId == null ){
			response.getWriter().print("no commodityId");
			return;
		}
		//System.out.println(idI);
		MarketCommodity commodity = MarketCommodityService.find(idI);
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setJsonPropertyFilter(new CommodityMarketJsonFilter());
		// jsonCon.setExcludes(new
		// String[]{"commodity_first_class","commodity_second_class"});
		JSONObject JsonO = JSONObject.fromObject(commodity, jsonCon);
		System.out.println(JsonO);
		try {
			response.getWriter().println(JsonO);
		} catch (IOException e) {
			System.out.println("数据返回失败");
			e.printStackTrace();
		}

	}

	@RequestMapping("/allCommoditys")
	public void find(HttpServletResponse response, HttpSession session)
			throws Exception {
		response.setCharacterEncoding("utf-8");

		Object marketIdObj = session.getAttribute("marketId");
		if (marketIdObj == null)
			return;
		Integer marketId = (Integer) marketIdObj;
		MarketBasicInformation m = imbis.find(marketId);
		Set<MarketCommodity> list = m.getMarket_commodity();

		JsonConfig cfg = new JsonConfig();
		cfg.setExcludes(new String[] { "market_address", "market_user",
				"market_first", "market_commodity", "userOrders",
				"commodity_market", "commodity_first_class",
				"commodity_second_class" });

		String json = JSONArray.fromObject(list, cfg).toString();
		System.out.println(json);
		response.getWriter().write(json);
	}
	
	@RequestMapping("find1")
	public void find(Integer first_class_id,  HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		response.setCharacterEncoding("utf-8");
		List<MarketCommodity> list = imcService.findByFirstClassId(first_class_id);
		JsonConfig cfg = new JsonConfig();
		cfg.setExcludes(new String[]{"commodity_market","commodity_second_class","secondClasses","commodity_count","commodity_vip_price",
		"commodity_specifications","commodity_picture1","commodity_picture2","commodity_picture3"		
		});
		JSONObject jsono=new JSONObject();
		JSONArray json=JSONArray.fromObject(list, cfg);
		jsono.accumulate("firstList", json);
//		jsono.accumulate("first_class_id",mc.getCommodity_first_class().getFirst_class_id());
//		jsono.accumulate("first_class_name",mc.getCommodity_first_class().getFirst_class_name() );
//		System.out.println(json.toString());
		System.out.println(jsono);
		response.getWriter().println(jsono.toString());
	}
	
	@RequestMapping("/find2")
	public void find2(Integer first_class_id,Integer second_class_id,HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		List<MarketCommodity> list=imcService.getBySecondId(second_class_id);
		response.setCharacterEncoding("utf-8");
		System.out.println(list.toString());
		JsonConfig cfg = new JsonConfig();
		cfg.setExcludes(new String[]{"commodity_market","market_first_class","secondClasses","commodity_count","commodity_vip_price",
		"commodity_specifications","commodity_picture1","commodity_picture2","commodity_picture3"		
		});
		JSONObject jsono=new JSONObject();
		JSONArray json=JSONArray.fromObject(list, cfg);
		jsono.accumulate("sencondList", json);
		response.getWriter().println(jsono);
//		jsono.accumulate("", value)
	}

}
