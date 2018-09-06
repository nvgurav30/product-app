const path = require("path");
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const productRoutes = require('./routes/products');

const app = express();

//Connection to mongDB Atlas cloud database ZSR > CloupShop > Clustor0 > pwd: TQ2EbWSbyT7mZvIC
//"mongodb+srv://Nilesh:TQ2EbWSbyT7mZvIC@cluster0-umhi7.mongodb.net/CloudShopDB?retryWrites=true"
mongoose.connect('mongodb://localhost:27017/myDB', { useNewUrlParser: true })
        .then(() => {
          console.log("Connected to database!");
        })
        .catch(() => {
          console.log("Connection failed!");
        })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
                  'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods',
                  'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next();
});

app.use("/api/products",productRoutes);

module.exports = app;