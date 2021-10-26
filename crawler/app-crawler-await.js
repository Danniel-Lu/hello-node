const axios = require("axios");

let stockCode = "2330";
let today = "20211017";
let format = "json";

let stockData = axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
  params: {
    response: format,
    date: today,
    stockNo: stockCode,
  },
});

(async () => {
  try {
    let show = await stockData;
    console.log(show.data);
  } catch (e) {
    console.error(e);
  }
})();
