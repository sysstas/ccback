-- create db
CREATE DATABASE ccdb;
--CITIES
CREATE TABLE cities ( 
    ID int NOT NULL AUTO_INCREMENT, 
    cityName varchar(40) NOT NULL,     
    PRIMARY KEY (ID) 
);
-- MASTERS
CREATE TABLE masters ( 
    ID int NOT NULL AUTO_INCREMENT, 
    masterName varchar(30) NOT NULL, 
    cityID int NOT NULL, 
    masterRating int NOT NULL, 
    PRIMARY KEY (ID) 
);

-- CLIENTS
CREATE TABLE clients (
    ID int NOT NULL AUTO_INCREMENT,
    clientName varchar(30) NOT NULL,
    clientEmail varchar(50) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

--ORDERS
CREATE TABLE orders (
    ID int NOT NULL AUTO_INCREMENT,
    cityID int NOT NULL,
    masterID int NOT NULL,
    clientID int NOT NULL,
    date bigint(20) NOT NULL,
    time int NOT NULL,
    duration int NOT NULL,
    PRIMARY KEY (ID)
);