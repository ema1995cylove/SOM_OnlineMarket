package com.som.action.jsonfileter;

import com.som.model.MarketBasicInformation;
import com.som.model.MarketFirstClass;
import com.som.model.MarketSecondClass;

import net.sf.json.util.PropertyFilter;

public class CommodityMarketJsonFilter implements PropertyFilter {

	public boolean apply(Object arg0, String arg1, Object arg2) {
		if (arg0 instanceof MarketBasicInformation) {
			if (arg1.equals("market_name"))
				return false;
			else
				return true;
		}
		if (arg0 instanceof MarketFirstClass) {
			return true;
		}
		if (arg0 instanceof MarketSecondClass) {
			return true;
		}
		return false;
	}

}
