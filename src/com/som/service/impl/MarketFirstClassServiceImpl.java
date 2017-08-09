package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IMarketFirstClassDao;
import com.som.model.MarketFirstClass;
import com.som.service.IMarketFirstClassService;

@Service
@Transactional
public class MarketFirstClassServiceImpl implements IMarketFirstClassService {

	@Autowired
	private IMarketFirstClassDao imfc;

	public void add(MarketFirstClass mfc) {
		imfc.add(mfc);
	}

	public void delete(Integer id) {
		imfc.delete(id);
	}

	public void update(MarketFirstClass mfc) {
		imfc.update(mfc);
	}

	public List<MarketFirstClass> find() {
		return imfc.find();
	}

	public MarketFirstClass find(Integer id) {
		return imfc.find(id);
	}

}
