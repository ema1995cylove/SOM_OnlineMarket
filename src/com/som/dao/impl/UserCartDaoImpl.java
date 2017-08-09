package com.som.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IUserCartDao;
import com.som.model.UserCart;

@Repository
public class UserCartDaoImpl implements IUserCartDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(UserCart uc) {
		getSession().save(uc);
	}

	public void delete(Integer id) {
		UserCart u = find(id);
		u.setMarketCommdity(null);
		u.getCart_userAccount().getUserCarts().remove(u);
		getSession().delete(u);
	}

	public void update(UserCart uc) {
		getSession().update(uc);
	}

	@SuppressWarnings("unchecked")
	public List<UserCart> find() {
		return getSession().createQuery("FROM UserCart").list();
	}

	public UserCart find(Integer id) {
		return (UserCart) getSession().get(UserCart.class, id);
	}

	public UserCart getById(Integer commodityId, Integer userId) {
		Query q = getSession()
				.createQuery(
						"FROM UserCart WHERE cart_userAccount.accountId=? AND marketCommdity.commodity_id = ?");
		q.setParameter(0, userId);
		q.setParameter(1, commodityId);

		return (UserCart) q.uniqueResult();
	}

}
