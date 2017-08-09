package com.som.action;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.som.model.MarketBasicInformation;
import com.som.model.MarketFirstClass;
import com.som.model.MarketSecondClass;
import com.som.service.IMarketBasicInformationService;
import com.som.service.IMarketSecondClassService;

@Controller
@RequestMapping("/marketHome")
public class MarketHomeAction {
	@Autowired
	private IMarketSecondClassService sservince;
	@Autowired
	private IMarketBasicInformationService mbService;

	@RequestMapping("/firstClasses")
	public void getFistClasses(HttpServletResponse response, HttpSession session)
			throws Exception {
		response.setCharacterEncoding("utf-8");
		Object marketIdObj = session.getAttribute("marketId");
		System.out.println("test:" + marketIdObj);
		if (marketIdObj == null) {
			response.getWriter().write("error");
			return;
		}
		Integer marketId = (Integer) marketIdObj;
		MarketBasicInformation m = mbService.find(marketId);
		Set<MarketFirstClass> list = m.getMarket_first();
		JsonConfig jc = new JsonConfig();
		jc.setExcludes(new String[] { "secondClasses" });
		String json = JSONArray.fromObject(list, jc).toString();
		response.getWriter().write(json);
	}

	@RequestMapping("secondeClasses")
	public void getSecondeClasses(HttpServletResponse response)
			throws IOException {
		List<MarketSecondClass> list = sservince.find();
		response.setCharacterEncoding("utf-8");
		JsonConfig cfg = new JsonConfig();
		cfg.setExcludes(new String[] { "secondClasses" });
		JSONArray json = JSONArray.fromObject(list, cfg);
		System.out.println(json.toString());
		response.getWriter().println(json.toString());
	}

	@RequestMapping("/toCommodityDetaild")
	public void reDirect(@RequestParam("commodityId") String commodityId,
			HttpSession session, HttpServletResponse response,
			HttpServletRequest request) {
		if (commodityId == null)
			return;
		else {

			int coId = Integer.parseInt(commodityId);

			session.setAttribute("commodityId", coId);
			try {
				request.getRequestDispatcher("../commodityInfo.html").forward(
						request, response);
			} catch (IOException e) {
				System.out.println("跳转失败");
				e.printStackTrace();
			} catch (ServletException e) {
				System.out.println("跳转失败");
				e.printStackTrace();
			}
		}
	}

	@RequestMapping("toCommodityList")
	public void reDirect(String confirstClassId, HttpSession session,
			HttpServletRequest request, HttpServletResponse response) {
		if (confirstClassId == null)
			return;
		System.out.println(confirstClassId);
		int id = Integer.parseInt(confirstClassId);
		session.setAttribute("firstClassId", id);
		try {
			System.out.println(request.getRequestURI().toString());
			request.getRequestDispatcher("../commodityList01.html").forward(
					request, response);
		} catch (IOException e) {
			System.out.println("跳转失败");
			e.printStackTrace();
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
