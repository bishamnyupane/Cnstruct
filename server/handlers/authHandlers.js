const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const connection = require('../server');

module.exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ){
        res.status(400).json({msg: "Please enter all fields"});
    }

    try{
        connection.query(
            "SELECT * FROM users WHERE email = ?", [email], (err, results, field) => {
                if(err)
                {
                    console.log(err);
                    return res.status(400).send();
                }
             if(results.length)   
            }
        )
    }

}