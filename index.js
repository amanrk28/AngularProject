const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

let db = null;
MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  db = client.db("aman");
});

app.get("/bookings", (req, res) => {
  db.collection("bookings")
    .find({})
    .toArray((err, result) => {
      res.send(result);
    });
});

app.post("/bookings", (req, res) => {
  var trans = req.body;
  trans._id = Math.random().toString();
  db.collection("bookings").insertOne(trans, function (err, resp) {
    if (err) throw err;
    console.log("Document Inserted");
  });
  res.send("POST Request Called");
});

app.put("/bookings", (req, res) => {
  var data = req.body;
  var updateData = {
    $set: { ...data },
  };
  db.collection("bookings").updateOne(
    { _id: data._id },
    updateData,
    function (err, res) {
      if (err) throw err;
      console.log("Document Updated");
    }
  );
  res.send("PUT Request Called");
});

// app.delete("/bookings", (req, res) => {
//   var { _id } = req.query;
//   db.collection("bookings").deleteOne({ _id }, function (err, obj) {
//     if (err) throw err;
//     console.log(obj);
//     console.log("Document Deleted");
//   });
//   res.send("DELETE Request Called");
// });

app.listen(8000, () => {
  console.log("Server running on localhost:8000...");
});
