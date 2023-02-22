const Router = require('express')

const ratingControllers = require('../controllers/ratingControllers')

const router = new Router()


router.post('/',ratingControllers.create)
router.get('/getAll',ratingControllers.getAll)
router.post('/getOne',ratingControllers.getOne)



module.exports = router