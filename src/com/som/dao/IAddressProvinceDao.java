package com.som.dao;

import java.util.List;

import com.som.model.AddressProvince;

public interface IAddressProvinceDao {
	void delete(Integer id);

	void update(AddressProvince ap);

	List<AddressProvince> find();

	AddressProvince find(Integer id);

	void add(AddressProvince province);

	AddressProvince getByName(String name);
}
