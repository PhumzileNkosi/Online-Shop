CREATE DATABASE onlineshopDB;

CREATE TABLE User_Subject (
`SubjectID` Varchar(100) PRIMARY KEY
);

CREATE TABLE `Cart` (
  `CartID` Binary(16) Default (uuid_to_bin(uuid())) UNIQUE NOT NULL,
  `UserSubject` Varchar(100),
  `Date` Date,
  `Total` Float,
  PRIMARY KEY (`CartID`),
  FOREIGN KEY (`UserSubject`) REFERENCES User_Subject(`SubjectID`)
);

CREATE TABLE `Product` (
  `ProductID` Binary(16) Default (uuid_to_bin(uuid())) UNIQUE NOT NULL,
  `Name` Varchar(50) NOT NULL,
  `Description` Varchar(255),
  `Price` Float NOT NULL,
  `Quantity` Integer,
  PRIMARY KEY (`ProductID`)
);

CREATE TABLE `Cart_Product` (
  `CartID`  Binary(16)  NOT NULL,
  `ProductID` Binary(16) NOT NULL,
  `Quantity` Integer,
  `CheckedOut` Boolean,
  PRIMARY KEY (`CartID`, `ProductID`),
  FOREIGN KEY (`CartID`) REFERENCES `Cart`(`CartID`),
  FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`)
);

