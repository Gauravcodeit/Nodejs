const validator = require('validator');

const ValidateSignupData = (req) => {
    const {firstname, lastname, emailId, password} = req.body;

    if (!firstname || !lastname || !emailId || !password ) {
        throw new Error("Kindly Update all the required details");
    }
    if (!validator.isEmail(emailId)){
        throw new Error("Enter a Valid Email")
    }
    if (!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password")
    }
}

const IsStrongPassword = (password)  => {
    if (!validator.isStrongPassword(password)){
        throw new Error("Enter a strong new password")
    }

}

const ValidateProfileData = (req) =>{
    const allowedValues = ['firstname', 'lastname', 'age', 'gender', 'skills'];
    const isvalid = Object.keys(req.body).every((value)=>{
        return allowedValues.includes(value)
    })
    return isvalid
}


module.exports = {
    ValidateSignupData,
    ValidateProfileData,
    IsStrongPassword
}
