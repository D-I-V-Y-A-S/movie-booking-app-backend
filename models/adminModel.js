const mongoose = require('mongoose')

const adminLoginSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            pattern:"[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}"
        },
        password: {
            type: String,
            required: true,
            pattern:"(?=.*[a-z])(?=.*[A-Z]).{4,}"
        }
    }, { collection: 'admins' }
)

module.exports = mongoose.model('admins', adminLoginSchema)