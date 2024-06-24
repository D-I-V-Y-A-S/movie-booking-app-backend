const movieModel = require('../models/movieModel')
const userModel=require('../models/userModel')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'vhvgxdayghujikhjhgfh'

const getMoviesOnSearchAdmin=async(request,response)=>{
    try {
        //checking authentication of token
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const loggedInUser = jwt.verify(token, JWT_TOKEN)
        const loggedInUserEmail = loggedInUser.email
        console.log(loggedInUserEmail)
        const authenticatedUser = await userModel.find({ email: loggedInUserEmail })
        //filter movies
        if (authenticatedUser) {
            const data = request.params.searchData
            // console.log(data)
            // const filteredMovies = await movieModel.find({ movieName: data })
            const filteredMovies = await movieModel.find({ movieName: { $regex: new RegExp(data, "i") } });
            //console.log(filteredMovies)
            return response.status(200).json(filteredMovies)
        }
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    } 
}

module.exports={getMoviesOnSearchAdmin}

