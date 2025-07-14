const {Type, Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
class typeController{
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)

    }
    async create(req, res, next){
        try {
            const {name} = req.body
            if (!name){return next(ApiError.badRequest('Название типа устройств обязательно'))}
            const type = await  Type.create({name})
            return res.json(type)
        }catch (e){
            next(ApiError.internal('Ошибка при создании типа устрйоства'))
        }

    }

    async update(req, res){
        const {id} = req.params
        const {name} = req.body
        const type = await Type.findByPk(id)
        type.name=name
        await type.save()
        return res.json(type)
    }
    async delete(req, res){
        const {id} = req.params
        const type = await Type.findByPk(id)
        await type.destroy()
        return res.json({message: "Тип устройств успешно удален"})
    }
}

module.exports = new typeController()