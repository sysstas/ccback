-- create db
CREATE DATABASE ccdb;
--CITIES
CREATE TABLE cities ( 
    id int NOT NULL AUTO_INCREMENT, 
    cityName varchar(40) NOT NULL, 
    createdAt varchar(40),
    updatedAt varchar(40),
    PRIMARY KEY (ID) 
);
-- MASTERS
CREATE TABLE masters ( 
    id int NOT NULL AUTO_INCREMENT, 
    masterName varchar(30) NOT NULL, 
    cityId int NOT NULL, 
    masterRating int NOT NULL, 
	createdAt varchar(40),
    updatedAt varchar(40),
    PRIMARY KEY (ID) 
);


-- USERS
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    userName varchar(30) NOT NULL,
    userEmail varchar(50) NOT NULL UNIQUE,
    createdAt varchar(40),
    updatedAt varchar(40),
    isAdmin int(1) NOT NULL,
    regToken varchar(4000),
    isRegistered int(1) NOT NULL,
    password varchar(4000) NOT NULL,
    PRIMARY KEY (ID)
);

--ORDERS
CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    cityId int NOT NULL,
    masterId int NOT NULL,
    clientId int NOT NULL,
    date bigint(20) NOT NULL,
    time int NOT NULL,
    duration int NOT NULL,
    createdAt varchar(40),
    updatedAt varchar(40),
    PRIMARY KEY (ID)
);

