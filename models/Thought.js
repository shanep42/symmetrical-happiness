const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');
const format = require('date-fns/format');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //TODO: Getter method to format the timestamp on query
            get: createTime => format(new Date(), 'MMMM dd, yyyy')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;