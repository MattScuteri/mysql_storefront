DROP DATABASE if exists bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NOT NULL,
	department_name VARCHAR(45) NOT NULL,
	price INT NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Waffles with the logo of the business in the middle", "Breakfast" 10, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sawsitches", "Breakfast", 5.75, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Just ham between two slices of bread & that's it", "Lunch", 6.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A piece of fish", "Lunch", 5.75, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A single meatball", "Dinner", 4.00, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mystery meat", "Dinner", 45, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alcoholic beverage served in a silly goblet", "Drinks", 10.75, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A vodka water...which is basically just vodka I guess? But you're on a diet", "Drinks", 7.50, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cookie dough in a jar", "Dessert", 3.50, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Just the melted chocolated that comes in the middle of the lava cake", "Dessert", 4, 12);