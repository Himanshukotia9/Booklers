//order.route.js
const express = require ('express');
const { createAOrder, getUserSpeceficOrders, getUserSpeceficSingleOrder } = require('./order.controller');
const router = express.Router();

//create order endpoint
router.post('/', createAOrder)
// get all orders by userSpecefic email
router.get('/email/:email', getUserSpeceficOrders)
// //get single order by userSpecefic email and orderId
// router.get('/email/:email/:id', getUserSpeceficSingleOrder)

module.exports = router;