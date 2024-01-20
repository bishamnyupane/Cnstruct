const connection = require('../server');

module.exports.getItems = (req, res) => {
    connection.query(
        "SELECT * FROM product ORDER BY date DESC",
        (err, results, fields) => {
            if(err) throw err;
            res.json(results);
        }
    );
}

module.exports.postItem = (req, res) => {
    const { name, price, date } = req.body;
    const newItem = { name, price, date };
    connection.query(
        "INSERT INTO product (name, price, date) VALUES (?, ?, ?)", [name, price, date], (err, results, fields) => {
            if(err) throw err;
            res.json(newItem);
        }
    );
    
}

module.exports.updateItem = (req, res) => {
    const id = req.params.id;
    const { name, price, date } = req.body;
    connection.query(
        "UPDATE product SET name = ?, price = ?, date = ? WHERE id = ? ", [name, price, date, id ], (err, results, fields) => {
            if(err) throw err;
            res.json({ name, price, date });
        }
    );
}

module.exports.deleteItem = (req, res) => {
    const id = req.params.id;
    connection.query(
        "DELETE FROM product WHERE id = ?", [id], (err, results, fields) => {
            if(err) throw err;
            res.json({success: true});
        }
    );
}