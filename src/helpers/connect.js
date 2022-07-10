require('dotenv').config();
const mysql = require('mysql')

let connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB
});

let connect = function(err) {
    connection.connect()
    if (err) {
         console.error('error: ' + err.message);
    }
    console.log( "success")
}

const getAllProducts = function(){
    return new Promise(function(resolve, reject){
      connection.query(
          "SELECT BIN_TO_UUID(ProductID) AS Product_ID, Name,Description, Price, Quantity FROM Product", 
          function(err, rows){                                                
              if(rows === undefined){
                  reject(new Error("Error rows is undefined"));
              }else{
                  resolve(rows);
              }
          }
      )}
)}



let getProductById = function(id) {

}

let getProductsByName = function(name) {

}

let addProductToCart = function(cartID, userID, qunatity) {

}

let getUserCart = function (userID) {

}

let removeProductFromCart = function (cartID, productID) {

}

let checkoutCart = function(cartID, userID) {

}

module.exports ={connect:connect, getAllProducts: getAllProducts}