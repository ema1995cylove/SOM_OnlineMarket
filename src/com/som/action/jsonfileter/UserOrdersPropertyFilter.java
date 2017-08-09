package com.som.action.jsonfileter;

import com.som.model.MarketCommodity;
import com.som.model.UserOrder;
import com.som.model.UserOrderDetailed;

import net.sf.json.util.PropertyFilter;

public class UserOrdersPropertyFilter implements PropertyFilter{

	public boolean apply(Object arg0, String arg1, Object arg2) {
		if(arg0 instanceof UserOrder){
			if(arg1.equals("orderStatus")||arg1.equals("oderId")||arg1.equals("orderDate")||arg1.equals("orderCode")||arg1.equals("orderDetailed"))
				return false;
			else 
				return true;
		}else if(arg0 instanceof UserOrderDetailed){
			if(arg1.equals("orderCommodityCount")||arg1.equals("orderCommodity"))
				return false;
			else 
				return true;
		}else if(arg0 instanceof MarketCommodity){
			if(arg1.equals("commodity_name")||arg1.equals("commodity_brand")||arg1.equals("commodity_price")
					||arg1.equals("commodity_vip_price")||arg1.equals("commodity_picture0"))
				return false;
			else 
				return true;
			
		}
		return false;
	}

}
