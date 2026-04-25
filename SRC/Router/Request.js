const express = require("express");
const { userAuth } = require('../Middleware/auth');
const ConnectionRequest = require("../Model/ConnectionRequest");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res)=>{
    try {
        const fromUserId = await req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const allowedStatus = ['Interested', 'Ignored']
        if (!allowedStatus.includes(status)){
            return res.json({message : "Invalid Connection Request"})
        }
        const isRequestExist = await ConnectionRequest.findOne({
            $or:[
               {toUserId: toUserId, fromUserId : fromUserId },
                {toUserId: fromUserId, fromUserId : toUserId }
            ]
        })
        if (isRequestExist){
            throw new Error ("already request was sent ")
        }
        await connectionRequest.save();
        res.send("Connection request sent by " + req.user.firstname)
    }
    catch(e) {
        res.send(e.message)
    }
})


module.exports = requestRouter