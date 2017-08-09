package com.som.action.jsonfileter;

import java.text.SimpleDateFormat;
import java.util.Date;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class DateValueProsess implements JsonValueProcessor {
	private String name;

	public DateValueProsess(String name) {
		this.name = name;
	}

	public Object processArrayValue(Object arg0, JsonConfig arg1) {
		return null;
	}

	public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
		if (arg0.equals(name)) {
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
			return sf.format((Date) arg1);
		}
		return null;
	}

}
