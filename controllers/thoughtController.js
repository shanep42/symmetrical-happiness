const { Thought, User, Reaction } = require('../models');


module.exports = {
    // GET /api/thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // GET /api/thoughts/:thoughtId
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: `No thought with id ${req.params.thoughtId}` })
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    },

    // POST api/users/:userId/thoughts
    createThought(req, res) {
        Thought.create(req.body)
            //TODO: Attach thought to user
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this ID!' })
                } else {
                    res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err))
    },


    // PUT api/thoughts/:thoughtId
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: `No thought found with ID ${req.params.id}` })
                } else {
                    res.json(thought)
                }
            })
            .catch((err) => res.status(500).json(err))
    },

    // DELETE api/user/:thoughtId
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: `No thought found with id ${req.params.thoughtId}` })
                } else {
                    User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { videos: req.params.thoughtId } },
                        { new: true }
                    )
                        .then((user) => {
                            console.log("USER:", user)
                            if (!user) {
                                res.status(404).json({ message: 'Unowned Thought Deleted' })
                            } else {
                                res.json({ message: 'Thought successfully deleted' })
                            }
                        })
                }
            }
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    // POST /api/thoughts/:thoughtId/reactions
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: `No Thought found with ID ${req.params.thoughtId}!` })
                } else {
                    res.json(thought)
                }
            })
            .catch((err) => res.status(500).json(err))
    },

    // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ messsage: 'No thought with this ID!' })
                } else {
                    res.json(thought)
                }
            })
            .catch((err) => res.status(500).json(err))
    }
}