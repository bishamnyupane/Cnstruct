const { Router } = require('express');
const cartHandler = require('../logicHandlers/cartHandlers');
const router = Router();
// const auth = require('../middleware/auth');

router.get('/cart/:userId', cartHandler.getCartItems);//fetches all the items in the cart of a user with the help of the user id

router.post('/cart', cartHandler.addCartItem);//adding item to cart

router.delete('/cart', cartHandler.deleteItem);//to remove a particular item from the cart of a user

module.exports = router;