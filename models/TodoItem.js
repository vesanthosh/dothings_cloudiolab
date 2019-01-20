const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const TodoItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // Associate users by its id.
        ref: 'users' // refers to collection
    },
    todoItems: [
        {
            name: {
                type: String,
                required: true,
                min: 2,
                max: 60
            },
            description: {
                type: String,
                max: 200
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = TodoItem = mongoose.model('todoItems', TodoItemSchema);