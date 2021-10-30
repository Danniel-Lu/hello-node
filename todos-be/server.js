const express = require("express");
const mysql = require("mysql");
const Promise = require("bluebird");
const cors = require("cors");
require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_POST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

let app = express();

app.use(cors());

//列表:拿全部資料
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

//根據id取得單筆資料
//要加冒號
app.get("/api/todos/:todoId", async (req, res) => {
  //從client端送請請求所以要用req
  // req.params.todoId
  let data = await connection.queryAsync("SELECT * FROM todos WHERE id = ?;", [
    req.params.todoId,
  ]);
  // res.json(data); 會用陣列包住
  if (data.length > 0) {
    //因為確定只有一筆，所以可以只抓第0筆，這樣就不會有陣列框框，會直接顯示物件了
    res.json(data[0]);
  } else {
    //data裡沒資料 ex./api/todo/44
    // res.send(null);
    res.status(404).send("Not Found data");
  }
});

app.use((req, res, next) => {
  console.log("我是路由後面的中間件");
  res.status(404).send("404");
});

app.listen(3001, () => {
  connection.connect();
  console.log("express app 啟動了");
});
