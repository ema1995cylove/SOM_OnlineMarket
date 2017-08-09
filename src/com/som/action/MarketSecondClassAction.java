package com.som.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.model.MarketSecondClass;
import com.som.service.IMarketSecondClassService;

@Controller
@RequestMapping("marketSecondClass")
public class MarketSecondClassAction {
	@Autowired
	private IMarketSecondClassService sservince;

	@RequestMapping("find")
	public void find(HttpServletResponse response) throws IOException {
		List<MarketSecondClass> list = sservince.find();
		response.setCharacterEncoding("utf-8");

		JsonConfig cfg = new JsonConfig();
		cfg.setExcludes(new String[]{"secondClasses"});
		JSONArray json = JSONArray.fromObject(list, cfg);
		System.out.println(json.toString());
		response.getWriter().println(json.toString());
	}
}
