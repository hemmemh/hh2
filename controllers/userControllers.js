
const { validationResult } = require("express-validator");
const ApiError = require("../Errors/ApiError");
const userServices = require("../services/userServices");


class userControllers{


    async registration(req,res,next){
         
            const {email,password} = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
               return next(ApiError.BadRequest("ошибка при валидации",errors.array()))
            }
            const response =await userServices.registration(email,password,errors)
            if (response instanceof ApiError) {
                return next(response)
            }
            console.log(response);
            res.cookie('refreshToken',response.refreshToken,{maxAge:30 * 24 * 60 * 60 * 1000,httpOnly:true})
            return res.json(response)
    }


    async login(req,res,next){
        const {email,password} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            next(ApiError.BadRequest("ошибка при валидации",errors.array()))
        }
        const response =await userServices.login(email,password,errors)
        if (response instanceof ApiError) {
            return next(response)
        }
        
        res.cookie('refreshToken',response.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
        return res.json(response)
}
    async getAll(req,res){
      
        const response =await userServices.getAll()
        return res.json(response)
       
        
}
    
    async getOne(req,res){
       
        const {id} = req.body
        const response =await userServices.getOne(id)
        return res.json(response)
        
        
    }

    async logout(req,res){
        console.log('aaa');
        console.log(req.cookies);
        const {refreshToken} = req.cookies
   
        const response =await userServices.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(response)
        
        
    }

    async activate(req,res,next){
        const {activationLink} = req.body
    const response =await userServices.activate(activationLink)
    if (response instanceof ApiError) {
        return next(response)
    }
   
    return res.json(response)
    
}

async forgetPassword(req,res,next){
    const {email} = req.body
const response =await userServices.forgetPassword(email)
if (response instanceof ApiError) {
    return next(response)
}
return res.json(response)

}

async forgetPassword2(req,res,next){
    const {code,password} = req.body
const response =await userServices.forgetPassword2(code,password)
if (response instanceof ApiError) {
    return next(response)
}
return res.json(response)

}


async refresh(req,res,next){
    console.log(req.cookies);
    const {refreshToken} = req.cookies
   
    const response =await userServices.refresh(refreshToken)
    res.cookie('refreshToken',response.refreshToken,{maxAge:30 * 24 * 60 * 60 * 1000,httpOnly:true})
    return res.json(response)


}
}

module.exports = new userControllers()