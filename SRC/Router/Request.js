const express = require("express");
const { userAuth } = require('../Middleware/auth');
const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest", userAuth, async(req, res)=>{
    try {
        const {user} = req
        res.send("Connection request sent by " + user.firstname)
    }
    catch(e) {
        res.send(e.message)
    }
})


module.exports = requestRouter