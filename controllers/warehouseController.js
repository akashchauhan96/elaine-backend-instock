const knex = require('knex')(require('../knexfile'));

// GET all of the warehouses within the warehouses table in instock database
const getAll = (_req, res) => {
    knex('warehouses')
    .then((data) => {
        res.status(200).json(data);
     })
    .catch((err) => {
        res.status(400).send(`Error retrieving Warehouses ${err}`);    
    });
}



module.exports = {
    getAll
}