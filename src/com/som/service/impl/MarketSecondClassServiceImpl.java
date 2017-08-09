package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IMarketSecondClassDao;
import com.som.model.MarketSecondClass;
import com.som.service.IMarketSecondClassService;

@Service
@Transactional
public class MarketSecondClassServiceImpl implements IMarketSecondClassService {
	@Autowired
	private IMarketSecondClassDao imscd;

	public void add(MarketSecondClass msc) {
		imscd.add(msc);
	}

	public void delete(Integer id) {
		imscd.delete(id);
	}

	public void update(MarketSecondClass msc) {
		imscd.update(msc);
	}

	public List<MarketSecondClass> find() {
		return imscd.find();
	}

	public MarketSecondClass find(Integer id) {
		return imscd.find(id);
	}

}
