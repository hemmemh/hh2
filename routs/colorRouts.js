const Router = require('express')
const colorControllers = require('../controllers/colorControllers')



const router = new Router()


router.post('/',colorControllers.create)
router.get('/getAll',colorControllers.getAll)
router.get('/getOne',colorControllers.getOne)


module.exports = router