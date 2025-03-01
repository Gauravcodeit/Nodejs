const  express=  require('express');
const app =express();
const port = 3000;
app.get('/', (req, res)=>{
    res.send('Hello from express')
    // overide all other /dash, /home etc..
})
app.get('/homes', (req, res)=>{
    res.send('Hello from express Home')
})
app.use('/', (req, res)=>{
    res.send('Hello from express /')
})
app.use('/dash', (req, res)=>{
    res.send('Hello from express DASH')
})
app.use('/dashw', (req, res)=>{
    res.send('Hello from express DASHw')
})
app.listen(port, ()=>{
    console.log(`express server is running on port ${port}`)
})