const express = require('express');
const { createMovie, getGenres, getAllMovies, 
    getMovieById, deleteMovie, updateMovie,
    searchMoviesByName, getMoviesByGenre, getAllCountries } = require('../controllers/movieControllers');
const router = express.Router();

router.get('/getallmovies', getAllMovies);
router.get('/getmovie/:id', getMovieById);
router.post('/createmovie', createMovie);
router.get('/getgenres', getGenres);
router.delete('/deletemovie/:id', deleteMovie);
router.put('/updatemovie/:id', updateMovie);
router.get('/search/movies', searchMoviesByName);
router.get('/getmoviesbygenre/:genre_id', getMoviesByGenre);
router.get('/getallcountries', getAllCountries);

module.exports = router;
