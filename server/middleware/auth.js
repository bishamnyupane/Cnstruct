const config = require('config');
const jwt = require('jsonwebtoken');

//middleware function for authentication
function auth(req, res, next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'no token, authorization failed'});
    }

    try{
        //verify token
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        //add user from payload
        req.user = decoded;
        next();//move to the next middleware function
    } catch(err){
        res.status(400).json({msg:'Token not valid'});
    }
}

module.exports = auth;