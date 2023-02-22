const colorServices = require("../services/colorServices");





class colorControllers{


    async create(req,res){
            const {name,hex} = req.body
            const response =await colorServices.createColor(name,hex)
            return res.json(response)
    }

    async getAll(req,res){
        const response =await colorServices.getAll()
        return res.json(response)
    }

    async getOne(req,res){
        const {id} = req.body
        const response =await colorServices.getOne(id)
        return res.json(response)
    }
}

module.exports = new colorControllers()