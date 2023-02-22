const {Composition } = require("../models/models")


class compositionServices{
  async createComposition(text,id){
    try {
        const response =await Composition.create({text,productId:id})
        return response
    } catch (e) {
        console.log(e);
    }
  }

  async getAll(){
    try {
        const response =await Composition.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(idDescription){
    try {
    const response =await Composition.findOne({where:{id:idDescription}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new compositionServices()