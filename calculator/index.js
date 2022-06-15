const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/add", (req, res) => {
  var first = req.query.first;
  var second = req.query.second;
  var value = Number(first) + Number(second);
  var result = { result: value };
  res.send(result);
});
app.get("/subtract", (req, res) => {
  var first = req.query.first;
  var second = req.query.second;
  var value = Number(first) - Number(second);
  var result = { result: value };
  res.send(result);
});
app.get("/multiply", (req, res) => {
  var first = req.query.first;
  var second = req.query.second;
  var value = Number(first) * Number(second);
  var result = { result: value };
  res.send(result);
});
app.get("/divide", (req, res) => {
  var first = req.query.first;
  var second = req.query.second;
  var value = Number(first) / Number(second);
  var result = { result: value };
  res.send(result);
});
app.listen(8000, () => {
  console.log("Server running at localhost:8000");
});
