const express = require('express');
const { addTheaterRating, getTheaterRatings,deleteTheaterRating } = require('../controllers/theaterRatingController');
const router = express.Router();

router.post('/add-theater-rating', addTheaterRating);
router.get('/ratings/:theater_id', getTheaterRatings);
router.delete('/delete-theater-rating/:theater_rating_id', deleteTheaterRating);

module.exports = router;
