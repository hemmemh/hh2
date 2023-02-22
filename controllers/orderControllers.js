
const orderServices = require("../services/orderServices");





class orderControllers{



    async create(req,res){
            const {number,price,status,userId,name,deliver,mail,tel,paymethod} = req.body
            const response =await orderServices.createOrder(number,price,status,userId,name,deliver,mail,tel,paymethod)
            return res.json(response)
    }

    async changeStatus(req,res){
        const {id,status} = req.body
        const response =await orderServices.changeStatus(id,status)
        return res.json(response)
}

    async getAll(req,res){
        const response =await orderServices.getAll()
        return res.json(response)
    }

    async getOne(req,res){
        const {id} = req.body
        const response =await orderServices.getOne(id)
        return res.json(response)
    }
}

module.exports = new orderControllers()