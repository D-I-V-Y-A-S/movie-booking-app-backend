const movieModel = require('../models/movieModel')
const data = require('../data/data')
const userModel=require('../models/userModel')
const adminModel=require('../models/adminModel')

const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'vhvgxdayghujikjhgf' 

const displayMovies = async (request, response) => {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const loggedInUser = jwt.verify(token, JWT_TOKEN)
        const loggedInUserEmail = loggedInUser.email
        const authenticatedUser = await userModel.find({ email: loggedInUserEmail })
        if (authenticatedUser) {
            const movies = await movieModel.find().sort({ releaseDate: -1 })
            if (movies.length === 0) {
                await movieModel.insertMany(data)
            }
            response.status(200).json(movies)
        }
    }
    
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getImage = async (request, response) => {
    // console.log(__dirname)
    const directory = (__dirname).split('\\controller')[0]
    const fileName = request.params.fileName
    const filePath = path.join(directory, 'images', fileName);
    //  console.log(filePath)
    fs.stat(filePath, (error, stat) => {
        if (stat) {
            // console.log(filePath)
            response.status(201).sendFile(filePath)
        }
        else {
            response.status(409).send("wrong path!!")
        }
    })
}

module.exports = { displayMovies, getImage}