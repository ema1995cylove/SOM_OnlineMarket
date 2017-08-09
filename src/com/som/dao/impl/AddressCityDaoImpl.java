package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IAddressCityDao;
import com.som.model.AddressCity;

@Repository
public class AddressCityDaoImpl implements IAddressCityDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void dalete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(AddressCity aci) {
		getSession().update(aci);
	}

	public AddressCity find(Integer id) {
		return (AddressCity) getSession().get(AddressCity.class, id);
	}

	public void add(AddressCity city) {
		this.getSession().save(city);
	}

	public void delete(AddressCity city) {
		this.getSession().delete(city);
	}

	public AddressCity getByName(String name) {
		return (AddressCity) getSession().createQuery(
				"from AddressCity city where city.city_name='" + name + "'")
				.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public List<AddressCity> getByProvince(int provinceId) {
		return getSession().createQuery(
				"from AddressCity  citys where citys.city_province.province_id="
						+ provinceId + " order by city_id asc").list();
	}

}
