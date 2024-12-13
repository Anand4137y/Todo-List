const express = require('express')
const cors = require('cors') 
require('./dbconnection/dbConnet')
require('dotenv').config()
const todoRoutes = require('./routes/todoRoutes')


const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/api',todoRoutes)

app.listen(PORT,()=>console.log(`server connected on port = ${PORT}`))