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


module.exports = {
    ValidateSignupData
}
