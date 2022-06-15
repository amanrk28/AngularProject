const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/validation.html", (req, res) => {
  res.sendFile(__dirname + "/validation.html");
});
app.get("/list.html", (req, res) => {
  res.sendFile(__dirname + "/list.html");
});
app.get("/form-styles.css", (req, res) => {
  res.sendFile(__dirname + "/form-styles.css");
});

let db = null;
MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  db = client.db("aman");
});

app.get("/transaction", (req, res) => {
  db.collection("transaction")
    .find({})
    .toArray(function (err, result) {
      res.send(result);
    });
});

app.put("/transaction", (req, res) => {
  var trans = req.body;
  console.log(trans);
  trans._id = Math.random().toString();
  db.collection("transaction").insertOne(trans, function (err, resp) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  res.send("PUT Request Called");
});

app.delete("/transaction", (req, res) => {
  var name_del = req.query.CVV;
  console.log(name_del);
  var myquery = { CVV: name_del };
  db.collection("transaction").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log(obj);
    console.log("1 document deleted");
  });
  res.send("DELETE Request Called");
});

app.listen(8000, () => {
  console.log("Server running at localhost:8000...");
});
