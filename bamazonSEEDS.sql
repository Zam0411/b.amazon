USE bamazon;

CREATE TABLE products (
	item_id INT(50) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT(50) NOT NULL,
    stock_quantity INT(255) NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Shoes", "Clothing", 30, 2000),
	   (2, "Socks", "Clothing", 5, 5000),
	   (3, "Computer", "Electronics", 200, 50),
       (4, "Keyboard", "Electronics", 20, 300),
       (5, "Bike", "Sporting", 100, 30),
       (6, "Helmet", "Sporting", 25, 300),
       (7, "Swimming Goggles", "Sporting", 10, 1000),
       (8, "Cereal", "Food", 5, 600),
       (9, "Eggs", "Food", 3, 200),
       (10, "Cofee", "Food", 6, 500);
       
SELECT * FROM products;