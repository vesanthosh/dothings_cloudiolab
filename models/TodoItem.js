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
            category: {
                type: String
            },
            priority: {
                type: String
            },
            isCompleted: {
                type: Boolean,
                default: false
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = TodoItem = mongoose.model('todoItems', TodoItemSchema);