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

const  express=  require('express');
const app =express();
const port = 3000;
const {adminAuth, userAuth}= require('./SRC/Middleware/auth')
// app.get('/', (req, res)=>{
//     res.send('Hello from express')
//     // overide all other /dash, /home etc..
// })
app.get('/test', (req, res)=>{
    console.log(req.query)
    res.send({firstname: "Gaurav", lastname: "Adhikari"})
})

app.get('/ab+', (req, res)=>{
    res.send({usecase:"ab+"})
})

app.get('/ab+c', (req, res)=>{
    res.send({usecase:"ab+c" })
})
app.delete('/test', (req, res)=>{

    res.send('Successfully deleted the data')
})
app.post('/test', (req, res)=>{
    res.send('Successfully saved the data')
})

// app.get('/user/:id/:pass',(req, res)=>{
//     console.log(req.params, "second")
//     res.send(req.params)
// })
// app.get('/user/:id',(req, res)=>{
//     console.log(req.params, "one")
//     res.send(req.params)
// })
app.use('/user/login',(req, res, next)=>{
    res.send("Logged in As User")
})
app.use('/admin', adminAuth)
app.use('/admin/dashboard', (req, res, next)=>{
    try{
        throw new Error("sm nsd")
        //res.send("admin data sent")
    }
    catch(err){
        res.send("error is detected")
    }

})
app.use('/user', userAuth, (req, res)=>{
    res.send("user data sent")
})

app.use('/route',
    (req, res, next)=>{
        console.log(req.params, "one")
        next();
        //res.send("calling from one")
    },
    (req, res, next)=>{
        console.log(req.params, "one")
        res.send("calling from one 2")
        //throw new Error('new error')

    }

)

app.use('/', (err, req, res, next)=>{
    if(err){
        res.send("something went wrong")
    }
    else {
        res.send("response is form /")
    }

})

app.listen(port, ()=>{
    console.log(`express server is running on port ${port}`)
})