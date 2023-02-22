const Router = require('express')
const userControllers = require('../controllers/userControllers')
const {body} = require('express-validator')
const authMiddleware = require('../middleWares/authMiddleware')


const router = new Router()


router.post('/registration',body('email').isEmail(),body('password').isLength({min:3,max:9}),userControllers.registration)
router.post('/login',body('email').isEmail(),body('password').isLength({min:3,max:9}),userControllers.login)
router.get('/getAll',authMiddleware,userControllers.getAll)
router.post('/getOne',userControllers.getOne)
router.post('/logout',userControllers.logout)
router.post('/refresh',userControllers.refresh)
router.post('/activation',userControllers.activate)
router.post('/forgetPassword',userControllers.forgetPassword)
router.post('/forgetPassword2',userControllers.forgetPassword2)



module.exports = router