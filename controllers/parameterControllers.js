const ApiError = require("../Errors/ApiError")
const parameterServices = require("../services/parameterServices")






class parameterControllers{


    async create(req,res){
            const {color,size,amount,basketId,productId} = req.body
            const response =await parameterServices.createParameter(color,size,amount,basketId,productId)
            return res.json(response)
    }

 
 

    async getOne(req,res){
        const {basketId,productId} = req.body
        const response =await parameterServices.getOne(basketId,productId)
        return res.json(response)
    }

    async removeOne(req,res){
        const {basketId,productId} = req.body
        const response =await parameterServices.removeOne(basketId,productId)
        return res.json(response)
    }
    async changeParameter(req,res){
        const {basketId,productId,key,name} = req.body
        const response =await parameterServices.changeParameter(basketId,productId,key,name)
        return res.json(response)
    }
}

module.exports = new parameterControllers()