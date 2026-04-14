const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema(
   {
    firstname:{
       type: String,
    },
    lastname:{
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
      validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Not a Valid Email")
         }
      }
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
