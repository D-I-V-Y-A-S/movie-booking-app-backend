const express=require('express')
const router=express.Router()

const {displayMovies,getImage}=require('../controller/getMovies')

router.get('/',displayMovies)
router.get('/image/:fileName',getImage)

module.exports=router