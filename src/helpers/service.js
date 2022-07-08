const connect = require('./connect');

//This unit is responsible for db quqries results messaging to mee the the business requirements.
//It is used by the pages' JS scripts and adds a layers for separation of concerns
//also used to extract parameters from request for db queries

const getAllProducts = () => {
    return connect.getAllProducts()
}

module.exports = {getAllProducts:getAllProducts}