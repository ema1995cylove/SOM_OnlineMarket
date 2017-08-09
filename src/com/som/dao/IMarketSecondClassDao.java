package com.som.dao;

import com.som.model.MarketSecondClass;
import java.util.List;

public interface IMarketSecondClassDao {
	void add(MarketSecondClass msc);

	void delete(Integer id);

	void update(MarketSecondClass msc);

	List<MarketSecondClass> find();

	MarketSecondClass find(Integer id);
}
