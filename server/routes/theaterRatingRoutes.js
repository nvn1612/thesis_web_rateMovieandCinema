const express = require('express');
const { addTheaterRating, getTheaterRatings,deleteTheaterRating,getTheaterRatingById,getTheatersWithBayesRating,
    getTheaterRatingsForAdmin
 } = require('../controllers/theaterRatingController');
const router = express.Router();

router.post('/add-theater-rating', addTheaterRating);
router.get('/ratings/:theater_id', getTheaterRatings);
router.delete('/delete-theater-rating/:theater_rating_id', deleteTheaterRating);
router.get('/get-theater-rating/:theater_rating_id', getTheaterRatingById);
router.get('/get-theater-ratings-for-admin', getTheaterRatingsForAdmin)
router.get('/get-all-theaters-bayesian-ratings', getTheatersWithBayesRating)
module.exports = router;
