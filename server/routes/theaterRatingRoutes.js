const express = require('express');
const { addTheaterRating, getTheaterRatings,deleteTheaterRating,getTheaterRatingById,getFakeOrReportedTheaterRatings,
    getTheaterRatingsForAdmin,deleteTheaterRatingAndIncreaseSuspicion,reportTheaterRating,updateFakeandReportRating
 } = require('../controllers/theaterRatingController');
const router = express.Router();

router.post('/add-theater-rating', addTheaterRating);
router.get('/ratings/:theater_id', getTheaterRatings);
router.delete('/delete-theater-rating/:theater_rating_id', deleteTheaterRating);
router.get('/get-theater-rating/:theater_rating_id', getTheaterRatingById);
router.get('/fake-reported-rating', getFakeOrReportedTheaterRatings);
router.get('/get-theater-ratings-for-admin', getTheaterRatingsForAdmin)
router.delete('/delete-theater-rating-and-increase-suspicion/:theater_rating_id', deleteTheaterRatingAndIncreaseSuspicion);
router.put('/report-rating/:theater_rating_id', reportTheaterRating);
router.put('/update-fake-reported-rating/:theater_rating_id', updateFakeandReportRating);

module.exports = router;
