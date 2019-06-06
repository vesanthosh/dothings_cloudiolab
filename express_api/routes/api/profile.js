const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');

// Item Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const TodoItem = require('../../models/TodoItem');

// @route   GET api/profile/all
// @desc    Get all public profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.nopublicprofiles = 'There are no public profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.handle = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile
// @desc    Get current user's profile
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

// TODO: seperate the update logic
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
            // Update //TODO: update only fields without handle as it is unique for everyone and they can't able to change after this.
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
                            .then(profile => {
                                const todoItemFields = {};
                                todoItemFields.user = req.user.id;
                                new TodoItem(todoItemFields)
                                    .save()
                                    .catch(err => res.status(500).json({ message: err.message || "Error occurred while creating an item with id." }));
                                res.json(profile);
                            })
                            .catch(err => res.status(500).json({ message: err.message || "Error occurred while creating a profile" }));
                    });
            }
        });
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            TodoItem.findOneAndRemove({ user: req.user.id })
                .then(() => {
                    User.findOneAndRemove({ _id: req.user.id })
                        .then(() => res.json({ success: true }))
                });
        });
});

module.exports = router;