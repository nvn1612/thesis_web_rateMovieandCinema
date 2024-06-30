const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const path = require('path'); 
const userRoutes = require('./routes/userRoutes'); 
const movieRoutes = require('./routes/movieRoutes');
const movieRatingRoutes = require('./routes/movieRatingRoutes');
const movieTheatersRoutes = require('./routes/movieTheaterRoutes');
const theaterRatingRoutes = require('./routes/theaterRatingRoutes');
const postRoutes = require('./routes/postRouters');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/uploadimage', express.static(path.join(__dirname, 'uploadimage')));


app.use('/movie', movieRoutes);
app.use('/uploadimagemovie', express.static(path.join(__dirname, 'uploadimagemovie')));

app.use('/movie-theater', movieTheatersRoutes);
app.use('/uploadimagetheater', express.static(path.join(__dirname, 'uploadimagetheater')));


app.use('/movie-rating', movieRatingRoutes);
app.use('/theater-rating', theaterRatingRoutes);

app.use('/post', postRoutes);
app.use('/uploadimagepost', express.static(path.join(__dirname, 'uploadimagepost')));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});