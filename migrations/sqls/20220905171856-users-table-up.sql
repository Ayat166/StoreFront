/* Create table users */
CREATE TABLE users(
  id SERIAL PRIMARY primary key,
  email varchar(50) unique,
  userName varchar(50) not null,
  firstName varchar(50) not null,
  lastName varchar(50) not null,
  password varchar(300) not null
);