const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const pool = require('../db');

module.exports.signup = async (req, res) => {
    //destructuring
    const { name, email, password, address, phone } = req.body;

    if( !name || !email || !password || !address || !phone ){
        return res.status(400).json({msg: "Please enter all fields"});
    }

    try{
        pool.query(
            "SELECT * FROM users WHERE email = ?", [email], (err, results, field) => {
                if(err)
                {
                    console.log(err);
                    return res.status(400).send();
                }
             if(results.length > 0){
                return res.status(400).json({msg: 'user already exists'});
             }

             bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err){
                         console.log("error occurred during password hashing:", err);
                         return;
                    }
        
                    pool.query("INSERT INTO users (fullName, email, password, address, phone) VALUES (?, ?, ?, ?, ?)", [name, email, hash, address, phone], (err, results, fields) => {
                            if(err){
                                console.log("error while inserting user", err);
                                return res.status(400).send();
                            }
                            return res.status(201).send("user created successfully");
                        })                    
                });
            });
            }
        );
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password) {
        return res.status(400).json({msg: "please enter all the fields"});
    }

    pool.query(
        "SELECT * FROM users WHERE email = ?", [email], (err, results, field) => {
            if(err)
            {
                console.log(err);
                return res.status(400).send();
            }
         if(results.length == 0){
            return res.status(400).json({msg: 'user does not exist'});
         }

         const user = results[0];

         //validate password
         bcrypt.compare(password, user.password)
         .then(isMatch => {
            if(!isMatch)
            {
                 return res.status(401).json({msg:'Invalid credentials'});
            }
            jwt.sign(
                { email: user.email },user.admin ? config.get('jwtAdminSecret') :
                config.get('jwtUserSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    return res.json({
                        token,
                        user: {
                            name: user.fullName,
                            email: user.email,
                            admin: user.admin
                        }
                    });
                }
            )
         })
        }
    );
}

module.exports.getUser = (req, res) => {
    
    pool.query(
        "SELECT * FROM users WHERE id=?", [req.user.id, (err, results, fields) => {
            if(err) throw err;
            const user = results[0];
            delete user.password;
            return res.json(user);
        }]
    )

}