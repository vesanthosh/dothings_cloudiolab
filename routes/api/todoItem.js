const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateTodoItemInput = require('../../validation/todoItem');

// Item Model
const TodoItem = require('../../models/TodoItem');

// @route   GET api/todoItem/all
// @desc    Get current user's all todo items
// @access  Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    TodoItem.findOne({ user: req.user.id })
        .then(todoItem => {
            if (!todoItem) {
                errors.noprofile = 'There is no profile for this user. First create user profile to add your favourite todo item.';
                return res.status(404).json(errors);
            }
            res.json(todoItem);
        })
        .catch(err => res.status(500).json({ message: err.message || "Error occurred while retrieving todo items. Internal Server Error 500." }));
});

// @route   GET api/todoItem/:todoItem_id
// @desc    Get single todo item by id
// @access  Private
router.get('/:todoItem_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    TodoItem.findOne({ user: req.user.id })
        .then(todoItem => {
            if (!todoItem) {
                errors.noprofile = 'There is no profile for this user. First create user profile to add your favourite todo item.';
                return res.status(404).json(errors);
            }
            // Get item index
            const itemIndex = todoItem.todoItems.map(item => item.id).indexOf(req.params.todoItem_id);
            if (itemIndex == -1) {
                errors.noitemfound = 'Item not found with id ' + req.params.todoItem_id;
                res.status(404).json(errors);
            } else {
                res.json(todoItem.todoItems[itemIndex]);
            }
        }).catch(err => res.status(500).json({ message: err.message || "Error while retrieving an item with id " + req.params.todoItem_id }));
});

// @route   POST api/todoItem
// @desc    Create user's todo item
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTodoItemInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    TodoItem.findOne({ user: req.user.id })
        .then(todoItem => {
            if (todoItem) {
                const newTodoItem = {
                    name: req.body.name,
                    description: req.body.description || 'No description'
                };
                // Save or create Profile with that handle
                todoItem.todoItems.unshift(newTodoItem);
                todoItem.save()
                    .then(todoItem => res.json(todoItem));
            } else {
                errors.noprofile = 'There is no profile for this user. First create user profile to add your favourite todo item.';
                res.status(404).json(errors);
            }
        });
});

// @route   PUT api/todoItem/:todoItem_id
// @desc    Update single todo item by id
// @access  Private
router.put('/:todoItem_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTodoItemInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    TodoItem.findOne({ user: req.user.id })
        .then(todoItem => {
            if (!todoItem) {
                errors.noprofile = 'There is no profile for this user. First create user profile to add your favourite todo item.';
                return res.status(404).json(errors);
            }
            // Get item index
            const itemIndex = todoItem.todoItems.map(item => item.id).indexOf(req.params.todoItem_id);
            if (itemIndex == -1) {
                errors.noitemfound = 'Item not found with id ' + req.params.todoItem_id;
                res.status(404).json(errors);
            } else {
                // Update todo item
                TodoItem.findOneAndUpdate({ user: req.user.id, 'todoItems._id': req.params.todoItem_id }, {
                    $set: {
                        'todoItems.$.name': req.body.name,
                        'todoItems.$.description': req.body.description || 'No description'
                    }
                }, { new: true }).then(updatedtTodoItem => res.json(updatedtTodoItem.todoItems[itemIndex]));
            }
        }).catch(err => res.status(500).json({ message: err.message || "Error while retrieving an item with id " + req.params.todoItem_id }));
});

// @route   DELETE api/todoItem/:todoItem_id
// @desc    Delete a todo item from profile / account
// @access  Private
router.delete('/:todoItem_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    TodoItem.findOne({ user: req.user.id })
        .then(todoItem => {
            if (!todoItem) {
                errors.noprofile = 'There is no profile for this user. First create user profile to add your favourite todo item.';
                return res.status(404).json(errors);
            }
            // Get remove index
            const removeIndex = todoItem.todoItems.map(item => item.id).indexOf(req.params.todoItem_id);
            if (removeIndex == -1) {
                errors.noitemfound = 'Item not found with id ' + req.params.todoItem_id;
                res.status(404).json(errors);
            } else {
                // Splice out of array
                todoItem.todoItems.splice(removeIndex, 1);
                // Save
                todoItem.save()
                    .then(todoItem => res.json(todoItem));
            }
        }).catch(err => res.status(500).json(err));
});

module.exports = router;