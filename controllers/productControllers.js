const productServices = require("../services/productServices");
const  typeServices  = require("../services/typeServices");


class productControllers{


    async create(req,res){
            const {name,price,size,typeId,description,color,composition} = req.body
            const {images} = req.files
    
            const response =await productServices.createProduct(name,price,size,typeId,description,color,composition,images)
            return res.json(response)
    }

    async getAll(req,res){
        const response =await productServices.getAll(req.query)
        return res.json(response)
    }

    async getOne(req,res){  
        const {id} = req.params
        const response =await productServices.getOne(id)
        return res.json(response)
    }


    async getOneExtended(req,res){
        const {id} = req.params
        const response =await productServices.getOneExtended(id)
        return res.json(response)
    }
}

module.exports = new productControllers()