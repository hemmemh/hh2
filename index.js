const express = require('express')
const db = require('./db')
const ApiErrorMiddleware = require('./middleWares/ApiErrorMiddleware')
const router = require('./routs/index')
const fileUpload = require('express-fileupload')
const app = express()
require('./utils/config')
const config = require('./utils/config')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || config.PORT 

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {credentials:true,
    origin:'*'}
))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api',router)

app.use(ApiErrorMiddleware)
const start  =  async()=>{
    try {
        await db.authenticate()
        await db.sync()
        app.listen(PORT,()=>console.log(`подключен к порту ${PORT}`))
        console.log('yytyy');
    } catch (e) {
        console.log(e);
    }
}
start()