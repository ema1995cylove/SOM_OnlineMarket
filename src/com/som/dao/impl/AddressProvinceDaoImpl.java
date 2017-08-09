package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IAddressProvinceDao;
import com.som.model.AddressProvince;

@Repository
public class AddressProvinceDaoImpl implements IAddressProvinceDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(AddressProvince ap) {
		getSession().update(ap);
	}

	@SuppressWarnings("unchecked")
	public List<AddressProvince> find() {
		return getSession().createQuery(
				"FROM AddressProvince order by province_id asc").list();
	}

	public AddressProvince find(Integer id) {
		return (AddressProvince) getSession().get(AddressProvince.class, id);
	}

	public void add(AddressProvince province) {
		this.getSession().save(province);
	}

	public void delete(AddressProvince province) {
		this.getSession().delete(province);
	}

	public AddressProvince getByName(String name) {
		return (AddressProvince) getSession().createQuery(
				" select from AddressProvince pro where pro.province_name='"
						+ name + "'").uniqueResult();
	}
}
