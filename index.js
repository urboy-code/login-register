const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'result_db'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//tampilkan semua data product
app.get('/api/login',(req, res) => {
  let sql = "SELECT * FROM login";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//tampilkan data product berdasarkan id
app.get('/api/login/:id',(req, res) => {
  let sql = "SELECT * FROM login WHERE user_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Tambahkan data product baru
app.post('/api/login',(req, res) => {
  let data = {username: req.body.username, email: req.body.email, password: req.body.password};
  let sql = "INSERT INTO login SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": "Berhasil di Buat"}));
  });
});
 
//Edit data product berdasarkan id
app.put('/api/login/:id',(req, res) => {
  let sql = "UPDATE login SET username='"+req.body.username+"', email='"+req.body.email+"', password='"+req.body.password+"' WHERE user_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": "Berhasil di Update"}));
  });
});
 
//Delete data product berdasarkan id
app.delete('/api/login/:id',(req, res) => {
  let sql = "DELETE FROM login WHERE user_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": "Berhasil di hapus"}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
