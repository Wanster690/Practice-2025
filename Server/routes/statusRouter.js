const Router = require('express')
const router = new Router()
const statusController = require('../controllers/statusController')

router.post('/', statusController.create )
router.get('/', statusController.getAll)


module.exports = router