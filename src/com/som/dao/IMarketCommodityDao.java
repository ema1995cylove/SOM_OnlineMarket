package com.som.dao;

import java.util.List;

import com.som.model.MarketCommodity;

public interface IMarketCommodityDao {
	void add(MarketCommodity mc);

	void delete(Integer id);

	void update(MarketCommodity mc);

	List<MarketCommodity> find();

	MarketCommodity find(Integer id);
	
	List<MarketCommodity> findByFirstClassId(Integer first_class_id);


	List<MarketCommodity> getBySecondId(Integer secondId);
}
