const  express=  require('express');
const app =express();
const port = 3000;
app.get('/', (req, res)=>{
    res.send('Hello from express')
})
app.get('/homes', (req, res)=>{
    res.send('Hello from express Home')
})
app.listen(port, ()=>{
    console.log(`express server is running on port ${port}`)
})