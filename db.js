const {Sequelize} = require('sequelize')
const config = require('./utils/config')
 const db = new Sequelize(
    
     DB_NAME = config.DB_NAME,
     DB_USER= config.DB_USER,
     DB_PASSWORD =  config.DB_PASSWORD,
       {
        dialect: 'postgres',
        DB_HOST : config.DB_HOST,
        DB_PORT : config.DB_PORT,
       }
)
module.exports = db