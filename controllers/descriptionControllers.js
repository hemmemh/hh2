const descriptionServices = require("../services/descriptionServices");



class descriptionControllers{


    async create(req,res){
            const {text,id} = req.body
            const response =await descriptionServices.createDescription(text,id)
            return res.json(response)
    }

    async getAll(req,res){
        const response =await descriptionServices.getAll()
        return res.json(response)
    }

    async getOne(req,res){
        const {id} = req.body
        const response =await descriptionServices.getOne(id)
        return res.json(response)
    }
}

module.exports = new descriptionControllers()