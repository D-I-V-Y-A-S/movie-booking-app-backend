const express=require('express')
const router=express.Router()

const {displayMovies,getImage}=require('../controller/getMovies')
const {userLogin,userSignUp}=require('../controller/userController')

router.get('/',displayMovies)
router.get('/image/:fileName',getImage)

router.post('/userLogin',userLogin)
router.post('/userSignUp',userSignUp)
module.exports=router