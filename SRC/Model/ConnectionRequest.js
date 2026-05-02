const mongoose = require('mongoose');

const ConnectionRequestSchema = mongoose.Schema(
    {
        fromUserId : {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        toUserId : {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        status : {
            type: String,
            enum: ['Interested', 'Ignored', 'Accepted', 'Rejected'],
            message: '`{VALUE}` is not valid Request'
        }
    },
    {
         timestamps: true

    }
);
ConnectionRequestSchema.pre('save', function (next){
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("Cannot send request to yourself")
    }
    next()
})

ConnectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequestSchema)
module.exports = ConnectionRequest;
