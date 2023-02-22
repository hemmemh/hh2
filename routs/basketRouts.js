const Router = require('express')
const basketControllers = require('../controllers/basketControllers')




const router = new Router()


router.post('/',basketControllers.create)
router.get('/getAll',basketControllers.getAll)
router.post('/getOne',basketControllers.getOne)
router.post('/add',basketControllers.addToBasket)
router.post('/remove',basketControllers.removeFromBasket)
router.post('/removeAll',basketControllers.removeAllFromBasket)


module.exports = router