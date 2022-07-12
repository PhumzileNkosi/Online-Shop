
const { auth, requiresAuth } = require('express-openid-connect');
const express = require("express");
const https = require("https");
const fs= require("fs");
const path = require("path");
const bodyParser = require('body-parser')
require('dotenv').config();
const connect = require('./src/helpers/connect');
const service = require('./src/helpers/service');

const jsonParser = bodyParser.json()
const app = express();

const config = {

  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET_KEY
  
};

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'/public/')))
app.set('view engine', 'ejs');
app.use(auth(config));

https.createServer(
  {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
  },
  app).listen(PORT, ()=>{
  console.log(`server is running at port ${PORT}`)
});

app.get('/', (req,res)=>{
  service.getAllProducts()
  .then(function(results){
      res.render("pages/home", {
        title: 'Online Store ',
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user
      })
  })
  .catch(function(err){
    console.log("Promise rejection error: "+err);
  })
})


app.get('/cart', requiresAuth(), (req, res) => {
  res.render(path.join(__dirname, 'views/pages/cart.ejs'), {
    title: 'Cart Page',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  })
});


app.get('/api/products', requiresAuth() , (req, res) => {

    service.getAllProducts()
    .then(function(results){ 
       res.json(results)
    })
    .catch(function(err){
      console.log("Promise rejection error: "+err);
      res.status(500)
    })

});

app.put('/api/cart', requiresAuth(), jsonParser , (req, res) => {

  let request = {
    item : req.body.item,
    quantity: req.body.quantity,
    user: req.oidc.user.sub
  }

  console.log(request)

  //Add validation on SQL side to check that the user has not inputted an invalid Quantity for item


})


app.get('/api/cart', requiresAuth() , (req, res) => {

  service.getCart(req.oidc.user.sub)
  .then(function(results){ 
     res.json(results)
  })
  .catch(function(err){
    console.log("Promise rejection error: "+err);
    res.status(500)
  })

});

app.put('/api/cart/:productID/:userID', (req, res) => {
  service.removeProductFromCart(req.params.userID, req.params.productID)
  .then(function(results){
    res.json(results)
  })
  .catch(function(err){
    console.log("Promise reject error: " + err);
  })
})