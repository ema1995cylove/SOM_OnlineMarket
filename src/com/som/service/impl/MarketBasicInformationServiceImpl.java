package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IMarketBasicInformationDao;
import com.som.model.MarketBasicInformation;
import com.som.service.IMarketBasicInformationService;

@Service
@Transactional
public class MarketBasicInformationServiceImpl implements
		IMarketBasicInformationService {

	@Autowired
	private IMarketBasicInformationDao imbid;

	public void add(MarketBasicInformation mfc) {
		imbid.add(mfc);
	}

	public void delete(Integer id) {
		imbid.delete(id);
	}

	public void update(MarketBasicInformation mfc) {
		imbid.update(mfc);
	}

	public List<MarketBasicInformation> find() {
		return imbid.find();
	}

	public MarketBasicInformation find(Integer id) {
		return imbid.find(id);
	}

	public List<MarketBasicInformation> getByCountryName(String countryName) {
		return imbid.getByCountryName(countryName);
	}

	public List<MarketBasicInformation> getByCountry(int countryI) {
		return imbid.getByCountry(countryI);
	}

	public MarketBasicInformation getByUserId(int userId) {
		return imbid.getByUserId(userId);
	}

}
