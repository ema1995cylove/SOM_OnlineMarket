package com.som.dao;

import java.util.List;

import com.som.model.LinkUserAddress;

public interface ILinkUserAddressDao {
	void add(LinkUserAddress lua);

	void delete(Integer id);

	void update(LinkUserAddress lua);

	List<LinkUserAddress> find();

	LinkUserAddress find(Integer id);
}
