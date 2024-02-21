const { Router } = require('express');
const itemHandler = require('../logicHandlers/itemHandlers.js');
const auth = require('../middleware/auth');

const router = Router();

router.get('/item', itemHandler.getItems);

router.post('/item', auth.adminAuth, itemHandler.postItem);

router.put('/item', auth.adminAuth, itemHandler.updateItem);

router.delete('/item/:id', auth.adminAuth, itemHandler.deleteItem);

module.exports = router;