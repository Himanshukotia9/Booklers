//order.controller.js
const Order = require('./order.model')

// create a order
const createAOrder = async(req, res) =>{
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json({message: 'Failed to create order'})
    }
}

//get all user specefic orders
const getUserSpeceficOrders = async(req,res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1});
        if(!orders){
            return res.status(404).json({message: "Order not Found"});
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch order'})
    }
}

//get user specefic single order deetails
// const getUserSpeceficSingleOrder = async(req,res) => {
//     try {
//         const {email, id} = req.params;
//         const order = await Order.findOne({email, id});
//         if(!order){
//             return res.status(404).json({message: "Order not Found"});
//         }
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to fetch order'})
//     }
// }


module.exports = {
    createAOrder,
    getUserSpeceficOrders,
    // getUserSpeceficSingleOrder,
}