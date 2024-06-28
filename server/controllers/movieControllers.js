const { PrismaClient,PrismaClientKnownRequestError } = require('@prisma/client');
const { uploadMovieImage } = require('../uploadMiddleware');
const fs = require('fs');
const prisma = new PrismaClient();


  const searchMoviesByName = async (req, res) => {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Tên phim không được bỏ trống' });
    }

    try {
      const movies = await prisma.movies.findMany({
        where: {
          name_movie: {
            contains: name,
          },
        },
        include: {
          movie_genres: true,
        },
      });
      res.json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Có lỗi xảy ra' });
    }
  };



const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movies.findMany({
      include: {
        movie_genres: true,
      }
    });
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Có lỗi xảy ra' });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movies.findUnique({
      where: { movie_id: parseInt(id) },
      include: {
        movie_genres: {
          include: {
            genres: true
          }
        }
      }
    });
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Có lỗi xảy ra' });
  }
};



const createMovie = async (req, res) => {
  uploadMovieImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { name_movie, trailer_link, country, description, director, release_date, duration, genre } = req.body;
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
          movie_genres: {
            create: genre.split(',').map(g => ({
              genres: {
                connect: {
                  genre_id: parseInt(g)
                }
              }
            }))
          }
        },
        include: {
          movie_genres: true
        }
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

const getGenres = async (req, res) => {
  try {
    const genres = await prisma.genres.findMany();
    res.json(genres);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Có lỗi xảy ra' });
  }
};


const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.movie_genres.deleteMany({
      where: {
        movie_id: Number(id)
      }
    });

    const deletedMovie = await prisma.movies.delete({
      where: { movie_id: Number(id) }
    });

    res.status(200).json(deletedMovie);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateMovie = async (req, res) => {
  uploadMovieImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { id } = req.params;
    const { name_movie, trailer_link, country, description, director, release_date, duration, genre } = req.body;
    const posterImagePath = req.files.poster_image ? req.files.poster_image[0].path : null;
    const backdropImagePath = req.files.backdrop_image ? req.files.backdrop_image[0].path : null;

    try {
      const existingMovie = await prisma.movies.findUnique({
        where: { movie_id: parseInt(id) },
        include: {
          movie_genres: true,
        }
      });

      if (!existingMovie) {
        if (posterImagePath) fs.unlinkSync(posterImagePath);
        if (backdropImagePath) fs.unlinkSync(backdropImagePath);
        return res.status(404).json({ error: 'Movie not found' });
      }

      const updatedMovie = await prisma.movies.update({
        where: { movie_id: parseInt(id) },
        data: {
          name_movie,
          trailer_link,
          poster_image: posterImagePath || existingMovie.poster_image,
          backdrop_image: backdropImagePath || existingMovie.backdrop_image,
          country,
          description,
          director,
          release_date: release_date ? new Date(release_date) : existingMovie.release_date,
          duration: duration ? parseInt(duration) : existingMovie.duration,
          movie_genres: {
            deleteMany: {},
            create: genre.split(',').map(g => ({
              genres: {
                connect: {
                  genre_id: parseInt(g)
                }
              }
            }))
          }
        },
        include: {
          movie_genres: true
        }
      });

      if (posterImagePath && existingMovie.poster_image) fs.unlinkSync(existingMovie.poster_image);
      if (backdropImagePath && existingMovie.backdrop_image) fs.unlinkSync(existingMovie.backdrop_image);

      res.json(updatedMovie);
    } catch (error) {
      console.log(error);

      if (posterImagePath) fs.unlinkSync(posterImagePath);
      if (backdropImagePath) fs.unlinkSync(backdropImagePath);

      res.status(500).json({ error: 'Có lỗi xảy ra' });
    }
  });
};


module.exports = { createMovie, getGenres, getAllMovies, getMovieById, deleteMovie, updateMovie, searchMoviesByName  };
