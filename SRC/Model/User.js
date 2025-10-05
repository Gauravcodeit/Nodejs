const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname:{
       type: "String"
    },
    password:{
       type: "String"
    },
    age:{
       type: "String"
    },
    gender:{
       type: "String"
    }
});

const User = mongoose.model("User",userSchema)
console.log(User, "User ddsf")
module.exports = User;