const  express=  require('express');
const app =express();
const port = 3000;
const connectDB = require('./SRC/MongoDB/Database')
const User = require('./SRC/Model/User');
const { ReturnDocument } = require('mongodb');

app.use(express.json());

app.post("/signup", async (req, res)=>{
    // const userObj = {
    //     firstname:"zera",
    //     password:"2121@11",
    //     gender:"female"
    // }
    const userObj = req.body
    const userInstance = new User(userObj);
    try {
        await userInstance.save();
        res.send("Added sucessfully")
    }
    catch(e){
        res.sendStatus(500).send("Error")
    }

})

app.get("/user", async(req, res)=>{
    let emailId = req.body.emailId
    try {
        const user = await User.find({emailId: emailId})
        res.send(user);
    }
    catch(e) {
        res.send("something went wrong")
    }
})

app.get("/feed", async(req, res)=>{
    try {
        const users = await User.find({})
        res.send(users);
    }
    catch(e) {
        res.send("something went wrong")
    }
})

app.delete("/user", async(req ,res) =>{
     try {
        const userId = req.body.userId
        await User.findByIdAndDelete({_id : userId })
        res.send("Deleted the record");
    }
    catch(e) {
        res.send("something went wrong")
    }
})

app.patch("/user", async(req ,res) =>{
     try {
        const userObj = req.body
        const userId = req.body.userId;
        const beforeValue = await User.findByIdAndUpdate(userId, userObj, { ReturnDocument: "before"})
         const afterValue = await User.findByIdAndUpdate(userId, userObj, { ReturnDocument: "after"})
        console.log(userId, beforeValue, afterValue)

        res.send("updated the record");
    }
    catch(e) {
        res.send("something went wrong")
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
