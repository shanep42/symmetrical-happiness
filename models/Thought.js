const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId()
        },
        reactionBody: {
            tpye: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: Use a getter method to format the timestamp on query
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //TODO: Must be between 1 and 280 characters
        },
        createdAt: {
            type: Date,
            //TODO: Default value at current timestamp
            //Getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                
            }
        ]
            //TODO: Array of nested documents created with the reactionSchema
        
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array on query

const Thought = model('thought', thoughtSchema);

module.exports = Thought;