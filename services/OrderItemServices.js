const ApiError = require("../Errors/ApiError");
const {Color, Basket, Product, BasketProduct, OrderItem } = require("../models/models");
const productServices = require("./productServices");


class orderItemServices{
  async createOrderItem(name,image,color,price,count,size,orderId,productId){
    try {
        const response =await OrderItem.create({name,image,color,price,count,size,orderId,productId})
        return response
    } catch (e) {
        console.log(e);
    }
  }




}

module.exports =new orderItemServices()