const mongoose = require('mongoose');

const connectDB = async ()=>{
    const url =
    "mongodb+srv://gsdhoni2000:jpR9eO0WSlDYPj6B@namastenode.ckfu4.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode";
    await mongoose.connect(url)
    console.log("Connected to database")
}

module.exports = connectDB
