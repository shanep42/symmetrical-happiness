const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: {
            // Array of _id values referencing the Thought model
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            //Array of _id values referencing the User model (self-reference)
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

const User = model('user', userSchema);

module.exports = User;