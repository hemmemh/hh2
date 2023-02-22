const ApiError = require("../Errors/ApiError");
const {Rating, Description, Composition, Type, Color, Product } = require("../models/models");
const productServices = require("./productServices");


class ratingServices{
  async createRating(userId,productId,rate){
    try {
        console.log(typeof rate,rate,'gggggg');
        const productIdNum = Number(productId)
        const product =await Product.findOne({where:{id:productIdNum},include:[{model:Description, as:'description'},{model:Composition, as:'composition'},{model:Type, as:'type'},{model:Rating, as:'rating'},{model:Color, as:'colors'}]})
        let rateLength = 1
        let rateValue = 0
            if (product.rating.some(e=>e.userId == userId)) {
                console.log('zzzzzzzzzzzzzzzzz');
                return ApiError.forbidden('данный пользователь уже ставил рейтинг на данный товар')
            }
            if (product.rating.length !== 0) {
                rateLength =  product.rating.length + 1
                rateValue = product.ratingValue
            }
            product.ratingValue = (rateValue + Number(rate)) / rateLength
            await product.save()
            
       
        const response =await Rating.create({userId,productId,rate})
        return response
    } catch (e) {
        console.log(e);
    }
  }

  async getAll(){
    try {
        const response =await Rating.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(id){
    try {
    const response =await Rating.findOne({where:{id}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new ratingServices()