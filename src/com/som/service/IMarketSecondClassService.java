package com.som.service;

import java.util.List;

import com.som.model.MarketSecondClass;

public interface IMarketSecondClassService {
	void add(MarketSecondClass msc);

	void delete(Integer id);

	void update(MarketSecondClass msc);

	List<MarketSecondClass> find();

	MarketSecondClass find(Integer id);
}