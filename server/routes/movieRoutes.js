const express = require('express');
const { createMovie,getGenres,getAllMovies, getMovieById, deleteMovie, updateMovie  } = require('../controllers/movieControllers');
const router = express.Router();

router.get('/getallmovies', getAllMovies);
router.get('/getmovie/:id', getMovieById);
router.post('/createmovie', createMovie);
router.get('/genres', getGenres);
router.delete('/deletemovie/:id', deleteMovie);
router.put('/updatemovie/:id', updateMovie);

module.exports = router;