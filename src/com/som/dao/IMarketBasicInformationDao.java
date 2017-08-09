package com.som.dao;

import java.util.List;

import com.som.model.MarketBasicInformation;

public interface IMarketBasicInformationDao {
	void add(MarketBasicInformation mfc);

	void delete(Integer id);

	void update(MarketBasicInformation mfc);

	List<MarketBasicInformation> find();

	MarketBasicInformation find(Integer id);

	List<MarketBasicInformation> getByCountryName(String countryName);

	List<MarketBasicInformation> getByCountry(int countryI);

	MarketBasicInformation getByUserId(int userId);
}