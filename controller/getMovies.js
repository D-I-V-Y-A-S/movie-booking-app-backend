const movieModel = require('../models/movieModel')
const data=require('../data/data')

const fs=require('fs')
const path=require('path')

const displayMovies = async (request, response) => {
    try {
        const movies = await movieModel.find().sort({ releaseDate: -1 })
        if (movies.length === 0) {
          await  movieModel.insertMany(data)
        }
        response.status(200).json(movies)
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getImage=async(request,response)=>{
    console.log(__dirname)
    const directory = (__dirname).split('\\controller')[0]
    const fileName = request.params.fileName
    const filePath = path.join(directory, 'images', fileName);
    console.log(filePath)
    fs.stat(filePath, (error, stat) => {
        if (stat) {
            response.status(201).sendFile(filePath)
        }
        else {
            response.status(409).send("wrong path!!")
        }
    })
}

module.exports = { displayMovies,getImage}