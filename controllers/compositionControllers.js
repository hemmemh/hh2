const compositionServices = require("../services/compositionServices");




class compositionControllers{


    async create(req,res){
            const {text,id} = req.body
            const response =await compositionServices.createComposition(text,id)
            return res.json(response)
    }

    async getAll(req,res){
        const response =await compositionServices.getAll()
        return res.json(response)
    }

    async getOne(req,res){
        const {id} = req.body
        const response =await compositionServices.getOne(id)
        return res.json(response)
    }
}

module.exports = new compositionControllers()