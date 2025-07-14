const uuid = require('uuid')
const path = require('path')
const {Device, Device_info, Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError')
class deviceController{
    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let where = {}
        if (brandId) where.brandId = brandId
        if (typeId) where.typeId = typeId
        const devices = await Device.findAndCountAll({
            where,
            include:[{ model: Brand}, {model: Type}],
            limit,
            offset
        })

        return res.json(devices)
    }
    async create(req, res, next){
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img:fileName})

            if (info){
                info = JSON.parse(info)
                info.forEach(i=>
                    Device_info.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        }catch(e) {
            next(ApiError.badRequest(e.message))
        }



    }
    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: Device_info, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async update(req, res, next){
        try {
            const {id} = req.params
            const {name, price, brandId, typeId, info} = req.body
            const device = await Device.findByPk(id)
            if (req.files?.img){
                const {img} = req.files
                const fileName = uuid.v4() + '.jpg'
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                device.img = fileName
            }
            device.name = name ?? device.name
            device.price = price ?? device.price
            device.brandId = brandId ?? device.brandId
            device.typeId = typeId ?? device.typeId

            await device.save()

            if (info){
                await Device_info.destroy({where: {deviceId: id}})
                JSON.parse(info).forEach(i => Device_info.create({
                    title: i.title,
                    description: i.description,
                    deviceId: id
                }))
            }
            return res.json(device)
        }catch (e){next(ApiError.badRequest(e.message))}
    }
    async delete(req, res, next){
        try {
            const {id} = req.params
            const deleted = await Device.destroy({where: {id}})
            return res.json({message: 'Девайс удален'})
        }catch (e){ next(ApiError.badRequest(e.message))}

    }
}

module.exports = new deviceController()