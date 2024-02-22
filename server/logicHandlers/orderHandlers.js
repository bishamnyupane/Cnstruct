const pool = require('../db.js')

module.exports.getOrders = async (req, res) => {
    const userId = req.params.id;
    try{
        pool.query("SELECT * FROM orders WHERE userId = ? ORDER BY orderDate DESC", [userId], (err, results, fields) => {
            if(err){
                console.log("error fetching orders:", err);
                throw err;
            }
            return res.json(results);
        })
    } catch(err){
        console.log(err);
        return res.status(500).send("something went wrong");
    }
}

module.exports.checkout = async(req, res) => {
    
}