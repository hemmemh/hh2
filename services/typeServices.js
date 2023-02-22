const { Type } = require("../models/models")
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
class typeServices{
  async createType(name,images){
    try {
      const image = uuid.v4() + '.jpg'
      console.log(images);
   
      const filePath = path.resolve(__dirname,'..','static',`types`)
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath,{recursive:true})
      } 
      images.mv(path.resolve(filePath,image)) 
    
      
        const response =await Type.create({name,image:image})
        return response
    } catch (e) {
        console.log(e);
    }
  }

  async getAll(){
    try {
        const response =await Type.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(idType){
    try {
    const response =await Type.findOne({where:{id:idType}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new typeServices()