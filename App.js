console.log("a");
const fs = require("fs");
const https = require("https");
const http = require("http");
const server =http.createServer((req, res)=>{

   if (req.url=== "/homepage" ){
        res.end("homepage")
   }
   else{
    res.end("main server")
   }
   console.log("server")

})
server.listen(5500, ()=>{
    console.log("server is running on localhost")
})

https.get('https://dummyjson.com/products/1', (res)=>{
    console.log("result from http request")
})
fs.readFile("./file.txt", "utf8", (err, data)=>{
    console.log("file data", data)
})

// require("./xyz");
//  MODULE TYPE  PACKAGE JSON
// import { calculate } from "./sum.js";
const {calculate} = require("./sum");
calculate(5,5)
setTimeout(()=>{
    console.log("zero second")
}, 0)
function var1(){
    return "var1"
}
function var2 (){
    return ("var 2" + var1())
}
console.log(var2())
console.log(var1())
function var3(){
    console.log("var3")
    setTimeout(()=>{
        console.log("settime inside function zero second")
    },0)
}
var3()
function var4 (){
    return ("var 2" + var1())
}
console.log(var4())

for ( let i = 0;  i< 1000; i++ ){
    if (i % 100 == 0 ) console.log("win", i)
}