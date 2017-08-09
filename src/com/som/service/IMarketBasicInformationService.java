package com.som.service;

import java.util.List;

import com.som.model.MarketBasicInformation;

public interface IMarketBasicInformationService {
	void add(MarketBasicInformation mbi);

	void delete(Integer id);

	void update(MarketBasicInformation mfc);

	List<MarketBasicInformation> find();

	MarketBasicInformation find(Integer id);

	List<MarketBasicInformation> getByCountryName(String countryName);

	List<MarketBasicInformation> getByCountry(int countryI);

	MarketBasicInformation getByUserId(int userId);
}
