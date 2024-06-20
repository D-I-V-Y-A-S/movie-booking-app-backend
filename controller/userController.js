const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'vhvgxdayghujikjhgf'

const userLogin = async (request, response) => {
    const { userEmail, userPassword } = request.body
    const validUser = await userModel.findOne({ email: userEmail })
    console.log(validUser)
    if (!validUser) {
        return response.status(404).json({ message: "An account with this email id doesn't exists!" })
    }
    if(await bcrypt.compare(userPassword,validUser.password))
        {
            const AUTH_TOKEN = jwt.sign({email : validUser.email}, JWT_TOKEN)
            console.log(validUser.firstName)
            return response.status(201).json({token : AUTH_TOKEN, firstName : validUser.firstName, lastName : validUser.lastName})
        }
response.status(401).json({message:"Invalid Password!"})

}

const userSignUp = async (request, response) => {
    try {
        const userData = request.body.data;
        console.log(userData)
        const availableData = await userModel.find({ email: userData.email })
        // console.log(availableData)
        if (availableData.length == 0) {
            const encryptPassword = await bcrypt.hash(userData.password,8)
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

module.exports = { userLogin, userSignUp }

//npm install bcryptjs
//bcrypt.hash(userData.password,15)=>15-salt number
//401-unauthorized
//409-conflict