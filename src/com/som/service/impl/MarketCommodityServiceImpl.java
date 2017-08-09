package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IMarketCommodityDao;
import com.som.model.MarketCommodity;
import com.som.service.IMarketCommodityService;

@Service
@Transactional
public class MarketCommodityServiceImpl implements IMarketCommodityService {

	@Autowired
	private IMarketCommodityDao imcd;

	public void add(MarketCommodity mc) {
		imcd.add(mc);
	}

	public void delete(Integer id) {
		imcd.delete(id);
	}

	public void update(MarketCommodity mc) {
		imcd.update(mc);
	}

	public List<MarketCommodity> find() {
		return imcd.find();
	}

	public MarketCommodity find(Integer id) {
		return imcd.find(id);
	}

	public List<MarketCommodity> getBySecondId(Integer secondId) {
		return imcd.getBySecondId(secondId);
	}

	public List<MarketCommodity> findByFirstClassId(Integer first_class_id) {
		return imcd.findByFirstClassId(first_class_id);
	}
}
