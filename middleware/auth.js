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
const userAuth = (req, res, next)=>{
    console.log("USer API Auth Is Checked")
    const token = 'user'
    const isAuthorized = token === 'user'
    if (!isAuthorized){
        res.status(401).send("Unauthorized")
    }
    else{
        next()
    }
}

module.exports ={
    adminAuth,
    userAuth
}