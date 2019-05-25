const Validator = require('validator');
const customIsEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !customIsEmpty(data.name) ? data.name : '';
    data.email = !customIsEmpty(data.email) ? data.email : '';
    data.password = !customIsEmpty(data.password) ? data.password : '';
    data.password2 = !customIsEmpty(data.password2) ? data.password2 : '';

    // The following error messages are should be in order otherwise we get unordered validation error message.
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at aleast 6 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords does not match';
    }

    return {
        errors,
        isValid: customIsEmpty(errors)
    };
};