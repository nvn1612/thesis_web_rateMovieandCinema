const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const userRoutes = require('./routes/userRoutes'); 

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});