const  express=  require('express');
const app =express();
const port = 3000;
const connectDB = require('./SRC/MongoDB/Database')

connectDB()
.then(()=>{
    console.log("Connected to database now..")
    app.listen(port, ()=>{
        console.log(`express server is running on port ${port}`)
    })
})
.catch((error)=>{
    console.log("Issue while connecting to Database", error)
})
