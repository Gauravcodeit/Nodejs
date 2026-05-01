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
       return res.send(e.message)
    }
})

requestRouter.post("/request/review/:status/:reqId", userAuth, async(req, res)=>{
    try {
        const allowedStatus = ['Accepted', 'Rejected'];
        const {status,reqId} = req.params;
        const toUserId = req.user

        if (!allowedStatus.includes(status)){
            throw new Error("Status is Invalid")
        }

        const connectionRequest =  await ConnectionRequest.findOne({
            toUserId : toUserId,
            status: 'Interested',
            _id: reqId
        })

        if (!connectionRequest){
            throw new Error("No Request Found")
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();
        return res.status(200).json(
            {
                message: `Request is successfully ${status}`,
                data : data
            }
        )
    }
    catch (e) {
        return  res.status(400).json({'message' : e.message})
    }
})

module.exports = requestRouter