const { Thought } = require('../models');

module.exports = {
    // GET /api/thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
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

    // POST api/thoughts
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
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
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    },

    // DELETE api/user/:thoughtId
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: `No thought found with id ${req.params.thoughtId}` })
                }
                res.json(thought)
            })
            .catch((err) => res.status(500).json(err))
    }
}