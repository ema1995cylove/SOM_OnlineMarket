package com.som.service;

import java.util.List;

import com.som.model.LinkUserAddress;

public interface ILinkUserAddressService {
	void add(LinkUserAddress lua);

	void delete(Integer id);

	void update(LinkUserAddress lua);

	List<LinkUserAddress> find();

	LinkUserAddress find(Integer id);
}