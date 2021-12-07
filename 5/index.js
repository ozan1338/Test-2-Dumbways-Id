require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql');
const ejs = require('ejs');
const homeRoute = require('./routes/homeRoute');
const provinsiRoute = require('./routes/provinsiRoute');
const kabupatenRoute = require('./routes/kabupatenRoute');

const PORT = 3000;

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use('/',homeRoute);
app.use('/provinsi',provinsiRoute);
app.use('/kabupaten',kabupatenRoute);

app.listen(PORT , ()=>{
    console.log(`App listeninf at port ${PORT}`);
})
