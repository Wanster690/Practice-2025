const Router = require('express')
const router = new Router()
const basketRouter = require('./basketRouter')
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const orderRouter = require('./orderRouter')
const statusRouter = require('./statusRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/order', orderRouter)
router.use('/status', statusRouter)
router.use('/type', typeRouter)

module.exports = router