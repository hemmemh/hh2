const { Order, Product, Color, Description, Composition, RefDevice, Type, Rating } = require("../models/models")
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')
const { Op } = require("sequelize")
const descriptionServices = require("./descriptionServices")
const compositionServices = require("./compositionServices")
const { log } = require("console")
const ratingServices = require("./ratingServices")
const basketServices = require("./basketServices")
const e = require("express")
const colorServices = require("./colorServices")
class ProductServices{
  async createProduct(name,price,size,typeId,description,color,composition,images){
    try {
   console.log(images);
      const data = Date.now()
  
      let imagesPath=[]
      
        images.forEach(e=>{
          const image = uuid.v4() + '.jpg'
          imagesPath.push(image)
          const filePath = path.resolve(__dirname,'..','static',`${name}`)
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath,{recursive:true})
          } 
          e.mv(path.resolve(filePath,image)) 
        })

        const response =await Product.create({name,price,size,ratingValue:1,typeId,createData:data,images:JSON.stringify(imagesPath)})
      
       JSON.parse(color).forEach(async (el) => {
       const condidate = await Color.findOne({where:{[Op.or]:[{hex:el.hex},{name:el.name}]}})
       if (!condidate) {
        const cond = await colorServices.createColor(el.name,el.hex)
        await response.addColor(cond) 
       }else{
        console.log('ffff', condidate);
        await response.addColor(condidate) 
       }
    
    

       })
       descriptionServices.createDescription(description,response.id)
       compositionServices.createComposition(composition,response.id)
     
        return response
    } catch (e) {
        console.log(e);
    }
  }

  async getAll(query){
    try {
    let {typeId,page,limit,search,size,color,minPrice,maxPrice,sort} = query
    page = page || 1
    limit = limit || 6
    search = search || ''
    size = size || ['S','M','L','XL','XXL','3XL']
    color =color || []
    sort = sort || 'createdAt'
    switch (sort) {
      case 'дате':sort = 'createdAt'
      break;
      case 'рейтингу':sort = 'ratingValue'
      break;
      case 'цене':sort = 'price'
      break;
      default:sort = 'createdAt'
      break;
    }
    console.log('dadaddwad',sort);
    const sizeRegEx =(a)=>{
        let str = ''
        size.forEach((el,i) => {
         
            str = str + `(^|,)(${el})|`
        
        });
          
        str = str.slice(0,-1)
        return str
    }
    const size2 =  sizeRegEx(size)
    const xl =  new RegExp(size2,'g')
    minPrice =Number(minPrice)  || 0 
    maxPrice =Number(maxPrice)  || 1000000000

    let offset = limit * page - limit
    let response
    if (typeId) {
        response =await Product.findAndCountAll({where:{typeId,name:{[Op.like]:'%'+ search + '%'},price:{[Op.between]:[minPrice,maxPrice]},size:{[Op.regexp]:size2}},limit,offset,include:[{model:Color, as:'colors'},{model:Rating, as:'rating'}],order:[[sort,'DESC']]})
    }
    
    if (!typeId) {
        response =await Product.findAndCountAll({where:{name:{[Op.like]:'%'+ search + '%'},price:{[Op.between]:[minPrice,maxPrice]},size:{[Op.regexp]:size2}},limit,offset,include:[{model:Color, as:'colors'},{model:Rating, as:'rating'}],order:[[sort,'DESC']]})
    }
   
    let responseFilter = response.rows
  
    if (color.length !== 0) {
      responseFilter = response.rows.filter(e=>{
        let bool = false
        for (let i = 0; i < e.colors.length; i++) {
          const el = e.colors[i];
          console.log(el.hex);
          if (color.includes(el.hex)){
            bool = true
            break
          }
        }
        return bool
      })
    }
   
 
    return {
      count:responseFilter.length,
      rows:responseFilter
    }
    } catch (error) {
        console.log(error);
    }
    
}


  async getOne(id){
    try {
    const response =await Product.findOne({where:{id:id}})
    return response
    } catch (error) {
        console.log(error);
    }
    
}

async getOneExtended(id){
  try {
  const response =await Product.findOne({where:{id},include:[{model:Description, as:'description'},{model:Composition, as:'composition'},{model:Type, as:'type'},{model:Rating, as:'rating'},{model:Color, as:'colors'}]})
  return response
  } catch (error) {
      console.log(error);
  }
  
}

}

module.exports =new ProductServices()