const  express=  require('express');
const app =express();
const port = 3000;
const {adminAuth, userAuth}= require('./middleware/auth')
// app.get('/', (req, res)=>{
//     res.send('Hello from express')
//     // overide all other /dash, /home etc..
// })
app.get('/test', (req, res)=>{
    console.log(req.query)
    res.send({firstname: "Gaurav", lastname: "Adhikari"})
})

app.get('/ab+', (req, res)=>{
    res.send({usecase:"ab+"})
})

app.get('/ab+c', (req, res)=>{
    res.send({usecase:"ab+c" })
})
app.delete('/test', (req, res)=>{

    res.send('Successfully deleted the data')
})
app.post('/test', (req, res)=>{
    res.send('Successfully saved the data')
})

// app.get('/user/:id/:pass',(req, res)=>{
//     console.log(req.params, "second")
//     res.send(req.params)
// })
// app.get('/user/:id',(req, res)=>{
//     console.log(req.params, "one")
//     res.send(req.params)
// })
app.use('/user/login',(req, res, next)=>{
    res.send("Logged in As User")
})
app.use('/admin', adminAuth)
app.use('/admin/dashboard', (req, res, next)=>{
    res.send("admin data sent")
})
app.use('/user', userAuth, (req, res)=>{
    res.send("user data sent")
})

app.use('/route',
    (req, res, next)=>{
        console.log(req.params, "one")
        next();
        //res.send("calling from one")
    },
    (req, res, next)=>{
        console.log(req.params, "one")
        res.send("calling from one 2")
    }
)



app.listen(port, ()=>{
    console.log(`express server is running on port ${port}`)
})