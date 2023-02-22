const ApiError = require("../Errors/ApiError");
const {Color, Basket, Product, BasketProduct } = require("../models/models");
const productServices = require("./productServices");


class basketServices{
  async createBasket(id){
    try {
        const response =await Basket.create({userId:id})
        return response
    } catch (e) {
        console.log(e);
    }
  }

  async addToBasket(userId,productId){
    console.log(userId);
    try {
        const basket =await Basket.findOne({where:{userId:userId},include:Product})
        const product = await Product.findOne({where:{id:productId}}) 
        if (basket.products.some(e=>e.id == productId)) {
            return(ApiError.forbidden('данный товар уже есть в корзине'))
        }
        await basket.addProduct(product,{ through: {BasketProduct}})
        return basket
    } catch (e) {
        console.log(e);
    }
  }
  

  async removeFromBasket(basketId,productId){
    try {
        const basket =await Basket.findOne({where:{id:basketId}})
        const product =await Product.findOne({where:{id:productId}})
        await basket.removeProduct(product,{ through: {BasketProduct}})
        return basket
    } catch (e) {
        console.log(e);
    }
  }

  async removeAllFromBasket(basketId){
    try {
        const basketProduct =await BasketProduct.findAll()
        if (basketProduct.length === 0) {
            return(ApiError.forbidden('нет товаров в корзине'))
        }
        await BasketProduct.destroy({where:{basketId}})
        const basket =await Basket.findOne({where:{id:basketId},include:Product})
        return basket
    } catch (e) {
        console.log(e);
    }
  }




  async getAll(){
    try {
        const response =await Basket.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(id){
    try {
    const response =await Basket.findOne({where:{id:id},include:[{model:Product,include:Color}]})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new basketServices()