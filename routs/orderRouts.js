const Router = require('express')
const orderControllers = require('../controllers/orderControllers')

const router = new Router()


router.post('/',orderControllers.create)
router.get('/getAll',orderControllers.getAll)
router.post('/getOne',orderControllers.getOne)
router.post('/changeStatus',orderControllers.changeStatus)


module.exports = router