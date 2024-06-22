const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    movieName: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true,
        enum:['8:00am - 11:00am','12:00pm - 3:00pm','4:00pm - 7:00pm','8:00pm - 11:00pm']
    },
    location:{
        type: String,
        required: true,
        enum:['XYZ Mall, Velacherry','ABC Plaza, Anna Nagar','PQR Center, T. Nagar','LMN Square, Mylapore']
    },
    seatName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true
    },
    seatType: {
        type: String,
        required: true
    }
},{collection:'tickets'})

module.exports=mongoose.model('tickets',bookingSchema)
