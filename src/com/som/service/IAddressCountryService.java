package com.som.service;

import java.util.List;

import com.som.model.AddressContry;

public interface IAddressCountryService {
	void delete(Integer id);

	void update(AddressContry aco);

	AddressContry find(Integer id);

	void delete(AddressContry country);

	void add(AddressContry country);

	List<AddressContry> getByCity(int cityId);

	AddressContry getByName(String name);
}