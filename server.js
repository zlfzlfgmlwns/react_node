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


const multer = require('multer');
const upload = multer({dest:'./upload'})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0", 
      (err,rows, fields) => {
        res.send(rows);
      }
    )
})

app.use('/image',express.static('./upload'));


app.post('/api/customers', upload.single('image'), (req,res)=>{
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday= req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields)=>{
    res.send(rows);
    }
  );
});

app.delete('/api/customers/:id', (req,res)=>{
  let sql= 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params, 
    (err, rows, fields)=>{
      res.send(rows);
    }
  )
});


app.listen(port, ()=> console.log(`Listening on port ${port}`));