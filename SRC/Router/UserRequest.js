const express = require("express");
const {userAuth} = require("../Middleware/auth");
const ConnectionRequest = require("../Model/ConnectionRequest");
const User = require("../Model/User");
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

module.exports = userRequestsRouter