const express = require("express");
const {userAuth} = require("../Middleware/auth");
const ConnectionRequest = require("../Model/ConnectionRequest");
const User = require("../Model/User");
const { ConnectionStates } = require("mongoose");
const userRequestsRouter = express.Router();
userRequestsRouter.get('/user/request/received', userAuth, async(req, res)=>{

    try {
        // all the request interested recived by user
        const safeData = ['firstname', 'lastname', 'age', 'skills']
        const loggedInUserId = req.user._id
        const requests = await ConnectionRequest.find({
            status: 'Interested',
            toUserId : loggedInUserId
        }).populate('fromUserId',safeData)

        //const data = request.map((row)=> row.fromUserId)

        return res.status(200).json({data: requests})
    }
    catch(e) {
        return res.status(500).json({message: e.message})
    }


})

userRequestsRouter.get('/user/connections', userAuth, async(req, res)=>{
    try {
        const safeData = ['firstname', 'lastname', 'age', 'skills']
        const loggedInUserId = req.user._id
        const connections = await ConnectionRequest.find({
            $or :[
                {
                    status: 'Accepted',
                    toUserId : loggedInUserId
                },
                {
                    status: 'Accepted',
                    fromUserId : loggedInUserId
                }
            ]

        }).populate('fromUserId',safeData).populate('toUserId',safeData);
         //console.log(loggedInUserId.toString())

        const data = connections.map((row)=>{
            //if (row.fromUserId._id.toString() == loggedInUserId.toString())
            if (row.fromUserId._id.equals(loggedInUserId)) {
                return row.toUserId
            }
            return row.fromUserId
        }
        )

        return res.status(200).json({data: data})

    }
    catch(e) {
        return res.status(500).json({message: e.message})
    }

})

userRequestsRouter.get('/feed', userAuth, async(req, res)=>{
    try {
         const safeData = ['firstname', 'lastname', 'age', 'skills'];
         const loggedInUserId = req.user._id;
         let limit =  parseInt(req.query.limit) || 10;
         limit = limit > 50 ? 50 : limit;
         const page = parseInt(req.query.page) || 1;
         const skip = (page - 1)* limit;

         const connections = await ConnectionRequest.find({
            $or : [
                {
                    fromUserId: loggedInUserId
                },
                {
                    toUserId: loggedInUserId
                }
            ]
         }).select("fromUserId toUserId")
         const hiddenUsers = new Set();
         connections.forEach(element => {
            hiddenUsers.add(element.toUserId)
            hiddenUsers.add(element.fromUserId)
         });
         const Users = await User.find({
            $and : [
                {
                    _id : {$nin : Array.from(hiddenUsers)}
                },
                {
                    _id : { $ne : loggedInUserId }
                }
            ]
         }).skip(skip).limit(limit);

        return res.status(200).json({data: Users})

    }
    catch(e) {
        return res.status(500).json({message: e.message})
    }

})
module.exports = userRequestsRouter