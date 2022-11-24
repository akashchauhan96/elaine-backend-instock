const knex = require('knex')(require('../knexfile'));

// GET all of the warehouses within the warehouses table in instock database
const getAll = (_req, res) => {
    knex('warehouses')
    .then((data) => {
        res.status(200).json(data);
     })
    .catch((err) => {
        res.status(400).send(`Error retrieving warehouses ${err}`);    
    });
}

const getOne = (req, res) => {
    knex('warehouses')
    .where({ id: req.params.id })
    .then((data) => {
        res.status(200).json(data[0]);
    })
    .catch((err) => {
        res.status(400).send(`Error retrieving warehouse ${err}`)
    })
}

const getStock = (req, res) => {
    knex('inventories')
    .where({ warehouse_id: req.params.id })
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(400).send(`Error retrieving warehouse ${err}`)
    })
}


module.exports = {
    getAll,
    getOne,
    getStock
}