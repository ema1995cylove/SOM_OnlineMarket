package com.som.model;

public class MarketCommodity {
	private Integer commodity_id;

	private MarketBasicInformation commodity_market;
	private MarketFirstClass commodity_first_class;
	private MarketSecondClass commodity_second_class;

	private String commodity_name;
	private Integer commodity_count;
	private String commodity_brand;
	private Integer commodity_price;
	private Integer commodity_vip_price;
	private String commodity_specifications;
	private String commodity_picture0;
	private String commodity_picture1;
	private String commodity_picture2;
	private String commodity_picture3;

	public MarketCommodity() {
	}

	public MarketCommodity(Integer commodity_id,
			MarketBasicInformation commodity_market, String commodity_name,
			MarketFirstClass commodity_first_class,
			MarketSecondClass commodity_second_class, Integer commodity_count,
			String commodity_brand, Integer commodity_price,
			Integer commodity_vip_price, String commodity_specifications,
			String commodity_picture0, String commodity_picture1,
			String commodity_picture2, String commodity_picture3) {
		super();
		this.commodity_id = commodity_id;
		this.commodity_market = commodity_market;
		this.commodity_name = commodity_name;
		this.commodity_first_class = commodity_first_class;
		this.commodity_second_class = commodity_second_class;
		this.commodity_count = commodity_count;
		this.commodity_brand = commodity_brand;
		this.commodity_price = commodity_price;
		this.commodity_vip_price = commodity_vip_price;
		this.commodity_specifications = commodity_specifications;
		this.commodity_picture0 = commodity_picture0;
		this.commodity_picture1 = commodity_picture1;
		this.commodity_picture2 = commodity_picture2;
		this.commodity_picture3 = commodity_picture3;
	}

	@Override
	public String toString() {
		return "MarketConmodity [commodity_id=" + commodity_id
				+ ", commodity_name=" + commodity_name + ", commodity_count="
				+ commodity_count + ", commodity_brand=" + commodity_brand
				+ ", commodity_price=" + commodity_price
				+ ", commodity_vip_price=" + commodity_vip_price
				+ ", commodity_specifications=" + commodity_specifications
				+ ", commodity_picture0=" + commodity_picture0
				+ ", commodity_picture1=" + commodity_picture1
				+ ", commodity_picture2=" + commodity_picture2
				+ ", commodity_picture3=" + commodity_picture3 + "]";
	}

	public Integer getCommodity_id() {
		return commodity_id;
	}

	public void setCommodity_id(Integer commodity_id) {
		this.commodity_id = commodity_id;
	}

	public MarketBasicInformation getCommodity_market() {
		return commodity_market;
	}

	public void setCommodity_market(MarketBasicInformation commodity_market) {
		this.commodity_market = commodity_market;
	}

	public String getCommodity_name() {
		return commodity_name;
	}

	public void setCommodity_name(String commodity_name) {
		this.commodity_name = commodity_name;
	}

	public MarketFirstClass getCommodity_first_class() {
		return commodity_first_class;
	}

	public void setCommodity_first_class(MarketFirstClass commodity_first_class) {
		this.commodity_first_class = commodity_first_class;
	}

	public MarketSecondClass getCommodity_second_class() {
		return commodity_second_class;
	}

	public void setCommodity_second_class(
			MarketSecondClass commodity_second_class) {
		this.commodity_second_class = commodity_second_class;
	}

	public Integer getCommodity_count() {
		return commodity_count;
	}

	public void setCommodity_count(Integer commodity_count) {
		this.commodity_count = commodity_count;
	}

	public String getCommodity_brand() {
		return commodity_brand;
	}

	public void setCommodity_brand(String commodity_brand) {
		this.commodity_brand = commodity_brand;
	}

	public Integer getCommodity_price() {
		return commodity_price;
	}

	public void setCommodity_price(Integer commodity_price) {
		this.commodity_price = commodity_price;
	}

	public Integer getCommodity_vip_price() {
		return commodity_vip_price;
	}

	public void setCommodity_vip_price(Integer commodity_vip_price) {
		this.commodity_vip_price = commodity_vip_price;
	}

	public String getCommodity_specifications() {
		return commodity_specifications;
	}

	public void setCommodity_specifications(String commodity_specifications) {
		this.commodity_specifications = commodity_specifications;
	}

	public String getCommodity_picture0() {
		return commodity_picture0;
	}

	public void setCommodity_picture0(String commodity_picture0) {
		this.commodity_picture0 = commodity_picture0;
	}

	public String getCommodity_picture1() {
		return commodity_picture1;
	}

	public void setCommodity_picture1(String commodity_picture1) {
		this.commodity_picture1 = commodity_picture1;
	}

	public String getCommodity_picture2() {
		return commodity_picture2;
	}

	public void setCommodity_picture2(String commodity_picture2) {
		this.commodity_picture2 = commodity_picture2;
	}

	public String getCommodity_picture3() {
		return commodity_picture3;
	}

	public void setCommodity_picture3(String commodity_picture3) {
		this.commodity_picture3 = commodity_picture3;
	}

}
