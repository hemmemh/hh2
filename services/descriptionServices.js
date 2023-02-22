const { Description } = require("../models/models")


class descriptionServices{
  async createDescription(text,id){
    try {
        const response =await Description.create({text,productId:id})
        return response
    } catch (e) {
        console.log(e);
    }
  }

  async getAll(){
    try {
        const response =await Description.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(idDescription){
    try {
    const response =await Description.findOne({where:{id:idDescription}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new descriptionServices()