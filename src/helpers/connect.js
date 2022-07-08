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

let getAllProducts =function() {
    const sqlQuery='select * from Product'
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
        return console.error(error.message);
        }
        const resultJSON =JSON.parse(JSON.stringify(results));
        console.log(resultJSON);
    });
}

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