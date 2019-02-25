const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;


const databaseInfo = fs.readFileSync('./database.json');
const databaseData = JSON.parse(databaseInfo);

const connection = mysql.createConnection({
    host:databaseData.host,
    user:databaseData.user,
    password:databaseData.password,
    port:databaseData.port,
    database:databaseData.database
})

connection.connect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    connection.query(
      "SELECT * FROM CUSTOMER", 
      (err,rows, fields) => {
        res.send(rows);
      }
    )
})

app.listen(port, ()=> console.log(`Listening on port ${port}`));