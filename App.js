console.log("a");
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