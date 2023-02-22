const Router = require('express')
const lovesControllers = require('../controllers/lovesControllers')





const router = new Router()


router.post('/',lovesControllers.create)
router.get('/getAll',lovesControllers.getAll)
router.post('/getOne',lovesControllers.getOne)
router.post('/add',lovesControllers.addToLoves)
router.post('/remove',lovesControllers.removeFromLoves)
router.post('/removeAll',lovesControllers.removeAllFromLoves)


module.exports = router