package com.som.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.ILinkMarketAddressDao;
import com.som.model.LinkMarketAddress;

@Repository
public class LinkMarketAddressDaoImpl implements ILinkMarketAddressDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(LinkMarketAddress lma) {
		getSession().save(lma);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(LinkMarketAddress lma) {
		getSession().update(lma);
	}

	@SuppressWarnings("unchecked")
	public List<LinkMarketAddress> find() {
		return getSession().createQuery("FROM LinkMarketAddress").list();
	}

	public LinkMarketAddress find(Integer id) {
		return (LinkMarketAddress) getSession()
				.get(LinkMarketAddress.class, id);
	}

	public LinkMarketAddress getByPCCD(int pid, int cid, int coid, String detail) {
		Query q = getSession()
				.createQuery(
						"FROM LinkMarketAddress WHERE marketAddress_province.province_id = ? and "
								+ "marketAddress_city.city_id = ? and marketAddress_contry.contry_id = ? and"
								+ "  marketAddress_detailed = ? ");
		q.setParameter(0, pid);
		q.setParameter(1, cid);
		q.setParameter(2, coid);
		q.setParameter(3, detail);
		return (LinkMarketAddress) q.uniqueResult();
	}
}
