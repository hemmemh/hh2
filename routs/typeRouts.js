const Router = require('express')
const typeControllers = require('../controllers/typeControllers')
const router = new Router()


router.post('/',typeControllers.create)
router.get('/getAll',typeControllers.getAll)
router.get('/getOne',typeControllers.getOne)


module.exports = router