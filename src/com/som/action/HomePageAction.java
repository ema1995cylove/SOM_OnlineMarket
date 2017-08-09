package com.som.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.action.jsonfileter.MaketJsonPropertyFilter;
import com.som.model.AddressCity;
import com.som.model.AddressContry;
import com.som.model.AddressProvince;
import com.som.model.MarketBasicInformation;
import com.som.service.IAddressCityService;
import com.som.service.IAddressCountryService;
import com.som.service.IAddressProvinceService;
import com.som.service.IMarketBasicInformationService;

@Controller
@RequestMapping("home")
public class HomePageAction {
	@Autowired
	private IAddressProvinceService provineService;
	@Autowired
	private IAddressCityService cityService;
	@Autowired
	private IAddressCountryService countryService;
	@Autowired
	private IMarketBasicInformationService marketService;

	@RequestMapping("provinces")
	public void getProvinces(HttpServletResponse response) throws IOException {

		List<AddressProvince> provinces = provineService.find();
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setExcludes(new String[] { "province_city" });
		JSONArray jsonArray = JSONArray.fromObject(provinces, jsonCon);
		JSONObject json = new JSONObject();
		json.accumulate("provinces", json);
		JSONObject jsonO = new JSONObject();
		jsonO.accumulate("province", jsonArray);
		jsonO.accumulate("class", "province");
		PrintWriter writer = response.getWriter();
		System.out.println(jsonO);
		writer.println(jsonO);
		writer.close();
	}

	@RequestMapping("cities")
	public void getCitis(String provinceId, HttpServletResponse response)
			throws IOException {
		if (provinceId == null) {
			return;
		}
		int provinceI = Integer.parseInt(provinceId);
		List<AddressCity> cityList = cityService.getByProvince(provinceI);
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setExcludes(new String[] { "city_province", "city_contries" });
		JSONArray jsona = JSONArray.fromObject(cityList, jsonCon);
		JSONObject jsonO = new JSONObject();
		jsonO.accumulate("class", "city");
		jsonO.accumulate("cities", jsona);
		System.out.println(jsonO);
		response.getWriter().println(jsonO);
	}

	@RequestMapping("countries")
	public void getCountry(String cityId, HttpServletResponse response)
			throws IOException {
		if (cityId == null) {
			return;
		}
		int cityI = Integer.parseInt(cityId);
		List<AddressContry> citys = this.countryService.getByCity(cityI);
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setExcludes(new String[] { "contry_city" });
		JSONArray jsonA = JSONArray.fromObject(citys, jsonCon);
		JSONObject jsonO = new JSONObject();
		jsonO.accumulate("contries", jsonA);
		jsonO.accumulate("class", "contries");
		System.out.println(jsonO);
		response.getWriter().println(jsonO);
	}

	@RequestMapping("markets")
	public void getMarkets(HttpServletResponse response, String countryName,
			String countryId) throws IOException {
		int countryI;
		if (countryId == null && countryName == null) {
			return;
		}
		List<MarketBasicInformation> markets;
		if (countryName != null) {
			markets = marketService.getByCountryName(countryName);
		} else {
			countryI = Integer.parseInt(countryId);
			markets = marketService.getByCountry(countryI);
		}
		JsonConfig jsonCon = new JsonConfig();
		jsonCon.setJsonPropertyFilter(new MaketJsonPropertyFilter());
		JSONArray jsonA = JSONArray.fromObject(markets, jsonCon);
		JSONObject jsonO = new JSONObject();
		jsonO.accumulate("markets", jsonA);
		jsonO.accumulate("class", "markets");
		System.out.println(jsonO);
		response.getWriter().println(jsonO);
	}

	@RequestMapping("toMarketHome")
	public void reDirect(String marketId, HttpSession session,
			HttpServletRequest request, HttpServletResponse response) {
		if (marketId == null)
			return;
		System.out.println(marketId);
		int id = Integer.parseInt(marketId);
		session.setAttribute("marketId", id);
		try {
			System.out.println(request.getRequestURI().toString());
			request.getRequestDispatcher("../marketHome01.html").forward(request,
					response);
			// response.sendRedirect("../marketHome.html");
		} catch (IOException e) {
			System.out.println("跳转失败");
			e.printStackTrace();
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
