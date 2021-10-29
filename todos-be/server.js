const express = require("express");

let app = express();

app.get("/", (req, res) => {
  res.send("我是首頁");
});
app.get("member", (req, res) => {
  res.send("我是會員頁");
});

app.listen(3001, () => {
  console.log("express app 啟動了喔");
});
