const { Router } = require('express');
const itemHandler = require('../handlers/itemHandlers');
const router = Router();

router.get('/items', itemHandler.getItems);

router.post('/items', itemHandler.postItem);

router.put('/items/:id', itemHandler.updateItem);

router.delete('/items/:id', itemHandler.deleteItem);

module.exports = router;