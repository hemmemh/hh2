const Router = require('express')
const parameterControllers = require('../controllers/parameterControllers')




const router = new Router()


router.post('/',parameterControllers.create)
router.post('/getOne',parameterControllers.getOne)
router.post('/removeOne',parameterControllers.removeOne)
router.post('/changeParameter',parameterControllers.changeParameter)



module.exports = router