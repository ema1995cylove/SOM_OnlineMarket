package com.som.dao;

import java.util.List;

import com.som.model.MarketFirstClass;

public interface IMarketFirstClassDao {
	void add(MarketFirstClass mfc);

	void delete(Integer id);

	void update(MarketFirstClass mfc);

	List<MarketFirstClass> find();

	MarketFirstClass find(Integer id);
}
