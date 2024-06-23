const express=require('express')
const router=express.Router()
const multer=require('multer')

const {displayMovies,getImage}=require('../controller/getMovies')
const {userLogin,userSignUp}=require('../controller/userController')
const {getMoviesOnSearch}=require('../controller/filterMovies')
const {movieBooking,getBookings,getBookedseats}=require('../controller/bookingController')
const {adminLogin,adminSignup,displayMoviesAdmin,tokenVerification}=require('../controller/adminController')
const {addMovie}=require('../controller/addMovieController')
const upload=require('../middleware/multer')

router.get('/admin',displayMoviesAdmin)
router.get('/',displayMovies)
router.get('/image/:fileName',getImage)

router.post('/userLogin',userLogin)
router.post('/userSignUp',userSignUp)

router.post('/adminLogin',adminLogin)
router.post('/adminSignup',adminSignup)
router.get('//checkToken',tokenVerification)

router.route('/addMovie').post(upload.single('movieImage'),addMovie)

router.get('/:searchData',getMoviesOnSearch)

router.post('/booktickets',movieBooking)
router.get('/viewBookings/tickets',getBookings)
router.get('/user/ticket/seatsBooked/:location',getBookedseats)

module.exports=router