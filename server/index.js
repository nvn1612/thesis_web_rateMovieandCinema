const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const path = require('path'); 
const userRoutes = require('./routes/userRoutes'); 
const movieRoutes = require('./routes/movieRoutes');
const movieRatingRoutes = require('./routes/movieRatingRoutes');
const movieTheatersRoutes = require('./routes/movieTheatersRoutes');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/movie-rating', movieRatingRoutes);
app.use('/movie-theater', movieTheatersRoutes);

app.use('/uploadimage', express.static(path.join(__dirname, 'uploadimage')));
app.use('/uploadimagemovie', express.static(path.join(__dirname, 'uploadimagemovie')));
app.use('/uploadimagetheater', express.static(path.join(__dirname, 'uploadimagetheater')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});