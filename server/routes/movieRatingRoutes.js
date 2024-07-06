const express = require('express');
const { addMovieRating,getMovieRatings,deleteMovieRating,getMovieRatingById,
    getMovieRatingsForAdmin,getMoviesWithBayesRating,toggleMovieRatingLike
  } = require('../controllers/movieRatingController');
const router = express.Router();

router.post('/add-rating', addMovieRating);
router.get('/ratings/:movie_id', getMovieRatings);
router.delete('/delete-movie-rating/:movie_rating_id', deleteMovieRating);
router.get('/get-movie-rating/:movie_rating_id', getMovieRatingById);
router.get('/get-movie-ratings-for-admin', getMovieRatingsForAdmin)
router.get('/get-all-movies-bayesian-ratings', getMoviesWithBayesRating)
router.put('/toggle-movie-rating-like/:movie_rating_id', toggleMovieRatingLike)
module.exports = router;