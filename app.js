const express=require('express')
const app=express()

const cors = require('cors')
const corsOptions = {
<<<<<<< HEAD
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
=======
    origin: '*', // This allows all origins, consider changing to a specific origin or list of origins in production
    methods: ['GET', 'POST'], // Specify the methods allowed by the CORS policy
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the headers allowed by the CORS policy
>>>>>>> c4aa8c27df1d02ebdcc586f6d30d975676123e4c
  };
app.use(cors(corsOptions))

require('dotenv').config()

const PORT=process.env.PORT || 3500

const mongoose=require('mongoose')
mongoose.connect(process.env.DB_URL)
const db=mongoose.connection
db.on('error',(errorMessage)=>console.log(errorMessage))
db.once('open',()=>console.log('Connected to DataBase successfully'))

app.get('/',(request,response)=>{
    response.status(200).json({message:"HI from backend!"})
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const router=require('./routes/movieRoute.js')
app.use('/api/v1/movie',router)

app.listen(PORT,console.log(`Server running at http://localhost:${PORT}/api/v1/movie`))