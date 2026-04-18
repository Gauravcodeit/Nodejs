const express = require("express");
const { userAuth } = require('../Middleware/auth');
const { ValidateProfileData, IsStrongPassword } = require("../Utility/Validator");
const User = require("../Model/User");
const profileRouter = express.Router();
const bcrypt = require('bcrypt')

profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try {
        const {user} = req
        res.send(user)
    }
    catch(e) {
        res.send(e.message)
    }

})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try {
        if (!ValidateProfileData(req)) throw new Error("Not valid Details")
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key] = req.body[key]
        })
        await loggedInUser.save();
        res.json({'message' : "Succesfully Updated", "data" : loggedInUser })
    }
    catch(e) {
        res.send(e.message)
    }

})

profileRouter.patch("/profile/change-password", userAuth, async (req,res)=>{
    try{
        const user =  req.user;
        const isExists = await user.validatePassword(req.body.password);
        if (!isExists) {
            throw new Error("Invalid Credentails")
        }
        IsStrongPassword(req.body.newpassword)
        const hashedPassword = await bcrypt.hash(req.body.newpassword,10);
        user.password = hashedPassword;

        await user.save();
        res.send("Password changed successfully")
    }
    catch(e) {
       res.status(500).send(e.message)
    }
})

module.exports = profileRouter