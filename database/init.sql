CREATE DATABASE LP_db;
USE LP_db;
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100)
);

INSERT INTO user (username, password) VALUES ("test", "1234");