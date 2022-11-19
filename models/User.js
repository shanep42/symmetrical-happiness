const { Schema, Types } = require('mongoose');

const userSchema = new Schema (
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
            //TODO: Validate email address
        },
        thoughts: {
            //TODO: Array of _id values referencing the Thought model
        },
        friends: {
            //TODO: Array of _id values referencing the User model (self-reference)
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