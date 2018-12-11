const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');
const validateTodoItemInput = require('../../validation/todoItem');

// Item Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/todo/all
// @desc    Get current user's all todo items
// @access  Private
router.get('/todo/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .sort({ date: -1 })
        .then(items => {
            if (!items) {
                errors.noitems = 'There are no todo items for this user';
                return res.status(404).json(errors);
            }
            res.json(items);
        })
        .catch(err => res.status(500).json({ message: err.message || "Error occurred while retrieving todo items. Internal Server Error 500." }));
});

// @route   GET api/items/:id
// @desc    Get single todo item by id
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Item.findById(req.params.id)
        .then(item => {
            if (!item) {
                errors.noitem = 'Item not found with id' + req.params.id;
                res.status(404).json(errors);
            }
            else {
                res.json(item);
            }
        }).catch(err => res.status(500).json({ message: err.message || "Error while retrieving an item with id " + req.params.id }));
});

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create or edit user's profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    // Get fields - below line are used to filter out the fields which is entered by the users.
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Update
            if (profile) {
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile));
            } else {
                // Create
                // Check if there is any existing handles
                Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle is already exists';
                            res.status(404).json(errors);
                        }
                        // Save or create Profile with that handle
                        new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile))
                            .catch(err => res.status(500).json({ message: err.message || "Error occurred while creating an item with id." }));
                    });
            }
        });
});

// @route   POST api/profile/todos
// @desc    Add a todo item to profile / account
// @access  Private
router.post('/todos', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTodoItemInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newTodoItem = {
                name: req.body.name,
                description: req.body.description || 'No description'
            };
            // Add to exp array
            profile.todoItems.unshift(newTodoItem);
            profile.save()
                .then(profile => res.json(profile));
        });
});

// @route   DELETE api/profile/todos/:todo_item_id
// @desc    Delete a todo item from profile / account
// @access  Private
router.delete('/todos/:todo_item_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // Get remove index
            const removeIndex = profile.todoItems.map(item => item.id).indexOf(req.params.todo_item_id);
            // Splice out of array
            profile.todoItems.splice(removeIndex, 1);

            // Save
            profile.save()
                .then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }));
        });
});

// // Update an Item - Need to optimize "name", if you give empty value, it's updating the databse.
// router.put('/:id', (req, res) => {
//     Item.findByIdAndUpdate({ _id: req.params.id }, req.body)
//         .then(item => {
//             if (!item) {
//                 res.status(404).json({ message: "Item not found with id " + req.params.id });
//             }
//             else {
//                 // Get the updated data from Database
//                 Item.findOne({ _id: req.params.id })
//                     .then(item => res.json(item));
//             }
//         }).catch(err => res.status(500).json({ message: err.message || "Error while updating an item with id " + req.params.id }));
// });

module.exports = router;