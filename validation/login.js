const Validator = require('validator');
const customIsEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !customIsEmpty(data.email) ? data.email : '';
    data.password = !customIsEmpty(data.password) ? data.password : '';

    // The following error messages are should be in order otherwise we get unordered validation error message.
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: customIsEmpty(errors)
    };
};