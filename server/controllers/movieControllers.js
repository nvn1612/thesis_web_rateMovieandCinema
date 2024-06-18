const { PrismaClient,PrismaClientKnownRequestError } = require('@prisma/client');
const { uploadMovieImage } = require('../uploadMiddleware');
const fs = require('fs');
const prisma = new PrismaClient();


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
        movie_genres: true,
      }
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

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
    // Xóa các bản ghi liên quan trong movie_genres trước
    await prisma.movie_genres.deleteMany({
      where: {
        movie_id: Number(id)
      }
    });

    // Sau đó mới xóa bản ghi trong movies
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

module.exports = { createMovie, getGenres, getAllMovies, getMovieById, deleteMovie  };
