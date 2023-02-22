const { DataTypes, Sequelize } = require('sequelize')
const db  = require('../db')

const User = db.define("user", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    email:{type:DataTypes.STRING,unique:true,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
    isActivated:{type:DataTypes.BOOLEAN,defaultValue:false},
    activationLink:{type:DataTypes.STRING},
    code:{type:DataTypes.STRING,defaultValue:''}
})

const Parameter = db.define("parameter", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    color:{type:DataTypes.STRING,allowNull:false},
    size:{type:DataTypes.STRING,allowNull:false},
    amount:{type:DataTypes.INTEGER,defaultValue:1},
 
})

const Basket = db.define("basket", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
})


const BasketProduct = db.define("basketProduct", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
   
})

const ProductColor = db.define("productColor", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
   
})


const LovesProduct = db.define("lovesProduct", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
})


const OrderItem = db.define("orderItem", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false},
    image:{type:DataTypes.STRING,allowNull:false},
    color:{type:DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull:false,defaultValue:1},
    count:{type:DataTypes.INTEGER,allowNull:false,defaultValue:1},
    size:{type:DataTypes.STRING,allowNull:false},
 
})

const Loves = db.define("loves", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
})





const UserData = db.define("userData", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false,defaultValue:''},
    serName:{type:DataTypes.STRING,allowNull:false,defaultValue:''},
    mail:{type:DataTypes.STRING,allowNull:false,defaultValue:''},
    tel:{type:DataTypes.STRING,allowNull:false,defaultValue:''},
    adress:{type:DataTypes.STRING,allowNull:false,defaultValue:''},
})


const Order = db.define("order", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    number:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
    price:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
    createData:{type:DataTypes.STRING,allowNull:false,defaultValue:0},
    status:{type:DataTypes.STRING,allowNull:false,defaultValue:'Отправлен'},
    name:{type:DataTypes.STRING,allowNull:false,defaultValue:'имя'},
    deliver:{type:DataTypes.STRING,allowNull:false,defaultValue:'способ доставки'},
    mail:{type:DataTypes.STRING,allowNull:false,defaultValue:'способ доставки'},
    tel:{type:DataTypes.STRING,allowNull:false,defaultValue:'способ доставки'},
    paymethod:{type:DataTypes.STRING,allowNull:false,defaultValue:'способ доставки'},


})



const Token = db.define("token", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    refreshToken:{type:DataTypes.STRING,allowNull:false},
    accessToken:{type:DataTypes.STRING,allowNull:false}
})


const Rating = db.define("rating", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    rate:{type:DataTypes.FLOAT,defaultValue:0},

})


const Product = db.define("product", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    images:{type:DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
    size:{type:DataTypes.STRING,allowNull:false},
    ratingValue:{type:DataTypes.FLOAT,allowNull:false,defaultValue:0},
    createData:{type:DataTypes.STRING,allowNull:false,defaultValue:0},
})


const Type = db.define("type", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    image:{type:DataTypes.STRING,allowNull:false},
})


const Description = db.define("description", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    text:{type:DataTypes.STRING,allowNull:false},
})


const Composition  = db.define("composition", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    text:{type:DataTypes.STRING,allowNull:false},
})


const Color  = db.define("color", {
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    hex:{type:DataTypes.STRING,allowNull:false,unique:true},
    name:{type:DataTypes.STRING,allowNull:false,unique:true},
})



User.hasOne(Token,{onDelete:"CASCADE"})
Token.belongsTo(User)


User.hasOne(UserData,{onDelete:"CASCADE"})
UserData.belongsTo(User)


User.hasOne(Basket,{onDelete:"CASCADE"})
Basket.belongsTo(User,{as:"basket"})


Basket.belongsToMany(Product,{through:BasketProduct,onDelete:'CASCADE'})
Product.belongsToMany(Basket,{through:BasketProduct,onDelete:'CASCADE'})

Basket.hasMany(Parameter,{onDelete:"CASCADE"})
Parameter.belongsTo(Basket)

Product.hasMany(Parameter,{onDelete:"CASCADE"})
Parameter.belongsTo(Product)

User.hasOne(Loves,{onDelete:"CASCADE"})
Loves.belongsTo(User)


Loves.belongsToMany(Product,{through:LovesProduct,onDelete:'CASCADE'})
Product.belongsToMany(Loves,{through:LovesProduct,onDelete:'CASCADE'})


Order.hasMany(OrderItem,{onDelete:"CASCADE"})
OrderItem.belongsTo(Order)

Product.hasMany(OrderItem)
OrderItem.belongsTo(Product)


User.hasMany(Order,{onDelete:"CASCADE"})
Order.belongsTo(User)





User.hasMany(Rating)
Rating.belongsTo(User)



Type.hasMany(Product)
Product.belongsTo(Type,{as:"type"})


Product.hasOne(Description,{onDelete:"CASCADE"})
Description.belongsTo(Product)


Product.hasOne(Composition,{onDelete:"CASCADE"})
Composition.belongsTo(Product)

Product.belongsToMany(Color,{through:ProductColor,onDelete:'CASCADE'})
Color.belongsToMany(Product,{through:ProductColor,onDelete:'CASCADE'})

Product.hasMany(Rating,{as:"rating"})
Rating.belongsTo(Product)



module.exports={
    User,
    UserData,
    Order,
    Rating,
    Composition,
    Product,
    Description,
    Color,
    Type,
    Token,
    Basket,
    Loves,
    OrderItem, 
    LovesProduct,
    BasketProduct,
    ProductColor,
    Parameter,
}