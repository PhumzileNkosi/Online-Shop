CREATE DATABASE onlineshopDB;

CREATE TABLE `Product` (
  `ProductID` Binary(16) Default (uuid_to_bin(uuid())) UNIQUE NOT NULL,
  `Name` Varchar(50) NOT NULL,
  `Description` Varchar(255),
  `Price` Float NOT NULL,
  `Quantity` Integer,
  PRIMARY KEY (`ProductID`)
);

CREATE TABLE `Cart_Product` (
  `SubjectID` Varchar(100)  NOT NULL,
  `ProductID` Binary(16) NOT NULL,
  `Quantity` Integer,
  PRIMARY KEY (`SubjectID`, `ProductID`),
  FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`)
);

