const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/auth-app",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(() => console.log("out db is connected"))
.catch((err) => console.log(err));