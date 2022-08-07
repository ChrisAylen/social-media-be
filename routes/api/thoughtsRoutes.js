const express = require('express');
const router = require('express').Router();
//const Thought = require('../../models/Thought');
const {Thought, User } = require('../../models/');


//Get all thoughts


router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// Get a single thought by its id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
// Create a new thought on a user
router.post('/', async (req, res) => {
    const thought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        
    });
    try {
        const newThought = await thought.save();
        User.findById(req.body.user_Id, (err, user) => {

            if (err) {
                res.status(500).json({ message: err.message });
            }
            else {
                user.thoughts.push(thought);
                user.save();
                res.status(201).json(thought);
            }

        }
        );
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//put to update a thought
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true, returnOriginal: false }
        );
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Delete a thought
router.delete('/:id', async (req, res) => {
    try {
        const removedThought = await Thought.remove({ _id: req.params.id });
        res.json(removedThought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
//Update a thought to add a reaction
router.patch('/:id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true, returnOriginal: false }
        );
        await thought.save();
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// router.post('/:id/reactions', async (req, res) => {
//     try {
//         const thought = await Thought.findById(req.params.id);
//         const reaction = new Reaction({
//             reactionBody: req.body.reactionText,
//             username: req.body.username,
//         });
//         thought.reactions.push(reaction);
//         await thought.save();
//         res.json(thought);
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

//Delete a reaction
router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        const reaction = thought.reactions.id(req.params.reactionId);
        reaction.remove();
        await thought.save();
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
//Get all reactions

module.exports = router;
