const { request } = require('express')
const ticketModel = require('../models/ticketBooking')
const userModel = require('../models/userModel')

const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'vhvgxdayghujikjhgf'

const movieBooking = async (request, response) => {
    try {

        const requestData=request.body.data

        //authentication Verification
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const loggedInUser = jwt.verify(token, JWT_TOKEN)
        const loggedInUserEmail = loggedInUser.email
        console.log(loggedInUserEmail)

        //cheking emails
            const authenticatedUser = await userModel.find({ email: loggedInUserEmail })
            if (authenticatedUser.length === 1) {
                const data={
                    firstName: requestData[0].firstName,
                    lastName: requestData[0].lastName,
                    location: requestData[0].location,
                    slot: requestData[0].slot,
                    date: requestData[0].date,
                    seatName: requestData[0].seatName,
                    seatType: requestData[0].seatType,
                    movieName: requestData[0].movieName,
                    email:loggedInUserEmail}
                console.log(data)
                await ticketModel.create(data)
                response.status(201).json({ message: `Ticket Booked Successfully!` })
            }
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getBookings = async (request, response) => {
    try {
        // console.log("yes")
        //authentication verification
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const loggedInUser = jwt.verify(token, JWT_TOKEN)
        const loggedInUserEmail = loggedInUser.email
        console.log(loggedInUserEmail)
        const authenticatedUser = await userModel.find({ email: loggedInUserEmail })

        //retrieve bookings
        if (authenticatedUser) {
            const bookings = await ticketModel.find({ email: loggedInUserEmail })
            console.log(bookings)
            return response.status(200).json(bookings)
        }
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getBookedseats = async (request, response) => {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const loggedInUser = jwt.verify(token, JWT_TOKEN)
        const loggedInUserEmail = loggedInUser.email
        console.log(loggedInUserEmail)
        const authenticatedUser = await userModel.find({ email: loggedInUserEmail })
        if (authenticatedUser) {
            const seatsBooked = await ticketModel.find({}, { seatName: 1 });
            console.log(seatsBooked)
            if (seatsBooked) {
                return response.status(200).json(seatsBooked);
            }
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

module.exports = { movieBooking, getBookings, getBookedseats }

