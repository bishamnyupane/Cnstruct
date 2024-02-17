const pool = require('../db')

module.exports.getItems = async (req, res) => {
    pool.query(
        "SELECT * FROM product",
        (err, results, fields) => {
            if(err) throw err;
            return res.json(results);
        }
    );
}

module.exports.postItem = async (req, res) => {
    const { id, name, price, category, description } = req.body;
    pool.query(
        "INSERT INTO product (name, price, id, category, description) VALUES (?, ?, ?, ?, ?)", [name, price, id, category, description], (err, results, fields) => {
            if(err) {
                console.log("error while inserting item:", err);
                throw err;
            }
            return res.json({ name, price, id, category, description});
        }
    );
    
}

module.exports.updateItem = (req, res) => {
    const { name, price, id, category, description} = req.body;
    pool.query(
        "UPDATE product SET name = ?, price = ?, category = ?, description = ? WHERE id = ? ", [name, price, category, description, id ], (err, results, fields) => {
            if(err) {
                console.log("error occurred while updating item:", err);
                throw err;
            }
            return res.json({ name, price, id, category, description});
        }
    );
}

module.exports.deleteItem = (req, res) => {
    const id = req.params.id;
    pool.query(
        "DELETE FROM product WHERE id = ?", [id], (err, results, fields) => {
            if(err){
                console.log("error while deleting item:", err);
                throw err;
            }
            return res.json({success: true});
        }
    );
}