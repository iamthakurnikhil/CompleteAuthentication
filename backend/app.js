const express = require('express');
require('./db')
require("dotenv").config();

const userRouter = require("./routes/user")

const app = express();

const PORT = process.env.PORT || 8080;

// app.post('/api/user/create', (req, res,next) => {
//     req.on('data',(chunk) => {
//         // console.log(chunk) string or buffer data... 
//         // console.log(JSON.parse(chunk))    it changes to object
//         req.body = JSON.parse(chunk)
//         next()
//     })

// }) this lines to change to down below

app.use(express.json());
app.use('/api/user' , userRouter)

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`);
})