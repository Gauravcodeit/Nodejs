const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const userAuth = async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error("Token is not valid")
        }
        const decodedObj = await jwt.verify(token, '12345')
        const user = await User.findOne({_id : decodedObj._id})
        if (!user) {
            throw new Error("User does not exist")
        }
        req.user = user;
        next()
    }
    catch(e) {
       res.status(500).send(e.message)
    }

}

const adminAuth = (req, res, next)=>{
    console.log("Admin API Auth Is Checked")
    const token = 'admin'
    const isAuthorized = token === 'admin'
    if (!isAuthorized){
        res.status(401).send("Unauthorized")
    }
    else{
        next()
    }
}

// const userAuth = (req, res, next)=>{
//     console.log("USer API Auth Is Checked")
//     const token = 'user'
//     const isAuthorized = token === 'user'
//     if (!isAuthorized){
//         res.status(401).send("Unauthorized")
//     }
//     else{
//         next()
//     }
// }

module.exports ={
    adminAuth,
    userAuth
}