const { Router } = require('express'); //extracting the Router class

const router = Router();//Router is a class so creating an instance of it

const orderHandler = require('../logicHandlers/orderHandlers');

router.get('/order', orderHandler.getOrders);//fetches all the orders made till now

router.post('/order', orderHandler.checkout);//creates a new order

module.exports = router;

