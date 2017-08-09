package com.som.service;

import java.util.List;

import com.som.model.MarketCommodity;

public interface IMarketCommodityService {
	void add(MarketCommodity mc);

	void delete(Integer id);

	void update(MarketCommodity mc);

	List<MarketCommodity> find();

	MarketCommodity find(Integer id);
	
	List<MarketCommodity> getBySecondId(Integer secondId);
	
	List<MarketCommodity> findByFirstClassId(Integer first_class_id);
	
}
