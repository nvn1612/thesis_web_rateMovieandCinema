const express = require('express');
const { addMovieRating,getMovieRatings  } = require('../controllers/movieRatingController');
const router = express.Router();

router.post('/add-rating', addMovieRating);
router.get('/ratings/:movie_id', getMovieRatings);

module.exports = router;