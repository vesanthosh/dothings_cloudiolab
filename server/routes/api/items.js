const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// Get All Items
router.get('/', (req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(500).json({message: err.message || "Error occurred while retrieving items. Internal Server Error 500."}));
});

// Get Single Item
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            if(!item){
                res.status(404).json({message: "Item not found with id "+ req.params.id});
            }
            else{
                res.json(item);
            }
        }).catch(err => res.status(500).json({message: err.message || "Error while retrieving an item with id "+ req.params.id}));
});

// Post an Item
router.post('/', (req, res) => {
    // Validate Request
    if(!req.body.name){
        res.status(400).json({message: "Item name can not be empty."});
    }
    else{
        // Create & Save Item to the Database
        const item_data = new Item({
            name: req.body.name,
            description: req.body.description || "No description"
        });
        Item.create(item_data)
            .then(item => res.json(item))
            .catch(err => res.status(500).json({message: err.message || "Error occurred while creating an item with id."}));
    }
});

// Update an Item - Need to optimize "name", if you give empty value, it's updating the databse.
router.put('/:id', (req, res) => {
    Item.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(item => {
            if(!item){
                res.status(404).json({message: "Item not found with id "+ req.params.id});
            }
            else{
                // Get the updated data from Database
                Item.findOne({_id: req.params.id})
                    .then(item => res.json(item));
            }
        }).catch(err => res.status(500).json({message: err.message || "Error while updating an item with id "+ req.params.id}));
});

// Delete an Item
router.delete('/:id', (req, res) => {
    Item.findByIdAndRemove({_id: req.params.id})
        .then(item => {
            if(!item){
                res.status(404).json({message: "Item not found with id "+ req.params.id});
            }
            else{
                res.json({message: "Item deleted successfully!"});
            }
        }).catch(err => res.status(500).json({message: err.message || "Error while deleting an item with id "+ req.params.id}));
});

module.exports = router;