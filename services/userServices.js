const UserToTokenDto = require("../Dtos/userToTokenDto")
const { User, Rating, Loves } = require("../models/models")
const tokenServices = require("./tokenServices")
const bccrypt = require("bcrypt")
const uuid = require("uuid")
const ApiError = require("../Errors/ApiError")
const lovesService = require("./lovesService")
const basketServices = require("./basketServices")
const userDataServices = require("./userDataServices")
const mailServices = require("./mailServices")
const { API_URL } = require("../utils/config")
const { validationResult } = require("express-validator")

class userServices{
  async registration(email,password,next,errors){
    try {
     
     
        const candidate = await User.findOne({where:{email}})
         if (candidate) {
           return ApiError.BadRequest("имейл уже занят")
        }
        const pass = await bccrypt.hash(password,3)
        const activationLink = Math.floor(1000 + Math.random() * 9000);
        const response =await User.create({email,password:pass,activationLink})
        await mailServices.sendActivationMail(email,activationLink)
        await lovesService.createLoves(response.id)
        await basketServices.createBasket(response.id)
        const userData = await userDataServices.createUserData(response.id)
        userDataServices.change(userData.id,'','','2014-08-18T21:11:54','','')
        const DtoUSer = new UserToTokenDto(response)
        const tokens = tokenServices.generateToken({...DtoUSer})
         await tokenServices.createTokens(DtoUSer.id,tokens.accessToken,tokens.refreshToken)
         
        return {accessToken:tokens.accessToken,
                refreshToken:tokens.refreshToken}
 
    } catch (e) {
        console.log(e);
    }
  }
  async login(email,password,errors){
    try {
      
        const response =await User.findOne({where:{email}})
        console.log(response);
        
        const pass = response !== null ? bccrypt.compareSync(password,response.password) : false
        if (!response || !pass) {
            return ApiError.BadRequest("имейл или пароль неверен")
        }

        if (response.isActivated === false) {
            return ApiError.BadRequest("почта неактивна")
        }
        const DtoUSer = new UserToTokenDto(response)
        const tokens = tokenServices.generateToken({...DtoUSer})
        await tokenServices.createTokens(DtoUSer.id,tokens.accessToken,tokens.refreshToken)
        return {accessToken:tokens.accessToken,
            refreshToken:tokens.refreshToken}
 
    } catch (e) {
        console.log(e);
    }
  }

  async logout(refreshToken){
    try {
      const token =await tokenServices.removeToken(refreshToken)
    return token
    } catch (e) {
        console.log(e);
    }
    
  }
    async getAll(){
    try {
    const response =await User.findAll()
    return response
    } catch (e) {
        console.log(e);
    }
    
  }
  
  async getOne(id){
    try {
    const response =await User.findOne({where:{id:id}})
    return response
    } catch (error) {
        console.log(error);
    }
    
  }  


  async refresh(refreshToken){
    try {
    if (!refreshToken) {
      throw ApiError.unauthorized()
    }
    const response =await tokenServices.validateRefreshToken(refreshToken)
    const tokenFromDataBase =await tokenServices.getOne(refreshToken)
    if (!response || !tokenFromDataBase) {
      throw ApiError.unauthorized()
    }
    console.log('aaaaaaaaaaaaa',response);
    const user =await User.findOne({where:{id:response.id}})
    const DtoUSer = new UserToTokenDto(user)
    const tokens = tokenServices.generateToken({...DtoUSer})
    await tokenServices.createTokens(DtoUSer.id,tokens.accessToken,tokens.refreshToken)
    return {accessToken:tokens.accessToken,
            refreshToken:tokens.refreshToken}
 
    } catch (error) {
        console.log(error);
    }
    
  } 

  async activate(activationLink){
    try {
    const user =await User.findOne({where:{activationLink}})
    if (!user){
      return ApiError.BadRequest('некоректный код')
  }
         user.isActivated = true
         await user.save()
         return user
         
    } catch (error) {
        console.log(error);
    }
    
  } 

  async forgetPassword(email){
    try {
    const user =await User.findOne({where:{email}})
    if (!user){
      return ApiError.BadRequest('некоректный email')
  }
    const activationLink = Math.floor(1000 + Math.random() * 9000);
    await mailServices.sendActivationMail(email,activationLink)
    user.code = activationLink
    await user.save()
    return  user    
    } catch (error) {
        console.log(error);
    }
    
  } 

  async forgetPassword2(code,password){
    try {
    const user =await User.findOne({where:{code}})
    if (!user){
      return ApiError.BadRequest('некоректный код')
  }
 
   if (user.code !== code) {
    return ApiError.BadRequest('некоректный код')
   }
   const pass = await bccrypt.hash(password,3)
    user.password = pass
    await user.save()
    return  user    
    } catch (error) {
        console.log(error);
    }
    
  }
}

module.exports =new userServices()