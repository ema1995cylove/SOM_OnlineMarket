package com.som.dao;

import java.util.List;

import com.som.model.LinkMarketAddress;

public interface ILinkMarketAddressDao {
	void add(LinkMarketAddress lma);

	void delete(Integer id);

	void update(LinkMarketAddress lma);

	List<LinkMarketAddress> find();

	LinkMarketAddress find(Integer id);

	LinkMarketAddress getByPCCD(int pid, int cid, int coid, String detail);

}
