const connect = require('./connect');

//This unit is responsible for db quqries results messaging to mee the the business requirements.
//It is used by the pages' JS scripts and adds a layers for separation of concerns
//also used to extract parameters from request for db queries

const getAllProducts = () => {
    
    return new Promise(function(resolve, reject){
        connect.getAllProducts()
        .then(function(results){
            resolve(results) ; 
        })
        .catch(function(err){
            reject(err);
        }
    )})
}


const getCart = (subject) => {
    
    return new Promise(function(resolve, reject){
        connect.getUserCart(subject)
        .then(function(results){
            resolve(results) ; 
        })
        .catch(function(err){
            reject(err);
        }
    )})
}

const removeProductFromCart = (subjectId, productID) => {
    console.log("Service")
    console.log(subjectId, productID)
    return new Promise(function(resolve, reject) {
        connect.removeProductFromCart(subjectId, productID)
        .then(function(results) {
            resolve(results);
        })
        .catch(function(err) {
            reject(err);
        })
    })
}

const addtoCart = (productID,subject, quantity) => {
    return new Promise(function(resolve, reject){
        connect.addToCartNew(productID,subject,quantity)
        .then(function(results){
            resolve(results) ; 
        })
        .catch(function(err){
            reject(err);
        }
    )})
}
const getProductsByName = (name) => {
    
    return new Promise(function(resolve, reject){
        connect.getProductsByName(name)
        .then(function(results){
            resolve(results) ; 
        })
        .catch(function(err){
            reject(err);
        }
    )})
}
module.exports ={getAllProducts: getAllProducts, getCart:getCart, addtoCart, getProductsByName: getProductsByName, removeProductFromCart: removeProductFromCart}
