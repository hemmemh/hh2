const ApiError = require("../Errors/ApiError")
const ratingServices = require("../services/ratingServices")



class ratingControllers{


    async create(req,res,next){
            const {userId,productId,rate} = req.body
            const response =await ratingServices.createRating(userId,productId,rate)
            if (response instanceof ApiError) {
                return (next(response))
            }
            return res.json(response)
    }

    async getAll(req,res){
        const response =await ratingServices.getAll()
        return res.json(response)
    }

    async getOne(req,res){
    
        const {id} = req.body
        console.log('aaaaa',req.body);
        const response =await ratingServices.getOne(id)
        return res.json(response)
    }
}

module.exports = new ratingControllers()