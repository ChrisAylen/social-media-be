const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema({
    // reactionId: {
    //     type: Schema.Types.ObjectId,
    //     default: new Types.ObjectId(),
    // },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 180,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const thoughtsSchema = new Schema(
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
            get: (createdAtVal) => {
                return createdAtVal.toLocaleDateString();
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtsSchema);
module.exports = Thought;
