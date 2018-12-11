const Validator = require('validator');
const customIsEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !customIsEmpty(data.handle) ? data.handle : '';
    data.name = !customIsEmpty(data.name) ? data.name : ''; // When user doesn't enter anything in the field then we get value from UI as a null or undefined. thats why we are changing that to empty string ''.

    // The following error messages are should be in order otherwise we get unordered validation error message.
    if (!Validator.isLength(data.handle, { min: 2, max: 15 })) {
        errors.handle = 'Handle needs to between 2 to 15 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (!customIsEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }

    if (!customIsEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if (!customIsEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }

    if (!customIsEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }

    if (!customIsEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    return {
        errors,
        isValid: customIsEmpty(errors)
    };
};