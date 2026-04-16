const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

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
userSchema.methods.getJwt = async function() {
   const user = this;
   const token = await jwt.sign({ _id: user._id }, '12345', { expiresIn: '2h' });
   return token
}
userSchema.methods.validatePassword = async function(userInputPassword) {
   const user = this;
   const hashedPassword = user.password;

   const isValid = await bcrypt.compare(userInputPassword, hashedPassword);
   return isValid
}

const User = mongoose.model("User",userSchema)
console.log(User, "User ddsf")
module.exports = User;
