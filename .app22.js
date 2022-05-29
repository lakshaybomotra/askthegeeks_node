const mysql = require('mysql');
const express = require('express');
const cors=require("cors");
const bodyparser = require('body-parser');

const db = mysql.createConnection({
  host: "localhost",
  database: "askthegeeksdb",
  user: "askthegeeksadmin",
  password: "askthegeeks@21"
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

const app = express();

app.use(bodyparser.json());

const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(5000, () => {
  console.log('Server started on port 5000');
});



app.post('/insert', (req, res) => {
  
  console.log(req.body);
  let form = req.body;
  let sql = `INSERT INTO admintable(email, password, fullname, mobile, admintype) VALUES ('${form.email}', '${form.password}', '${form.fullname}', '${form.mobile}', '${form.admintype}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post added...');
  });
});