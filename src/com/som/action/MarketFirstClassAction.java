package com.som.action;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.model.MarketFirstClass;
import com.som.service.IMarketFirstClassService;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

@Controller
@RequestMapping("/marketFirstClass")
public class MarketFirstClassAction {
	@Autowired
	private IMarketFirstClassService service;

	@RequestMapping("/find")
	public void find(HttpServletResponse response) throws Exception {
		System.out.println("dfddddd");
		List<MarketFirstClass> list = service.find();
		// System.out.println(service.find().toString());

		System.out.println("test out");
		JsonConfig jc = new JsonConfig();
		jc.setExcludes(new String[] { "secondClasses" });
		String json = JSONArray.fromObject(list, jc).toString();
		// System.out.println(json);
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(json);

	}
}
