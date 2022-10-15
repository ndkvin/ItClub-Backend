const express = require("express");

// middleware untuk menangani request body
const bodyParser = require("body-parser");
const port = 3000;

const app= express();

// pemanggilan middleware
app.use(bodyParser.json());

app.post("/", (req,res) => {
  // untuk mengakses data yang dikirim menggunakan req.body 
  console.log(req.body);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
