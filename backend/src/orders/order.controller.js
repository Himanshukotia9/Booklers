//order.controller.js
const Order = require('./order.model')

const createAOrder = async(req, res) =>{
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).send(savedOrder)
    } catch (error) {
        res.status(500).send({message: 'Failed to create order'})
    }
}

module.exports = {
    createAOrder,
}