/// MASTERS
CREATE TABLE masters ( 
    MasterID int NOT NULL AUTO_INCREMENT, 
    masterName varchar(30) NOT NULL, 
    cityID int NOT NULL, 
    masterRating int NOT NULL, 
    PRIMARY KEY (MasterID) 
);

/// CLIENTS
CREATE TABLE clients (
    ID int NOT NULL AUTO_INCREMENT,
    clientName varchar(30) NOT NULL,
    clientEmail varchar(50) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

///ORDERS
CREATE TABLE orders (
    ID int NOT NULL AUTO_INCREMENT,
    cityID int NOT NULL,
    masterID int NOT NULL,
    clientID int NOT NULL,
    date int(15) NOT NULL,
    time int NOT NULL,
    duration int NOT NULL,
    PRIMARY KEY (ID)
);