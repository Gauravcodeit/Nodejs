const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
   {
    firstname:{
       type: String,
    },
    password:{
       type: String,
    },
    age:{
       type: Number,
       required: true
    },
    gender:{
       type: String,
       validate(value){
         if(!["male", "female", "orther"].includes(value)){
            throw new Error("Gender data is not valid")
         }
       }
    },
    emailId:{
      type: String,
      unique: true,
    },
    skills:{
      type: [String]
    }
},
{
   timestamps: true

}
);

const User = mongoose.model("User",userSchema)
console.log(User, "User ddsf")
module.exports = User;
