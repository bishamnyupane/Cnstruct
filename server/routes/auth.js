const { Router } =require('express');//destructuring the Router object from the express module
const authHandler = require('../handlers/authHandlers');

const router = Router();
const auth = require('../middleware/auth');

router.post('/register', authHandler.signup);

router.post('/login', authHandler.login);

router.get('/user', auth, authHandler.getUser);//to check if a user is logged in or not

module.exports = router;