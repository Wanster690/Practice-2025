const {Brand} = require('../models/models')
const  ApiError = require('../error/ApiError')
class brandController{
    async getAll(req, res){
        const  brands = await Brand.findAll()
        return res.json(brands)
    }
    async create(req, res, next){
        try {
            const {name} = req.body
            if (!name){return next(ApiError.badRequest('Название бренда обязательно'))}
            const  brand = await  Brand.create({name})
            return res.json(brand)
        }catch (e){
            next(ApiError.internal('Ошибка при создании бренда'))
        }
    }
    async update(req, res){
        const {id} = req.params
        const {name} = req.body
        const brand = await Brand.findByPk(id)
        brand.name=name
        await brand.save()
        return res.json(brand)
    }
    async delete(req, res){
        const {id} = req.params
        const brand = await Brand.findByPk(id)
        await brand.destroy()
        return res.json({message: "Бренд успешно удален"})
    }
}

module.exports = new brandController()