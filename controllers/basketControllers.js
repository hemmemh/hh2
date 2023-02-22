const ApiError = require("../Errors/ApiError")
const basketServices = require("../services/basketServices")






class basketControllers{


    async create(req,res){
            const {id} = req.body
            const response =await basketServices.createBasket(id)
            return res.json(response)
    }

    async addToBasket(req,res,next){
        const {userId,productId} = req.body
        const response =await basketServices.addToBasket(userId,productId)
        if (response instanceof ApiError) {
            return next(response)
        }
        return res.json(response)
}


async removeFromBasket(req,res,next){
    const {basketId,productId} = req.body
    const response =await basketServices.removeFromBasket(basketId,productId)
   
    return res.json(response)
}


async removeAllFromBasket(req,res,next){
    const {basketId} = req.body
    const response =await basketServices.removeAllFromBasket(basketId)
    if (response instanceof ApiError) {
        return next(response)
    }
    return res.json(response)
}



    async getAll(req,res){
        const response =await basketServices.getAll()
        return res.json(response)
    }

    async getOne(req,res){
        const {id} = req.body
        const response =await basketServices.getOne(id)
        return res.json(response)
    }
}

module.exports = new basketControllers()