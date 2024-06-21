const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addMovieRating = async (req, res) => {
    const {
      user_id,
      movie_id,
      content_rating,
      acting_rating,
      visual_effects_rating,
      sound_rating,
      directing_rating,
      entertainment_rating,
      comment,
    } = req.body;
  
    try {
      // Kiểm tra xem người dùng đã đánh giá phim này chưa
      const existingRating = await prisma.movie_rating.findUnique({
        where: {
          user_id_movie_id: {
            user_id,
            movie_id,
          },
        },
      });
  
      if (existingRating) {
        return res.status(400).json({ error: 'User has already rated this movie.' });
      }
  
      // Thêm đánh giá mới
      const newRating = await prisma.movie_rating.create({
        data: {
          user_id,
          movie_id,
          content_rating,
          acting_rating,
          visual_effects_rating,
          sound_rating,
          directing_rating,
          entertainment_rating,
          comment,
        },
      });
  
      return res.status(201).json(newRating);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while adding the rating.' });
    }
  };
  
  const getMovieRatings = async (req, res) => {
    const { movie_id } = req.params;
  
    try {
      // Chuyển đổi movie_id từ chuỗi sang số nguyên
      const movieIdInt = parseInt(movie_id, 10);
  
      if (isNaN(movieIdInt)) {
        return res.status(400).json({ error: 'Invalid movie_id parameter.' });
      }
  
      // Truy vấn các đánh giá cho phim cụ thể
      const ratings = await prisma.movie_rating.findMany({
        where: { movie_id: movieIdInt },
      });
  
      return res.status(200).json(ratings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving the ratings.' });
    }
  };


  module.exports = {
    addMovieRating,
    getMovieRatings
  };

