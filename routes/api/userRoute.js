const express = require('express');
const router = require('express').Router();
const User = require('../../models/user');

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
router.get('/:id', (req, res) => {
    res.send('Get user by id:' + req.params.id);
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
router.put('/:id', (req, res) => {
    res.send('Update user by id:' + req.params.id);
}
);

//deleteUser
router.delete('/:id', (req, res) => {
    res.send('Delete user by id' + req.params.id);
}
);



// const {
//     getallUsers,
//     getUser,
//     createUser,
//     //updateUser,
//     //deleteUser,


// } = require('../../controllers/usersController');

// const {addfriends, deletefriends} = require('../../controllers/friendsController');

// router.route('/').get(getallUsers).post(createUser);
// router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser);
// //router.route('/addfriend/:userId').post(addfriends);
// //router.route('/:userId/deletefriend/:deletefriendsId').delete(deletefriends);



module.exports = router;