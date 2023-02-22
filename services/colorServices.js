const {Color } = require("../models/models")


class colorServices{
  async createColor(name,hex){
    try {
        const response =await Color.create({name,hex})
        return response
    } catch (e) {
        console.log(e);
    }
  }

  async getAll(){
    try {
        const response =await Color.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(idDescription){
    try {
    const response =await Color.findOne({where:{id:idDescription}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new colorServices()