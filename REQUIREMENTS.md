# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

Table of contents -[API and Database Requirements](#api-and-database-requirements) -[API Endpoints](#api-endpoints) -[Users](#users) -[Products](#products) -[Orders](#orders) -[Order Products](#order-products) -[Data Schema](#data-schema) -[Products for each Order Schema](#products-for-each-order-schema) -[Data Shapes](#data-shapes) -[User](#user) -[Product](#product) -[Order](#orders) -[Order Product](#order-product)

## API Endpoints

#### Products

- Index
-HTTP verb `GET`
  -Endpoint:-`/api/products/`
  -Request Body
  json N/A
  -Response Body -- `Array of products objects`
  ```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Apple",
      "description": "Product Description",
      "price": "5.50",
      "category": "fruits"
    }
  ],
  "message": "products retrieved successfully"
}
  ```

- Show
-HTTP verb `GET`
  -Endpoint:-`/api/products/:id`
  -Request Body
  json N/A
  -Response Body -- `product object`
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Apple",
    "description": "Product Description",
    "price": "5.50",
    "category": "fruits"
  },
  "message": "product retrieved successfully"
}
```

- Create [token required]
-HTTP verb `POST`
  -Endpoint:-`/api/products`
  -Request Body
```json
{
      "name": "Apple",
      "description": "Product Description",
      "price": "5.50",
      "category": "fruits"
}
```
  -Response Body -- `product object`
  ```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Apple",
    "description": "Product Description",
    "price": "5.50",
    "category": "fruits"
  },
  "message": "product Created ! ☺"
}
  ```

-update [token required]
-HTTP verb `PATCH`
  -Endpoint:-`/api/products/:id`
  -Request Body
```json
{
      "name": "Apple",
      "description": "Product Description",
      "price": "7.50",
      "category": "fruits",
      "id":"1"
}
```
  -Response Body -- `product object`
  ```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Apple",
    "description": "Product Description",
    "price": "7.50",
    "category": "fruits"
  },
  "message": "product Updated successfully"
}
  ```
-Delete [token required]
-HTTP verb `DELETE`
  -Endpoint:-`/api/products/:id`
  -Request Body
```json
N/A
```
  -Response Body -- `product object`
  ```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Apple",
    "description": "Product Description",
    "price": "7.50",
    "category": "fruits"
  },
  "message": "product Deleted successfully"
}
  ```


#### Users

- Index [token required]
  -HTTP verb `GET`
  -Endpoint:-`/api/users/`
  -Request Body
  json N/A
  -Response Body -- `Array of user objects`
  ```json
  {
    "status": "success",
    "data": [
       {
       "id": "c9d5485e-3482-4301-8024-56926f8f0a6e",
        "email": "a@gmail.com",
        "username": "Ayat",
        "firstname": "Ayat",
      "lastname": "Ali"
    },
    {
      "id": "3afad4da-7e17-4f1d-bf1d-27cb135fb8f9",
      "email": "a2@gmail.com",
      "username": "Ahmed",
      "firstname": "Ahmed",
      "lastname": "Ali"
    }
  ],
  "message": "Users retrieved successfully"
  }
  ```


- Create 
 -HTTP verb `POST`
 -Endpoint:- `api/users`
 -Request Body

 ```json
{
    "email": "a8@gmail.com",
    "userName": "Test",
    "firstName": "Test",
    "lastName": "Mohamed",
    "password":"123456"
}
```

-Response Body

```json
{
  "status": "success",
  "data": {
    "id": "47c2eafa-f6b8-45d9-bd61-b167cc99e477",
    "email": "a8@gmail.com",
    "username": "Test",
    "firstname": "Test",
    "lastname": "Mohamed"
  },
  "message": "User Created ! ☺"
}
```

- Show [token required]
  -HTTP verb `GET`
  -Endpoint:- `api/users/47c2eafa-f6b8-45d9-bd61-b167cc99e477`
  -Request Body
  json N/A
  token{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2FmYWQ0ZGEtN2UxNy00ZjFkLWJmMWQtMjdjYjEzNWZiOGY5IiwiZW1haWwiOiJhMkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFobWVkIiwiZmlyc3RuYW1lIjoiQWhtZWQiLCJsYXN0bmFtZSI6IkFsaSJ9LCJpYXQiOjE2NjI4MTg5MzV9.OVXecaeSLTi64Q94GQWbheuzvK1ohRXO-lv-g1JahR8}

  -Response Body

  ```json
  {
    "status": "success",
    "data": {
      "id": "47c2eafa-f6b8-45d9-bd61-b167cc99e477",
      "email": "a8@gmail.com",
      "username": "Test",
      "firstname": "Test",
      "lastname": "Mohamed"
    },
    "message": "User retrieved successfully"
  }
  ```
-Update [token required]
  -HTTP verb `PATCH`
  -Endpoint:- `api/users/47c2eafa-f6b8-45d9-bd61-b167cc99e477`
  -Request Body
  ```json
  
  {
    "email": "a10@gmail.com",
    "username": "Test",
    "firstname": "Test",
    "lastname": "Mohamed",
    "password":"123456"
  }
  ```
  -Response Body
  ```json
  {
  "status": "success",
  "data": {
      "id": "47c2eafa-f6b8-45d9-bd61-b167cc99e477",
      "email": "a10@gmail.com",
      "username": "Test",
      "firstname": "Test",
      "lastname": "Mohamed"
    },
  "message": "User Updated successfully"
  }
  ```

-Delete [token required]
  -HTTP verb `DELETE`
  -Endpoint:- `api/users/47c2eafa-f6b8-45d9-bd61-b167cc99e477`
  -Request Body
  ```json
  N/A
  ```
  -Response Body
  ```json
  {
  "status": "success",
  "data": {
    "id": "47c2eafa-f6b8-45d9-bd61-b167cc99e477",
    "email": "a8@gmail.com",
    "username": "Test",
    "firstname": "Test",
    "lastname": "Mohamed"
  },
  "message": "User Deleted successfully"
}
  ```
-Authenticate [token required]
  -HTTP verb `POST`
  -Endpoint:- `api/users/authenticate`
  -Request Body
  ```json
  {
  "email":"a@gmail.com",
  "password":"Hello"
  } 
  ```
  -Response Body
  ```json
  {
  "status": "success",
  "data": {
    "id": "c9d5485e-3482-4301-8024-56926f8f0a6e",
    "email": "a@gmail.com",
    "username": "Ayat",
    "firstname": "Ayat",
    "lastname": "Ali",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYzlkNTQ4NWUtMzQ4Mi00MzAxLTgwMjQtNTY5MjZmOGYwYTZlIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQXlhdCIsImZpcnN0bmFtZSI6IkF5YXQiLCJsYXN0bmFtZSI6IkFsaSJ9LCJpYXQiOjE2NjMyMDAyODZ9.imm69BOqxX0HBTZOzE4b428WZOjAQ487ZdAj30644Mc"
  },
  "message": "user Authenticated successfully"
}
  ```




#### Orders

- Create 
 -HTTP verb `POST`
 -Endpoint:- `api/orders`
 -Request Body

 ```json
{
  "status":"active",
  "userId":"c9d5485e-3482-4301-8024-56926f8f0a6e"
}
```

-Response Body

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "status": "active",
    "userid": "c9d5485e-3482-4301-8024-56926f8f0a6e"
  },
  "message": "order Created ! ☺"
}
```

- Index [token required]
  -HTTP verb `GET`
  -Endpoint:-`/api/orders/`
  -Request Body
  json N/A
  -Response Body -- `Array of user objects`
  ```json
  {
  "status": "success",
  "data": [
    {
      "id": 1,
      "status": "active",
      "userid": "c9d5485e-3482-4301-8024-56926f8f0a6e"
    },
    {
      "id": 2,
      "status": "active",
      "userid": "c9d5485e-3482-4301-8024-56926f8f0a6e"
    }
  ],
  "message": "orders retrieved successfully"
  }
  ```
-Update [token required]
  -HTTP verb `PATCH`
  -Endpoint:- `api/orders/2`
  -Request Body
  ```json
  
 {
  "status":"closed",
  "userId":"c9d5485e-3482-4301-8024-56926f8f0a6e",
  "id":2
  
}
  ```
  -Response Body
  ```json
  {
  "status": "success",
  "data": {
    "id": 2,
    "status": "closed",
    "userid": "c9d5485e-3482-4301-8024-56926f8f0a6e"
  },
  "message": "order Updated successfully"
}
  ```

-Delete [token required]
  -HTTP verb `DELETE`
  -Endpoint:- `api/orders/2`
  -Request Body
  ```json
  N/A
  ```
  -Response Body
  ```json
 {
  "status": "success",
  "data": {
    "id": 2,
    "status": "closed",
    "userid": "c9d5485e-3482-4301-8024-56926f8f0a6e"
  },
  "message": "order Deleted successfully"
}


```
## Data Shapes
#### Product
```sql
CREATE TABLE product(
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC (17,2) NOT NULL,
  category VARCHAR(50) NOT NULL
)
```
#### User
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() primary key,
  email varchar(50) unique,
  userName varchar(50) not null,
  firstName varchar(50) not null,
  lastName varchar(50) not null,
  password varchar(300) not null
);
```

#### Orders
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR (50) NOT NULL,
  userId uuid DEFAULT uuid_generate_v4() REFERENCES users(id) NOT NULL
)
```
#### Products for each Order Schema
```sql
CREATE TABLE orders_product(
  id SERIAL PRIMARY KEY,
  orders_id BIGINT REFERENCES orders(id) NOT NULL,
  product_id BIGINT REFERENCES product(id) NOT NULL,
  quantity INT
);
```
```
