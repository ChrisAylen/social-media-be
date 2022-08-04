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

//post to create a new thought
router.post('/', async (req, res) => {
    const thought = new Thought({
        thoughtText: req.body.thoughtText,
        createdAt: req.body.createdAt,
        username: req.body.username,
        reactions: req.body.reactions,
    });
    try {
        const newThought = await thought.save();
        res.status(201).json(newThought);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
);

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
}
);

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
//Create a reaction
router.post('/:id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        const reaction = new Reaction({
            reactionBody: req.body.reactionBody,
            username: req.body.username,
        });
        thought.reactions.push(reaction);
        await thought.save();
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);
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


