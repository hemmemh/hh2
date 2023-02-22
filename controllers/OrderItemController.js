const ApiError = require("../Errors/ApiError")
const basketServices = require("../services/basketServices")
const OrderItemServices = require("../services/OrderItemServices")
const orderServices = require("../services/orderServices")






class OrderItemControllers{


    async create(req,res){
            const {name,image,color,price,count,size,orderId,productId} = req.body
            const response =await OrderItemServices.createOrderItem(name,image,color,price,count,size,orderId,productId)
            return res.json(response)
    }

 



}

module.exports = new OrderItemControllers()