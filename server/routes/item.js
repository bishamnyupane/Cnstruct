const { Router } = require('express');
const itemHandler = require('../logicHandlers/itemHandlers.js');
const router = Router();

router.get('/item', itemHandler.getItems);

router.post('/item', itemHandler.postItem);

router.put('/item', itemHandler.updateItem);

router.delete('/item/:id', itemHandler.deleteItem);

module.exports = router;