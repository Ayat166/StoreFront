/* Replace with your SQL commands */
CREATE TABLE product(
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC (17,2) NOT NULL,
  category VARCHAR(50) NOT NULL
)