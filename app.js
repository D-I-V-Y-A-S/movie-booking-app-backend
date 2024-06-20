const express=require('express')
const app=express()

const cors = require('cors')
app.use(cors())

require('dotenv').config()

const PORT=process.env.PORT || 3500

const mongoose=require('mongoose')
mongoose.connect(process.env.DB_URL)
const db=mongoose.connection
db.on('error',(errorMessage)=>console.log(errorMessage))
db.once('open',()=>console.log('Connected to DataBase successfully'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const router=require('./routes/movieRoute.js')
app.use('/api/v1/movie',router)

app.listen(PORT,console.log(`Server running at http://localhost:${PORT}/api/v1/movie`))