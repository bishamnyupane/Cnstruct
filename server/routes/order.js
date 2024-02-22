const { Router } = require('express'); //extracting the Router class
const orderHandler = require('../logicHandlers/orderHandlers');
const auth = require('../middleware/auth');

const router = Router();//Router is a class so creating an instance of it

router.get('/order/:id', orderHandler.getOrders);//fetches all the orders made till now

router.post('/order', orderHandler.checkout);//creates a new order

module.exports = router;

