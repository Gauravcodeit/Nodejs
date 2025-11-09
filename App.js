const  express=  require('express');
const app =express();
const port = 3000;
const connectDB = require('./SRC/MongoDB/Database')
const User = require('./SRC/Model/User')

app.post("/signup", async (req, res)=>{
    const userObj = {
        firstname:"zera",
        password:"2121@11",
        gender:"femalee"
    }
    const userInstance = new User(userObj);
    try {
        await userInstance.save();
        res.send("Added sucessfully")
    }
    catch(e){
        res.sendStatus(500).send("Error")
    }

})

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
