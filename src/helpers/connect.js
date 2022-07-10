const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'onlineshopdb.cvwsebtgmvlx.af-south-1.rds.amazonaws.com',
    user: 'onlineshopDB',
    password: 'onlineshopDB',
    database: 'onlineshopDB'
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
          "SELECT ProductID, Name, Price, Quantity FROM Product", 
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

let addProductToCart = function(cartID, userID, product) {

}

let getUserCart = function (userID) {

}

let removeProductFromCart = function (cartID, productID) {

}

let checkoutCart = function(cartID, userID) {

}

module.exports ={connect:connect, getAllProducts: getAllProducts}