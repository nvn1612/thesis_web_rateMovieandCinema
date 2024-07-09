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

  const getMoviesByGenre = async (req, res) => {
    const { genre_id } = req.params;
    try {
      const movies = await prisma.movies.findMany({
        where: {
          movie_genres: {
            some: {
              genre_id: parseInt(genre_id),
            }
          }
        },
        include: {
          movie_genres: {
            include: {
              genres: true,
            }
          }
        }
      });
      res.json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Có lỗi xảy ra' });
    }
  };

  const getMoviesByCountry = async (req, res) => {
    const { country_id } = req.params;
    try {
      const movies = await prisma.movies.findMany({
        where: {
          country_id: parseInt(country_id),
        },
        include: {
          movie_genres: true,
          countries: true
        }
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
          countries: true 
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
        },
        countries: true
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

    if (!name_movie || !trailer_link || !country || !description || !director || !release_date || !duration || !genre) {
      return res.status(400).json({ error: 'Các thông tin phải được nhập đầy đủ !' });
    }
    
    try {
      const newMovie = await prisma.movies.create({
        data: {
          name_movie,
          trailer_link,
          poster_image: posterImagePath,
          backdrop_image: backdropImagePath,
          country_id: parseInt(country),
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

const getAllCountries = async (req, res) => {
  try {
    const countries = await prisma.countries.findMany();
    res.json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi lấy danh sách quốc gia' });
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
          country_id: parseInt(country),
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
const getTotalMovies = async (req, res) => {
  try {
    const totalMovies = await prisma.movies.count();
    res.status(200).json({ totalMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the total number of movies.' });
  }
}

module.exports = { 
  createMovie, getGenres, getAllMovies, 
  getMovieById, deleteMovie, updateMovie,
  searchMoviesByName, getMoviesByGenre, getAllCountries,
  getMoviesByCountry, getTotalMovies
};