const { User } = require('../models');

module.exports = {
    // GET /api/users
    getAllUsers(req, res) {
        User.find()
            // .populate('thoughts')
            // .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    // GET api/users/:userId
    getSingleUser(req, res) {
        // console.log(req.params.userId)
        User.findOne({ _id: req.params.userId })
            // TODO: Get population working
            // TODO: Why does this break it, if uncommented?
            .select('-__v')
            // .populate("friends")
            // .populate("thoughts")
            // .populate({ path: 'friends', select: '-__v' })
            .then((user) => {
                console.log(user)
                if (!user) {
                    res.status(404).json({ messsage: 'No user found with this ID' });
                    return;
                }
                res.json(user)
            })
            .catch((err) => res.status(500).json(err))
    },

    // POST api/users
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // PUT api/users/:userId
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No user with this ID!" })
                } else {
                    res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // DELETE api/user/:userId
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No user with this ID!" })
                } else {
                    res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err))
        //TODO (BONUS): Remove user's thoughts when deleted
    },

    // POST /api/users/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No user with this ID!" })
                } else {
                    res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err))
    },

    // DELETE /api/user/:userId/friends/:friendId
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with that ID!' })
                } else {
                    res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err))
    }
}