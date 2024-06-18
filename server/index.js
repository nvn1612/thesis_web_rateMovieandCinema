const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const path = require('path'); 
const userRoutes = require('./routes/userRoutes'); 
const movieRoutes = require('./routes/movieRoutes');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/uploadimage', express.static(path.join(__dirname, 'uploadimage')));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});