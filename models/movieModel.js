const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
    {
        movieId: {
            type: Number,
            required: true
        },
        movieName: {
            type: String,
            required: true
        },
        movieGenre1: {
            type: String,
            required: true,
            enum: ['Action', 'Comedy', 'Drama', 'SciFi', 'Horror', 'Thriller', 'Romance', 'Fantasy', 'Animation', 'Adventure', 'Crime', 'Biography']
        },
        movieGenre2: {
            type: String,
            required: true,
            enum: ['Action', 'War', 'Comedy', 'Drama', 'SciFi', 'Horror', 'Thriller', 'Romance', 'Fantasy', 'Animation', 'Adventure', 'Crime', 'Biography']
        },
        releaseDate: {
            type:Date,
            required: true
        },
        imdbRating: {
            type: Number,
            required: true
        }, 
        movieImage: {
            type: String,
            required: true
        }, 
        votes: {
            type: String,
            required: true
        }
    }, { collection: 'movieBooking' }
)

module.exports = mongoose.model('movieBooking', movieSchema)