const Router = require('express')
const descriptionControllers = require('../controllers/descriptionControllers')

const router = new Router()


router.post('/',descriptionControllers.create)
router.get('/getAll',descriptionControllers.getAll)
router.get('/getOne',descriptionControllers.getOne)


module.exports = router