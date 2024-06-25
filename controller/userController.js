const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'vhvgxdayghujikjhgf'

const userLogin = async (request, response) => {
    try {
        const { userEmail, userPassword } = request.body
        const validUser = await userModel.findOne({ email: userEmail })

        if (!validUser) {
            return response.status(404).json({ message: "An account with this email id doesn't exists!" })
        }
        const isValidPassword = bcrypt.compareSync(userPassword, validUser.password)
        // console.log(validUser);
        if (!isValidPassword) {
            response.status(401).json({ message: "Invalid Password!" })
        }
        const AUTH_TOKEN =jwt.sign({ email: validUser.email }, JWT_TOKEN);
        // console.log(validUser);
        return response.status(201).json({ token: AUTH_TOKEN, firstName: validUser.firstName, lastName: validUser.lastName })
    }
    catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const userSignUp = async (request, response) => {
    try {
        const userData = request.body.data;
        // console.log(userData)
        const availableData = await userModel.find({ email: userData.email })
        // console.log(availableData)
        if (availableData.length == 0) {
            const encryptPassword = await bcrypt.hash(userData.password, 8)
            const data = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: encryptPassword
            }
            await userModel.create(data)
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

// const jwt = require('jsonwebtoken')

// const maxAge = 3 * 24 * 60 * 60

// const createToken = (email,password) => {
//     return jwt.sign({ email,password}, JWT_TOKEN, {
//         expiresIn: maxAge
//     })
// }


// const userSignUp = async (req, res) => {
//     const newUser = req.body.data
//     try {
//         const existingUser = await userModel.findOne({ email: newUser.email})
//         if (existingUser) {
//             res.status(401).json({ message: "user Already exists" })
//         }

//         const user = await userModel.create(newUser)
//         console.log(user)

//         const token = createToken(user.email, user.password)
//         res.cookie('jwt', token)
//         res.status(201).json({firstName: user.firstName, lastName: user.lastName})
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400).json({ message: "user not created" })
//     }
// }

// const userLogin  = async (req, res) => {
//     const { userEmail, userPassword } = req.body
//     console.log(userEmail,userPassword)
//     try {

//         const user = await userModel.find({email:userEmail})
//         console.log(user)
//         if(user){
//         const token = createToken(userEmail,userPassword)
//        return res.cookie('jwt', token)

//       return  res.status(200).json({firstName:user.firstName, lastName: user.lastName})
//         }
//     }
//     catch (err) {
//         res.status(400).json({ message: "username or password does not exist" })
//     }
// }

module.exports = { userLogin, userSignUp }

//npm install bcryptjs
//bcrypt.hash(userData.password,15)=>15-salt number
//401-unauthorized
//409-conflict
