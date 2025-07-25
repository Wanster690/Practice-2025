const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN') , deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.get('/:typeId', deviceController.getBrandsByType)
router.get('/:brandId', deviceController.getTypesByBrand)
router.put('/:id', checkRole('ADMIN'), deviceController.update)
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)

module.exports = router