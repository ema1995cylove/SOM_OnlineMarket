package com.som.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IUserAcconutDao;
import com.som.model.UserAccount;

@Repository
public class UserAccountDaoImpl implements IUserAcconutDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(UserAccount ua) {
		getSession().save(ua);
	}

	public void delete(Integer id) {
		getSession().delete(id);
	}

	public void update(UserAccount ua) {
		getSession().update(ua);
	}

	@SuppressWarnings("unchecked")
	public List<UserAccount> find() {
		return getSession().createQuery("FROM UserAccount").list();
	}

	public UserAccount find(Integer id) {
		return (UserAccount) getSession().get(UserAccount.class, id);
	}

	public UserAccount getByAccount(String account) {
		Query q = getSession().createQuery(
				"FROM UserAccount WHERE accountNumber = ?");
		q.setParameter(0, account);
		return (UserAccount) q.uniqueResult();
	}
}
