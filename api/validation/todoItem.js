const Validator = require('validator');
const customIsEmpty = require('./isEmpty');

module.exports = function validateTodoItemInput(data) {
    let errors = {};

    data.name = !customIsEmpty(data.name) ? data.name : '';
    data.description = !customIsEmpty(data.description) ? data.description : '';

    // The following error messages are should be in order otherwise we get unordered validation error message.
    if (!Validator.isLength(data.name, { min: 2, max: 60 })) {
        errors.name = 'Todo item name must be between 2 and 60 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Todo item name field is required';
    }

    if (!Validator.isLength(data.description, { max: 200 })) {
        errors.description = 'Description should be less then 200 characters';
    }

    return {
        errors,
        isValid: customIsEmpty(errors)
    };
};