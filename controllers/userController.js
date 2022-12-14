const { User, Thought } = require('../models');

module.exports = {
    // GET /api/users
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    // GET api/users/:userId
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate("friends")
            .populate("thoughts")
            .then((user) => {
                console.log(user)
                if (!user) {
                    res.status(404).json({ messsage: 'No user found with this ID' });
                    return;
                }
                res.json(user)
            })

            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
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
                    return Thought.deleteMany({ _id: { $in: user.thoughts } });
                }
            })
            .then((data) => {
                res.json({ message: "User deleted" })
            })
            //TODO (BONUS): Remove user's thoughts when deleted
            .catch((err) => res.status(500).json(err))
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