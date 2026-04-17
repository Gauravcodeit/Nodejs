const express = require("express");
const { userAuth } = require('../Middleware/auth');
const profileRouter = express.Router();




profileRouter.get("/profile", userAuth, async(req,res)=>{
    try {
        const {user} = req
        res.send(user)
    }
    catch(e) {
        res.send(e.message)
    }

})

module.exports = profileRouter