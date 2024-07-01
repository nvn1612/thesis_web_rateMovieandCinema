const express = require('express');
const { addMovieRating,getMovieRatings,deleteMovieRating,getFakeOrReportedMovieRatings,updateFakeandReportRating,reportMovieRating,getMovieRatingById,getLeverMovieRating,deleteMovieRatingAndIncreaseSuspicion,
    getMovieRatingsForAdmin
  } = require('../controllers/movieRatingController');
const router = express.Router();

router.post('/add-rating', addMovieRating);
router.get('/ratings/:movie_id', getMovieRatings);
router.delete('/delete-movie-rating/:movie_rating_id', deleteMovieRating);
router.get('/fake-reported-rating', getFakeOrReportedMovieRatings);
router.put('/update-fake-reported-rating/:movie_rating_id', updateFakeandReportRating);
router.put('/report-rating/:movie_rating_id', reportMovieRating);
router.get('/get-movie-rating/:movie_rating_id', getMovieRatingById);
router.get('/lever-movie-rating', getLeverMovieRating);
router.delete('/delete-movie-rating-increase-suspicion/:movie_rating_id', deleteMovieRatingAndIncreaseSuspicion);
router.get('/get-movie-ratings-for-admin', getMovieRatingsForAdmin)
module.exports = router;