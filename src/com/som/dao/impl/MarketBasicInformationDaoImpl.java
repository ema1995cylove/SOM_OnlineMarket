package com.som.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IMarketBasicInformationDao;
import com.som.model.MarketBasicInformation;

@Repository
public class MarketBasicInformationDaoImpl implements
		IMarketBasicInformationDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(MarketBasicInformation mfc) {
		getSession().save(mfc);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(MarketBasicInformation mfc) {
		getSession().update(mfc);
	}

	@SuppressWarnings("unchecked")
	public List<MarketBasicInformation> find() {
		return getSession().createQuery("FROM　MarketBasicInformation").list();
	}

	public MarketBasicInformation find(Integer id) {
		return (MarketBasicInformation) getSession().get(
				MarketBasicInformation.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<MarketBasicInformation> getByCountryName(String ContryName) {
		return getSession().createQuery("from MarketBasicInformation market"
				+ " where market.market_address.marketAddress_contry.contry_name='"+ContryName+"'").list();
	}
	
	@SuppressWarnings("unchecked")
	public List<MarketBasicInformation> getByCountry(int ContryId) {
		return this.getSession().createQuery("from MarketBasicInformation market"
				+ " where market.market_address.marketAddress_contry.contry_id="+ContryId).list();
	}

	public MarketBasicInformation getByUserId(int userId) {
		Query q = getSession().createQuery("FROM MarketBasicInformation WHERE market_user.accountId = ?");
		q.setInteger(0, userId);
		return (MarketBasicInformation) q.uniqueResult();
	}
}
