const {Token } = require("../models/models")
const jwt = require('jsonwebtoken')
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../utils/config")

class tokenServices{
    generateToken(payload){
        const accessToken = jwt.sign(payload,JWT_ACCESS_SECRET,{expiresIn:"30s"})
        const refreshToken = jwt.sign(payload,JWT_REFRESH_SECRET,{expiresIn:"30d"})
        return {
            accessToken,
            refreshToken
        }
   
    
}

async  validateRefreshToken(token){
    try {
        const userData =await jwt.verify(token,JWT_REFRESH_SECRET);
        return userData;
    } catch (e) {
        return null;
    }  
}

async  validateAccessToken(token){
    try {
        const userData =await jwt.verify(token,JWT_ACCESS_SECRET);
        return userData;
    } catch (e) {
        return null;
    }  
}

async createTokens(userId,accessToken,refreshToken){
    try {
        const token = await Token.findOne({where:{userId}})
        if (token) {
            token.refreshToken = refreshToken
            const response = await token.save()
            return response
        }
        const newToken = await Token.create({userId,refreshToken,accessToken})
        return newToken
    } catch (error) {
        console.log(error);
    }
    
}


async removeToken(refreshToken){
    try {
        const token = await Token.findOne({where:{refreshToken}})
        await token.destroy()
        return token
    } catch (error) {
        console.log(error);
    }
    
}

async getAll(req,res){
    try {
    const response =await Type.findAll()
    return res.json(response)
    } catch (error) {
        console.log(error);
    }
    
}


async getOne(refreshToken){
    try {
    const response =await Token.findOne({where:{refreshToken}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new tokenServices()