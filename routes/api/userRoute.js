const router = require('express').Router();

//getAllUsers
router.get('/', (req, res) => {
    res.send('Get all users');
}
);

//getUserById
router.get('/:id', (req, res) => {
    res.send('Get user by id:' + req.params.id);
}
);

//createUser
router.post('/', (req, res) => {
    res.send('Create user');
}
);

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