const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)
module.exports = router;