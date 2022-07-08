const express = require("express");
const https = require("https");
const fs= require("fs");
const path = require("path");
const connect = require('./src/helpers/connect');
const app = express();


const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'/public/')))
https.createServer(

  {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
  },
  app).listen(PORT, ()=>{
  console.log(`server is runing at port ${PORT}`)
});

app.get('/', (req,res)=>{
 res.sendFile(__dirname + '/public/home.html');

// res.set('Content-Type', 'text/html');
// res.send(Buffer.from(`<h2>${connect.getAllProducts()}</h2>`));
 
})

