const express = require('express');
const router = require('express').Router();
const { User } = require('../../models/');

//getAllUsers
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

//getUserById
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    
    //res.send('Get user by id:' + req.params.id);
}
);

//createUser
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        thoughts: req.body.thoughts,
        friends: req.body.friends,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//updateUser
router.patch('/:id', async (req, res) => {

    try {

        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true, returnOriginal: false }
        );
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);


//deleteUser
router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.id });
        res.json(removedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }


}
);


module.exports = router;