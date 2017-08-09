package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IMarketCommodityDao;
import com.som.model.MarketCommodity;

@Repository
public class MarketCommodityDaoImpl implements IMarketCommodityDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(MarketCommodity mc) {
		getSession().save(mc);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(MarketCommodity mc) {
		getSession().update(mc);
	}

	@SuppressWarnings("unchecked")
	public List<MarketCommodity> find() {
		return getSession().createQuery("FROM MarketCommodity").list();
	}

	public MarketCommodity find(Integer id) {
		return (MarketCommodity) getSession().get(MarketCommodity.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<MarketCommodity> getBySecondId(Integer secondId) {
		return getSession().createQuery("FROM MarketCommodity mc where mc.commodity_second_class="+secondId).list();
	}

	@SuppressWarnings("unchecked")
	public List<MarketCommodity> findByFirstClassId(Integer first_class_id) {
		return  getSession().createQuery("FROM MarketCommodity mc where mc.commodity_first_class.first_class_id="+first_class_id).list();
	}

}
