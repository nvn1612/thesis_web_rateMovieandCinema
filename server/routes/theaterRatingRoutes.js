const express = require('express');
const { addTheaterRating, getTheaterRatings,deleteTheaterRating,getTheaterRatingById,getTheatersWithBayesRating,
    getTheaterRatingsForAdmin,getTheaterRatingLikeCount,checkTheaterRatingLike,
    toggleTheaterRatingLike,getTotalTheaterRatings,searchTheaterRatingsByUsername,
    getExpertRatings,getAudiRatings
 } = require('../controllers/theaterRatingController');
const router = express.Router();

router.post('/add-theater-rating', addTheaterRating);
router.get('/ratings/:theater_id', getTheaterRatings);
router.delete('/delete-theater-rating/:theater_rating_id', deleteTheaterRating);
router.get('/get-theater-rating/:theater_rating_id', getTheaterRatingById);
router.get('/get-theater-ratings-for-admin/:theater_id', getTheaterRatingsForAdmin);
router.get('/get-all-theaters-bayesian-ratings', getTheatersWithBayesRating);
router.get('/get-theater-rating-like-count/:theater_rating_id', getTheaterRatingLikeCount);
router.get('/check-theater-rating-like/:theater_rating_id', checkTheaterRatingLike);
router.put('/toggle-theater-rating-like/:theater_rating_id', toggleTheaterRatingLike);
router.get('/total-theater-ratings',getTotalTheaterRatings);
router.get('/search-theater-ratings-by-username',searchTheaterRatingsByUsername);
router.get('/get-expert-theater-ratings/:theater_id',getExpertRatings);
router.get('/get-audi-theater-ratings/:theater_id',getAudiRatings);
module.exports = router;
