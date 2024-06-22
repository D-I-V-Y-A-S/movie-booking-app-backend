const movieModel = require('../models/movieModel')

const getMoviesOnSearch = async (request, response) => {
    try{
    const data = request.params.searchData
    // console.log(data)
    // const filteredMovies = await movieModel.find({ movieName: data })
    const filteredMovies = await movieModel.find({ movieName: { $regex: new RegExp(data, "i") } });
    //console.log(filteredMovies)
    response.status(200).json(filteredMovies)
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

module.exports = {getMoviesOnSearch}