/* Replace with your SQL commands */
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR (50) NOT NULL,
  userId BIGINT REFERENCES users(id) NOT NULL
)