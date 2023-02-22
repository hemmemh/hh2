
const ApiError = require("../Errors/ApiError");
const lovesService = require("../services/lovesService");



class lovesControllers{


    async create(req,res){
            const{id} = req.body
            const response =await lovesService.createLoves(id)
            return res.json(response)
    }

    async addToLoves(req,res,next){
        const {lovesId,productId} = req.body
        const response =await lovesService.addToLoves(lovesId,productId)
        if (response instanceof ApiError) {
            return next(response)
        }
        return res.json(response)
    }


async removeFromLoves(req,res,next){
    const {lovesId,productId} = req.body
    const response =await lovesService.removeFromLoves(lovesId,productId)
    return res.json(response)
}


async removeAllFromLoves(req,res,next){
    const {lovesId} = req.body
    const response =await lovesService.removeAllFromLoves(lovesId)
    if (response instanceof ApiError) {
        return next(response)
    }
    return res.json(response)
}

    async getAll(req,res){
        const response =await lovesService.getAll()
        return res.json(response)
    }

    async getOne(req,res){
        const {id} = req.body
        const response =await lovesService.getOne(id)
        return res.json(response)
    }
}

module.exports = new lovesControllers()