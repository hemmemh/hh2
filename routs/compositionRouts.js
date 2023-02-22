const Router = require('express')
const compositionControllers = require('../controllers/compositionControllers')


const router = new Router()


router.post('/',compositionControllers.create)
router.get('/getAll',compositionControllers.getAll)
router.get('/getOne',compositionControllers.getOne)


module.exports = router