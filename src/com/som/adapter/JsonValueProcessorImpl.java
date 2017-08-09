package com.som.adapter;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JsonConfig;

public class JsonValueProcessorImpl {

	public static JsonValueProcessorAdapter Adapter_Date() {
		JsonValueProcessorAdapter s = new JsonValueProcessorAdapter() {
			@Override
			public Object processObjectValue(String arg0, Object arg1,
					JsonConfig arg2) {
				if (arg1 != null) {
					Date d = (Date) arg1;
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					return sdf.format(d);
				}
				return null;
			}
		};
		return s;
	}
}
