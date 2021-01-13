\c allys_closet

DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  product_name TEXT,
  gender TEXT,
  size TEXT,
  image TEXT,
  price FLOAT,
  quantity INT,
  description TEXT,
  category TEXT,
  brand TEXT,
  color TEXT
);