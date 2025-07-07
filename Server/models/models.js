const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})
const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    quantityofgoods: {type: DataTypes.INTEGER, defaultValue: 0}
})
const BasketDevice = sequelize.define('basket_device',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})
const Device = sequelize.define('device',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name:{type: DataTypes.STRING,unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})
const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull: false},
})
const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true, allowNull: false},
})
const Rating = sequelize.define('rating',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    rate:{type: DataTypes.INTEGER, allowNull: false},
})
const Device_info = sequelize.define('device_info',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
const Order = sequelize.define('order',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    creationdate: {type: DataTypes.DATE, allowNull: false},
    enddate: {type: DataTypes.DATE},
    quantityofgoods: {type: DataTypes.INTEGER, defaultValue: 0}
})
const PaymentMethod = sequelize.define('payment_method',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    method:{type: DataTypes.STRING, allowNull: false},
})
const Status = sequelize.define('status',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    state:{type: DataTypes.STRING, allowNull: false},
})
const OrderDevice = sequelize.define('order_device',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})

const TypeBrand = sequelize.define('type_brand',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Status.hasMany(Order)
Order.belongsTo(Status)

PaymentMethod.hasMany(Order)
Order.belongsTo(PaymentMethod)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(Device_info, {as: 'info'})
Device_info.belongsTo(Device)

Device.hasOne(BasketDevice)
BasketDevice.belongsTo(Device)

Brand.belongsToMany(Type, {through:TypeBrand})
Type.belongsToMany(Brand, {through:TypeBrand})

Order.belongsToMany(Device, {through:OrderDevice})
Device.belongsToMany(Order, {through:OrderDevice})

module.exports = {
    User,
    Basket,
    BasketDevice,
    OrderDevice,
    Status,
    Order,
    Device,
    Rating,
    Type,
    Brand,
    Device_info,
    PaymentMethod,
    TypeBrand
}