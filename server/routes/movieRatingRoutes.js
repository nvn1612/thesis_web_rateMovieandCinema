const express = require('express');
const { addMovieRating,getMovieRatings,deleteMovieRating,getMovieRatingById,
    getMovieRatingsForAdmin,getMoviesWithBayesRating,toggleMovieRatingLike,
    checkMovieRatingLike,getMovieRatingLikeCount,getTotalMovieRatings,searchMovieRatingsByUsername,
    getExpertRatings,getAudiRatings,getMovieBayesRatingById

  } = require('../controllers/movieRatingController');
const router = express.Router();

router.post('/add-rating', addMovieRating);
router.get('/ratings/:movie_id', getMovieRatings);
router.delete('/delete-movie-rating/:movie_rating_id', deleteMovieRating);
router.get('/get-movie-rating/:movie_rating_id', getMovieRatingById);
router.get('/get-movie-ratings-for-admin/:movie_id', getMovieRatingsForAdmin);
router.get('/get-all-movies-bayesian-ratings', getMoviesWithBayesRating);
router.put('/toggle-movie-rating-like/:movie_rating_id', toggleMovieRatingLike);
router.get('/check-movie-rating-like/:movie_rating_id', checkMovieRatingLike);
router.get('/get-movie-rating-like-count/:movie_rating_id', getMovieRatingLikeCount);
router.get('/total-movie-ratings',getTotalMovieRatings);
router.get('/search-movie-ratings-by-username',searchMovieRatingsByUsername);
router.get('/get-expert-movie-ratings/:movie_id',getExpertRatings);
router.get('/get-audi-movie-ratings/:movie_id',getAudiRatings);
router.get('/get-movie-bayes-rating/:movie_id',getMovieBayesRatingById)
module.exports = router;