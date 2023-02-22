
const userDataServices = require("../services/userDataServices");




class userDataControllers{


    async create(req,res){
            const {id} = req.body
            const response =await userDataServices.createUserData(id)
            return res.json(response)
    }

    async change(req,res){
        const {id,name,serName,mail,tel,adress} = req.body
        const response =await userDataServices.change(id,name,serName,mail,tel,adress)
        return res.json(response)
}

    async getAll(req,res){
        const response =await userDataServices.getAll()
        return res.json(response)
    }

    async getOne(req,res){
        const {id} = req.body
        const response =await userDataServices.getOne(id)
        return res.json(response)
    }
}

module.exports = new userDataControllers()