const express = require("express");
const { ValidateSignupData } = require('../Utility/Validator');
const User = require('../Model/User');
const bcrypt = require('bcrypt')

const authRouter = express.Router();

authRouter.post("/signup", async (req, res)=>{
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

authRouter.post("/login", async (req, res)=>{
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId});
        if (!user) {
            throw new Error("User does not exists")
        }
        const isExists = await user.validatePassword(password);
        if (!isExists) {
            throw new Error("Invalid Credentails")
        }
        const token =  await user.getJwt()
        res.cookie("token", token,{
            expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
        }
    )
        res.send("Logged In successfully")
    }
    catch(e) {
       res.status(500).send(e.message)
    }
})

authRouter.post("/logout", async (req,res)=>{
    try{
        res.cookie("token", null, {
        expires: new Date(Date.now())
        })
        res.send("Logged Out successfully")
    }
    catch(e) {
       res.status(500).send(e.message)
    }
})


module.exports = authRouter