const  express=  require('express');
const app =express();
const port = 3000;
const connectDB = require('./SRC/MongoDB/Database')
const User = require('./SRC/Model/User');
const { ReturnDocument } = require('mongodb');
const bcrypt = require('bcrypt')
const { ValidateSignupData } = require('./SRC/Utility/ValidateSignupData');
const { cookie } = require('express/lib/response');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser())
app.post("/signup", async (req, res)=>{
    // const userObj = {
    //     firstname:"zera",
    //     password:"2121@11",
    //     gender:"female"
    // }

    try {
        ValidateSignupData(req)

        const {firstname, lastname, emailId, password, age} = req.body;
        const hashedPassword = await bcrypt.hash(password,10)
        // Password hashing
        const userInstance = new User({
            firstname,
            lastname,
            emailId,
            password: hashedPassword,
            age
        });
        await userInstance.save();
        res.send("Added sucessfully")
    }
    catch(e){
        res.status(500).send(e.message)
    }

})

app.post("/login", async (req, res)=>{
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if (!user) {
            throw new Error("User does not exists")
        }
        const isExists = await bcrypt.compare(password, user.password);
        if (!isExists) {
            throw new Error("Invalid Credentails")
        }
        const token =  jwt.sign({ _id: user._id }, '12345');
        res.cookie("token", token)
        res.send("Logged In successfully")
    }
    catch(e) {
       res.status(500).send(e.message)
    }
})

app.get("/profile", async(req,res)=>{
    try {
        const {token} = req.cookies;
        if(!token){
           throw new Error("UnAuthorised ")
        }

        const decoded = await jwt.verify(token, '12345');
        const user = await User.findOne({_id: decoded._id})
        console.log(token, decoded._id)
        res.send(user)
    }
    catch(e) {
        res.send(e.message)
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

app.patch("/user/:userId", async(req ,res) =>{
     try {

        const userObj = req.body
        const userId = req.params.userId;
        const allowedUpdate = ['firstname', 'skills', 'gender'];
        const isAllowedUpdate = Object.keys(req.body).every((k) => allowedUpdate.includes(k))
        if (userObj.skills.length > 5){
            throw new Error("skills caannot be more than 5 - Update not allowed")
        }
        if(!isAllowedUpdate){
            throw new Error("update not allowed")
        }
       // const beforeValue = await User.findByIdAndUpdate(userId, userObj, { ReturnDocument: "before"})
         const afterValue = await User.findByIdAndUpdate(userId, userObj, { ReturnDocument: "after", runValidators: true})
        // console.log(userId, beforeValue, afterValue)
        // we have runvalidtor because it can validate also in case of update as if do not call it will not work for
        // update case and only work for first time we are saving the value to database
        res.send("updated the record");
    }
    catch(e) {
        res.status(400).send(e.message)
    }
})
connectDB()

.then(async ()=>{
    console.log("Connected to database now..")
    // await User.createIndexes(); // Ensure unique indexes are created
    app.listen(port, ()=>{
        console.log(`express server is running on port ${port}`)
    })
})

.catch((error)=>{
    console.log("Issue while connecting to Database", error)
})

// api level validation