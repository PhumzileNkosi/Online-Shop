
const { auth, requiresAuth } = require('express-openid-connect');
const express = require("express");
const https = require("https");
const fs= require("fs");
const path = require("path");
require('dotenv').config();
const connect = require('./src/helpers/connect');
const service = require('./src/helpers/service');

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
          title: 'Online Store Grad Project',
          isAuthenticated: req.oidc.isAuthenticated(),
          user: req.oidc.user,
          products: results
        })
    })
    .catch(function(err){
      console.log("Promise rejection error: "+err);
    })
})


app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});


app.get('/cart', requiresAuth(), (req, res) => {
  res.render(path.join(__dirname, 'views/pages/cart.ejs'), {
    title: 'Cart Page',
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  })
});
