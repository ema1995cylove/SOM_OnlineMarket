drop database if exists som;
create database som;
use som;

create table som_address_province(
	province_id INT primary key auto_increment,
	province_name varchar(15) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_address_city(
	city_id INT primary key auto_increment,
	city_name varchar(20) NOT NULL,
	province_id INT NOT NULL,

	foreign key(province_id) references som_address_province(province_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_address_contry(
	contry_id INT primary key auto_increment,
	contry_name varchar(20) NOT NULL,
	city_id INT NOT NULL,

	foreign key(city_id) references som_address_city(city_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_user_account(
	account_id INT primary key auto_increment,
	account_number varchar(11) NOT NULL,
	account_password varchar(20) NOT NULL,
	account_power INT NOT NULL,
	user_name varchar(200),
	user_birthday date,
	user_logo varchar(200),
	user_sex varchar(5)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_link_market_address(
	address_id INT primary key auto_increment,
	address_province_id INT NOT NULL,
	address_city_id INT NOT NULL,
	address_contry_id INT NOT NULL,
	address_detailed varchar(200) NOT NULL,
	
	foreign key(address_province_id) references som_address_province(province_id),
	foreign key(address_city_id) references som_address_city(city_id),
	foreign key(address_contry_id) references som_address_contry(contry_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_market_basic_information(
	market_id INT primary key auto_increment,
	market_name varchar(20) NOT NULL,
	market_address_id INT NOT NULL,
	market_user_id INT NOT NULL,
	market_logo varchar(200),
	
	foreign key(market_address_id) references som_link_market_address(address_id),
	foreign key(market_user_id) references som_user_account(account_id),
	
	unique(market_address_id),
	unique(market_user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_market_first_class(
	first_class_id INT primary key auto_increment,
	first_class_name varchar(20) NOT NULL
);

create table som_market_second_class(
	second_class_id INT primary key auto_increment,
	second_class_name varchar(20) NOT NULL,
	first_class_id INT NOT NULL,
	
	foreign key(first_class_id) references som_market_first_class(first_class_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_link_market_class(
	market_id INT NOT NULL,
	first_class_id INT NOT NULL,
	
	foreign key(market_id) references som_market_basic_information(market_id),
	foreign key(first_class_id) references som_market_first_class(first_class_id),
	
	unique(market_id, first_class_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_link_market_user(
	market_id INT NOT NULL,
	user_id INT NOT NULL,
	
	foreign key(market_id) references som_market_basic_information(market_id),
	foreign key(user_id) references som_user_account(account_id),
	
	unique(market_id, user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_link_user_address(
	id INT NOT NULL,
	user_id INT NOT NULL,
	province_id INT NOT NULL,
	city_id INT NOT NULL,
	contry_id INT NOT NULL,
	detailed varchar(20) NOT NULL,

	foreign key(province_id) references som_address_province(province_id),
	foreign key(city_id) references som_address_city(city_id),
	foreign key(contry_id) references som_address_contry(contry_id),
	foreign key(user_id) references som_user_account(account_id),

	unique(user_id, contry_id, detailed)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_market_commodity(
	commodity_id INT primary key auto_increment,
	commodity_market_id INT NOT NULL,
	commodity_name varchar(30) NOT NULL,
	commodity_first_class_id INT NOT NULL,
	commodity_second_class_id INT NOT NULL,
	commodity_count  INT NOT NULL,
	commodity_brand varchar(30) NOT NULL,
	commodity_price INT NOT NULL,
	commodity_vip_price INT,
	commodity_specifications varchar(200),
	commodity_picture_0 varchar(200) NOT NULL,
	commodity_picture_1 varchar(200),
	commodity_picture_2 varchar(200),
	commodity_picture_3 varchar(200),
	
	foreign key(commodity_first_class_id) references som_market_first_class(first_class_id),
	foreign key(commodity_second_class_id) references som_market_second_class(second_class_id),
	foreign key(commodity_market_id) references som_market_basic_information(market_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_user_cart(
	id INT primary key auto_increment,
	cart_commodity_id INT NOT NULL,
	cart_user_id INT NOT NULL,
	cart_commodity_count INT NOT NULL,
	
	foreign key(cart_commodity_id) references som_market_commodity(commodity_id),
	foreign key(cart_user_id) references som_user_account(account_id),

	unique(cart_commodity_id, cart_user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_user_order(
	order_id INT primary key auto_increment,
	order_user_id INT NOT NULL,
	order_market_id INT NOT NULL,
	order_date date NOT NULL,
	order_number varchar(50) NOT NULL,
	order_status int not null,
	
	foreign key(order_market_id) references som_market_basic_information(market_id),
	foreign key(order_user_id) references som_user_account(account_id),
	
	unique(order_market_id, order_user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table som_user_order_detailed(
	id INT primary key auto_increment,
	order_id INT NOT NULL,
	order_commodity_id INT NOT NULL,
	order_commodity_count INT NOT NULL,

	foreign key(order_id) references som_user_order(order_id),
	foreign key(order_commodity_id) references som_market_commodity(commodity_id),

	unique(order_id, order_commodity_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;