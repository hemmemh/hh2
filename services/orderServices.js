const { Order, Product,OrderProduct, OrderItem } = require("../models/models")


class orderServices{
  async createOrder(number,price,status,userId,name,deliver,mail,tel,paymethod){
    try {
        const order =await Order.create({number,price,status,userId,name,deliver,mail,tel,paymethod})
  
        

        return order
    } catch (e) {
        console.log(e);
    }
  }
  async changeStatus(id,status){
    try {
        const response =await Order.findOne({where:{id}})
        response.status = status
        await response.save()
        return response
    } catch (e) {
        console.log(e);
    }
  }
  async getAll(){
    try {
        const response =await Order.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(idDescription){
    try {
    const response =await Order.findAll({where:{userId:idDescription},include:OrderItem})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new orderServices()