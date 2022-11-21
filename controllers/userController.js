const { User } = require('../models');

module.exports = {
    // GET /api/users
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    // GET api/users/:userId
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            // .populate({
            //     // The path should be "thought", I think, but that 500s while "thoughts" goes through, but does not populate
            //     path: 'thoughts',
            //     select: '-__v'
            // })
            // TODO: Why does this break it, if uncommented?
            // .populate({
            //     path: 'friends',
            //     select: '-__v'
            // })
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ messsage: 'No user found with this ID' });
                    return;
                }
                res.json(user)
            })
            .catch((err) => res.status(500).json(err))
        //TODO: populate thought and friend data - Not sure how to start that
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