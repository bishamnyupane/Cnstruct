const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const connection = require('../server');

module.exports.signup = (req, res) => {
    const { name, email, password, address, phone, dob } = req.body;

    if( !name || !email || !password || !address || !phone || !dob ){
        res.status(400).json({msg: "Please enter all fields"});
    }

    connection.query(
            "SELECT * FROM users WHERE email = ?", [email], (err, results, field) => {
                if(err)
                {
                    console.log(err);
                    return res.status(400).send();
                }
             if(results.length > 0){
                return res.status(400).json({msg: 'user already exists'});
             }
            }
        );

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
            password = hash; 

            let user;

            connection.query("INSERT INTO users (fullName, email, password, address, phone, dob) VALUES (?, ?, ?, ?, ?, ?)", [name, email, password, address, phone, dob], (err, results, fields) => {
                    if(err){
                        console.log("error while inserting user", err);
                        return res.status(400).send();
                    }
                    
                    connection.query("SELECT * FROM users WHERE email=?", [email], (err, results, fields) => {
                     user = results[0];
                    });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                customer: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )

                    return res.status(201).json({message: "new user created successfully."});
                })
            
        });
    });
 }

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password) {
        res.status(400).json({msg: "please enter all the fields"});
    }

    connection.query(
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
            if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

            jwt.sign(
                { id: user.id },
                config.get('jwtsecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )
         })
        }
    );
}

module.exports.getUser = (req, res) => {
    
    connection.query(
        "SELECT * FROM users WHERE id=?", [req.user.id, (err, results, fields) => {
            if(err) throw err;
            const user = results[0];
            delete user.password;
            res.json(user);
        }]
    )

}