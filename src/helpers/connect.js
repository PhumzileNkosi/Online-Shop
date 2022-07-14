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
    return new Promise(function(resolve, reject){
        connection.query(
            "SELECT BIN_TO_UUID(ProductID) AS Product_ID, Name,Description, Price, Quantity FROM Product where LOCATE("+connection.escape(name)+", Name);", 
            function(err, rows){                                                
                if(rows === undefined){
                    reject(err.message + "At connect.js line 40 func 'getProductsByName'");
                }else{
                    resolve(rows);
                }
            }
        )}
  )
}

let addProductToCart = function(cartID, userID, qunatity) {

}

let getUserCart = function (userID) {
    return new Promise(function(resolve, reject){
        connection.query(
            `SELECT BIN_TO_UUID(p.ProductID) AS Product_ID, p.Name, p.Description, p.Price, cp.Quantity 
             FROM Product p 
             INNER JOIN Cart_Product cp ON cp.ProductID = p.ProductID
             WHERE cp.SubjectID = '${userID}' AND cp.Quantity > 0`, 
            function(err, rows){                                              
                if(!rows ){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(rows);
                }
            }
        )})
}

let removeProductFromCart = function (subjectID, productID) {
    return new Promise(function(resolve, reject) {
        connection.query(`UPDATE Cart_Product
        SET Quantity = Quantity - 1
        WHERE SubjectID ='${subjectID}' AND ProductID = UUID_TO_BIN('${productID}')`,
        function(err, rows) {
            if (rows === undefined) {
                reject(new Error("Error rows is undefined"));
            }else {
                resolve(rows);
            }
        }
        )}
    )
}

let checkoutCart = function(cartID, userID) {

}

let addToCartNew = function(productID, subject, quantity) {
    return new Promise(function(resolve, reject){
        connection.query(
            `INSERT INTO Cart_Product (ProductID, SubjectID, Quantity)
            VALUES  (UUID_TO_BIN('${productID}'), '${subject}', ${quantity})
            ON DUPLICATE KEY UPDATE
            Quantity = Quantity + VALUES(Quantity)`, 
            function(err, rows){                                                
                if(rows === undefined){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(rows);
                }
            }
        )}
    )
}

module.exports ={connect:connect, getAllProducts: getAllProducts, getUserCart:getUserCart, addToCartNew, getProductsByName: getProductsByName, removeProductFromCart: removeProductFromCart}
