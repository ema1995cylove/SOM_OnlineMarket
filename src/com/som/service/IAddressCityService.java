package com.som.service;

import java.util.List;

import com.som.model.AddressCity;

public interface IAddressCityService {
	void dalete(Integer id);

	void update(AddressCity aci);

	AddressCity find(Integer id);

	void add(AddressCity city);

	List<AddressCity> getByProvince(int provinceId);

	AddressCity getByName(String name);
}
