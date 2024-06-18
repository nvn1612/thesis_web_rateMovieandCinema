const express = require('express');
const { createMovie} = require('../controllers/movieControllers');
const router = express.Router();

router.post('/createmovie', createMovie);

module.exports = router;