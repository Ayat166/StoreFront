/* Replace with your SQL commands */
CREATE TABLE orders_product(
  id SERIAL PRIMARY KEY,
  orders_id BIGINT REFERENCES orders(id) NOT NULL,
  product_id BIGINT REFERENCES product(id) NOT NULL,
  quantity INT
);