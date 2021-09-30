# event loop 作業

## 老師我的理解有錯的話糾正我一下 謝謝!

程式 1: 請問以下執行結果為何？ after 會在什麼數字後印出？ 為什麼？  
提示: 手動自己畫畫看整段程式的執行過程，call stack 的變化為何？
A:
請問以下執行結果為何？
1~500 after
after 會在什麼數字後印出？
500
為什麼？
for 迴圈在 i=100 時跳出，此時 idx=100，100<500 執行 if 判斷式又再執行 readData(idx)，重複 5 次後 idx=500 就跳出迴圈了。

```javascript
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    readData(idx);
  }
}

readData(0);
console.log("after");
```

程式 2: 請問以下執行結果為何？ after 會在什麼數字後印出？ 為什麼？  
提示: 手動自己畫畫看整段程式的執行過程，call stack 的變化為何？
A:
請問以下執行結果為何？
1~100 after 101~500
after 會在什麼數字後印出？
100
為什麼？
for 迴圈在 i=100 時跳出，此時 idx=100，100<500 執行 if 判斷式，遇到 setTimeout 將其丟到 webapi，此時 stack 先繼續執行 after 後，event loop 才會把在 queue 裡的 call back 放到 stack 執行。

```javascript
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    setTimeout(function () {
      readData(idx);
    }, 0);
  }
}

readData(0);
console.log("after");
```
