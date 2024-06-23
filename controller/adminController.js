const adminModel = require('../models/adminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'vhvgxdayghujikhjhgfh'
const movieModel=require('../models/movieModel')

const adminLogin=async(request,response)=>{
    try {
        const { adminEmail, adminPassword } = request.body
        const validadmin = await adminModel.findOne({ email: adminEmail })
        if (!validadmin) {
            return response.status(404).json({ message: "An account with this email id doesn't exists!" })
        }
        const isValidPassword = bcrypt.compareSync(adminPassword, validadmin.password)
        console.log(validadmin);
        if (!isValidPassword) {
            response.status(401).json({ message: "Invalid Password!" })
        }
        const AUTH_TOKEN = jwt.sign({ email: validadmin.email }, JWT_TOKEN);
        // console.log(validadmin);
        return response.status(201).json({ token: AUTH_TOKEN, firstName: validadmin.firstName, lastName: validadmin.lastName })
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const adminSignup=async(request,response)=>{
    try {
        console.log("hi")
        const adminData = request.body.data;
        console.log(adminData)
        const availableData = await adminModel.find({ email: adminData.email })
        console.log(availableData.length)
        if (availableData.length == 0) {
            const encryptPassword = await bcrypt.hash(adminData.password, 8)
            const data = {
                firstName: adminData.firstName,
                lastName: adminData.lastName,
                email: adminData.email,
                password: encryptPassword
            }
            await adminModel.create(data)
            return response.status(201).json({ firstName: data.firstName, lastName: data.lastName })
        }
        else {
            return response.status(409).json({ message: `An account already exists with this email id!` })
        }
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}


const displayMoviesAdmin= async (request, response) => {
    try {
        // console.log("HEY")
        const authHeader = request.headers['authorization'];
        // console.log(authHeader)
        const tokenAdmin = authHeader && authHeader.split(' ')[1];
        // console.log(tokenAdmin)
        const loggedInAdmin = jwt.verify(tokenAdmin,JWT_TOKEN)
        // console.log(loggedInAdmin)
        const loggedInAdminEmail = loggedInAdmin.email
        // console.log(loggedInAdminEmail)
        const authenticatedUser = await adminModel.find({ email: loggedInAdminEmail })
        if (authenticatedUser) {
            const movies = await movieModel.find().sort({ movieId: 1 })
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

const tokenVerification=async(request,response)=>{
   try{
     const authHeader = request.headers['authorization'];
     // console.log(authHeader)
     const tokenAdmin = authHeader && authHeader.split(' ')[1];
     // console.log(tokenAdmin)
     const loggedInAdmin = jwt.verify(tokenAdmin,JWT_TOKEN)
     // console.log(loggedInAdmin)
     const loggedInAdminEmail = loggedInAdmin.email
     // console.log(loggedInAdminEmail)
     const authenticatedUser = await adminModel.find({ email: loggedInAdminEmail })
     if (authenticatedUser) {
        return response.status(200).json({message:"Token valid!"})
     }
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }

}
module.exports={adminLogin,adminSignup,displayMoviesAdmin,tokenVerification}