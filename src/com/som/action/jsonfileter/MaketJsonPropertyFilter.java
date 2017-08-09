package com.som.action.jsonfileter;

import com.som.model.AddressCity;
import com.som.model.AddressContry;
import com.som.model.AddressProvince;
import com.som.model.LinkMarketAddress;
import com.som.model.MarketBasicInformation;

import net.sf.json.util.PropertyFilter;

public class MaketJsonPropertyFilter implements PropertyFilter{

	public boolean apply(Object arg0, String arg1, Object arg2) {
		if(arg0 instanceof MarketBasicInformation){
			return !(arg1.equals("market_logo") || arg1.equals("market_id")||arg1.equals("market_name") || arg1.equals("market_address"));
		}
		if(arg0 instanceof LinkMarketAddress){
			return !(arg1.equals("marketAddress_province") || arg1.equals("marketAddress_city")||
					arg1.equals("marketAddress_contry") || arg1.equals("marketAddress_detailed"));
		}
		if(arg0 instanceof AddressProvince){
			return !(arg1.equals("province_name"));
		}
		if(arg0 instanceof AddressCity){
			return !(arg1.equals("city_name"));
		}
		if(arg0 instanceof AddressContry){
			return !(arg1.equals("contry_name"));
		}
		return false;
	}

}
