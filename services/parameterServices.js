const ApiError = require("../Errors/ApiError");
const {Color, Basket, Product, BasketProduct, Parameter } = require("../models/models");



  class parameterServices{
  async createParameter(color,size,amount,basketId,productId){
    try {
        const response =await Parameter.create({color,size,amount,basketId,productId})
        return response
    } catch (e) {
        console.log(e);
    }
  }



  async getOne(basketId,productId){
    try {
    const response =await Parameter.findOne({where:{basketId,productId}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

async changeParameter(basketId,productId,key,name){
    try {
    const response =await Parameter.findOne({where:{basketId,productId}})
    response[key] = name
    await response.save()
    return response
    } catch (error) {
        console.log(error);
    }
   


}
async removeOne(basketId,productId){
    try {
    const response =await Parameter.destroy({where:{basketId,productId}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new parameterServices()