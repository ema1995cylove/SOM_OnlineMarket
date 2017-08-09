package com.som.action;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.som.model.UserAccount;

@Controller
@RequestMapping("check")
public class CheckAction {

	@RequestMapping("checkLogin")
	public void check(HttpSession session, HttpServletResponse response,
			String pre) throws IOException {
		UserAccount user = (UserAccount) session.getAttribute("user");
		System.out.println("checklogin:" + pre);

		JSONObject json = new JSONObject();
		if (user != null) {
			json.accumulate("path", "hasLogin");
			json.accumulate("power", user.getAccountPower());
			json.accumulate("userId", user.getAccountId());
			System.out.println("用户不是空："+user.getAccountPower());
		} else {
			json.accumulate("path", "/som/login.html?pre="
					+ pre);
		}

		String s = json.toString();
		System.out.println("checklogin's json:"+s);
		response.getWriter().write(s);
	}
}
