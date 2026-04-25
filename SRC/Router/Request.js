const express = require("express");
const { userAuth } = require('../Middleware/auth');
const ConnectionRequest = require("../Model/ConnectionRequest");
const requestRouter = express.Router();
const User = require('../Model/User')

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
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({message: "ToUserID does not exist"})
        }
        const isRequestExist = await ConnectionRequest.findOne({
            $or:[
               {toUserId: toUserId, fromUserId : fromUserId },
                {toUserId: fromUserId, fromUserId : toUserId }
            ]
        })
        if (isRequestExist){
            throw new Error ("already request was sent from either side")
        }
        const data =await connectionRequest.save();
        res.json({
            message:
            req.user.firstname + " is " + status + " in " + toUser.firstname,
            data,
        });
    }
    catch(e) {
        res.send(e.message)
    }
})


module.exports = requestRouter