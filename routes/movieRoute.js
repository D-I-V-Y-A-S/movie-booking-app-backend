const express=require('express')
const router=express.Router()

const {displayMovies,getImage}=require('../controller/getMovies')
const {userLogin,userSignUp}=require('../controller/userController')
const {getMoviesOnSearch}=require('../controller/filterMovies')
const {movieBooking,getBookings,getBookedseats}=require('../controller/bookingController')

router.get('/',displayMovies)
router.get('/image/:fileName',getImage)

router.post('/userLogin',userLogin)
router.post('/userSignUp',userSignUp)

router.get('/:searchData',getMoviesOnSearch)

router.post('/booktickets',movieBooking)
router.get('/viewBookings/tickets',getBookings)
router.get('/user/ticket/seatsBooked',getBookedseats)

module.exports=router