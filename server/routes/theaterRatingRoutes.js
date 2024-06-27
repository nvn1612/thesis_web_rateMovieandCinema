const express = require('express');
const { addTheaterRating, getTheaterRatings } = require('../controllers/theaterRatingController');
const router = express.Router();

router.post('/add-theater-rating', addTheaterRating);
router.get('/ratings/:theater_id', getTheaterRatings);

module.exports = router;
