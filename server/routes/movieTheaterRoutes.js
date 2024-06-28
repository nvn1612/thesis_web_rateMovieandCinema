const express = require('express');
const { getAllTheaters,
    getTheaterById,
    createTheater,
    updateTheater,
    deleteTheater,
    searchTheatersByName
    } = require('../controllers/movieTheaterController');
const router = express.Router();

router.get('/getalltheaters',getAllTheaters);
router.get('/gettheater/:id',getTheaterById);
router.post('/createtheater',createTheater);
router.put('/updatetheater/:id',updateTheater);
router.delete('/deletetheater/:id',deleteTheater);
router.get('/search/theaters',searchTheatersByName);

module.exports = router;