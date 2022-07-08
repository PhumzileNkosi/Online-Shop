CREATE DATABASE onlineshopDB;

CREATE TABLE `Cart` (
  `CartID` Integer,
  `UserID` Integer,
  `Date` Date,
  `Total` Float,
  PRIMARY KEY (`CartID`)
  
);

CREATE TABLE `Product` (
  `ProductID` Integer,
  `Name` Varchar(50),
  `Price` Float,
  `Quantity` Integer,
  PRIMARY KEY (`ProductID`)
);

CREATE TABLE `Cart_Product` (
  `CartID` Integer,
  `Product_ID` Integer,
  `Quantity` Integer,
  PRIMARY KEY (`CartID`, `Product_ID`),
  FOREIGN KEY (`CartID`) REFERENCES `Cart`(`CartID`),
  FOREIGN KEY (`Product_ID`) REFERENCES `Product`(`ProductID`)
);

