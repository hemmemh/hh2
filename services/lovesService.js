const ApiError = require("../Errors/ApiError");
const { Description, Loves, Product,LovesProduct, Color } = require("../models/models");
const productServices = require("./productServices");


class lovesServices{
  async createLoves(id){
    try {
        const response =await Loves.create({userId:id})
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async addToLoves(lovesId,productId){
    try {
        console.log('ssy',lovesId);
        const loves =await Loves.findOne({where:{id:lovesId},include:Product})
        const product = await productServices.getOne(productId)
        if (loves.products.some(e=>e.id == productId)) {
            return(ApiError.forbidden('данный товар уже есть в любимых'))
        }
        await loves.addProduct(product,{ through: {LovesProduct}})
        return loves
    } catch (e) {
        console.log(e);
    }
  }
  

  async removeFromLoves(lovesId,productId){
    try {
        const loves =await Loves.findOne({where:{id:lovesId}})
        const product = await productServices.getOne(productId)
        await loves.removeProduct(product,{ through: {LovesProduct}})
        return loves
    } catch (e) {
        console.log(e);
    }
  }

  async removeAllFromLoves(lovesId){
    try {
        const lovesProduct =await LovesProduct.findAll()
        console.log(lovesProduct);
        if (lovesProduct.length == 0) {
            return(ApiError.forbidden('нет товаров в любимых'))
        }
        await LovesProduct.destroy({where:{loveId:lovesId}})
        const loves =await Loves.findOne({where:{id:lovesId},include:Product})
        return loves
    } catch (e) {
        console.log(e);
    }
  }
  async getAll(){
    try {
        const response =await Loves.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(id){
    try {
    const response =await Loves.findOne({where:{id:id},include:[{model:Product, as:'products',include:Color}]})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new lovesServices()