const Router = require('express')

const userDataControllers = require('../controllers/userDataControllers')

const router = new Router()


router.post('/',userDataControllers.create)
router.get('/getAll',userDataControllers.getAll)
router.post('/getOne',userDataControllers.getOne)
router.post('/change',userDataControllers.change)


module.exports = router