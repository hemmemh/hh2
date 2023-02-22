const Router = require('express')
const router = new Router()
const descriptionRouter  = require('./descriptionRouts')
const typeRouter  = require('./typeRouts')
const compositionRouter  = require('./compositionRouts')
const colorRouter  = require('./colorRouts')
const orderRouter = require('./orderRouts')
const userDataRouter = require('./userDataRouts')
const userRouter = require('./userRouts')
const productRouter = require('./productRouts')
const ratingRouter = require('./ratingRouts')
const basketRouter = require('./basketRouts')
const parameterRouter = require('./parameterRouts')
const lovesRouter = require('./lovesRouts')
const orderItemRouter = require('./orderItemRouts')


router.use('/type',typeRouter)
router.use('/description',descriptionRouter)
router.use('/composition',compositionRouter)
router.use('/color',colorRouter)
router.use('/order',orderRouter)
router.use('/userData',userDataRouter)
router.use('/user',userRouter)
router.use('/product',productRouter)
router.use('/rating',ratingRouter)
router.use('/basket',basketRouter)
router.use('/parameter',parameterRouter)
router.use('/loves',lovesRouter)
router.use('/orderItem',orderItemRouter)


module.exports = router 