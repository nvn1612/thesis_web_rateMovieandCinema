const { PrismaClient } = require('@prisma/client');
const { uploadMovieImage } = require('../uploadMiddleware');
const fs = require('fs');
const prisma = new PrismaClient();

const createMovie = async (req, res) => {
  uploadMovieImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { name_movie, trailer_link, country, description, director, release_date, duration } = req.body;
    const posterImagePath = req.files.poster_image ? req.files.poster_image[0].path : null;
    const backdropImagePath = req.files.backdrop_image ? req.files.backdrop_image[0].path : null;

    try {
      const newMovie = await prisma.movies.create({
        data: {
          name_movie,
          trailer_link,
          poster_image: posterImagePath,
          backdrop_image: backdropImagePath,
          country,
          description,
          director,
          release_date: release_date ? new Date(release_date) : null,
          duration: duration ? parseInt(duration) : null,
        },
      });

      res.status(201).json(newMovie);
    } catch (error) {
      console.log(error);

      if (posterImagePath) {
        fs.unlinkSync(posterImagePath);
        console.log(`Deleted file: ${posterImagePath}`);
      }
      if (backdropImagePath) {
        fs.unlinkSync(backdropImagePath);
        console.log(`Deleted file: ${backdropImagePath}`);
      }

      res.status(500).json({ error: 'Có lỗi xảy ra' });
    }
  });
};

module.exports = { createMovie };
