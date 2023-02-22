const Router = require('express')

const productControllers = require('../controllers/productControllers')

const router = new Router()


router.post('/',productControllers.create)
router.get('/getAll',productControllers.getAll)
router.get('/getOneExtended/:id',productControllers.getOneExtended)
router.get('/:id',productControllers.getOne)



module.exports = router