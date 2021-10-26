const axios = require("axios");

let stockCode = "2330";
let today = "20211017";
let format = "json";

axios
  .get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
    params: {
      response: format,
      date: today,
      stockNo: stockCode,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
