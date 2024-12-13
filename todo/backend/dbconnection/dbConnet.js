const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todo')
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log(error))