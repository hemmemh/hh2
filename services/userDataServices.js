const { UserData } = require("../models/models")


class userDataServices{
  async createUserData(id){
    try {
        const response =await UserData.create({userId:id})
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async change(id,name,serName,mail,tel,adress){
    try {
        const response =await UserData.findOne({where:{id}})
         response.name = name
         response.serName = serName
         response.mail = mail
         response.tel = tel
         response.adress = adress
         await response.save()
         return response

    } catch (e) {
        console.log(e);
    }
  }



  async getAll(){
    try {
        const response =await UserData.findAll()
        return response
    } catch (e) {
        console.log(e);
    }
  }


  async getOne(idDescription){
    try {
    const response =await UserData.findOne({where:{id:idDescription}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

}

module.exports =new userDataServices()