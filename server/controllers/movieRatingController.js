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

    // Tính toán total_rating
    const totalRating = (
      content_rating +
      acting_rating +
      visual_effects_rating +
      sound_rating +
      directing_rating +
      entertainment_rating
    ) / 6;

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
        total_rating: totalRating, 
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

    // Tính tổng total_rating
    const totalContentRatingSum = ratings.reduce((sum, rating) => sum + rating.content_rating, 0);
    const totalActingRatingSum = ratings.reduce((sum, rating) => sum + rating.acting_rating, 0);
    const totalVisualEffectsRatingSum = ratings.reduce((sum, rating) => sum + rating.visual_effects_rating, 0);
    const totalSoundRatingSum = ratings.reduce((sum, rating) => sum + rating.sound_rating, 0);
    const totalDirectingRatingSum = ratings.reduce((sum, rating) => sum + rating.directing_rating, 0);
    const totalEntertainmentRatingSum = ratings.reduce((sum, rating) => sum + rating.entertainment_rating, 0);
    const totalRatingSum = ratings.reduce((sum, rating) => sum + rating.total_rating, 0);

    // Tính tổng số lượng đánh giá
    const totalRatingsCount = ratings.length;

    const averageRating = parseFloat((totalRatingSum / totalRatingsCount).toFixed(2));
    const averageContentRating = parseFloat((totalContentRatingSum / totalRatingsCount).toFixed(2));
    const averageActingRating = parseFloat((totalActingRatingSum / totalRatingsCount).toFixed(2));
    const averageVisualEffectsRating = parseFloat((totalVisualEffectsRatingSum / totalRatingsCount).toFixed(2));
    const averageSoundRating = parseFloat((totalSoundRatingSum / totalRatingsCount).toFixed(2));
    const averageDirectingRating = parseFloat((totalDirectingRatingSum / totalRatingsCount).toFixed(2));
    const averageEntertainmentRating = parseFloat((totalEntertainmentRatingSum / totalRatingsCount).toFixed(2));


    // Gửi kết quả về cho client
    return res.status(200).json({
      ratings,
      averageRating,
      totalRatingsCount,
      averageContentRating,
      averageActingRating,
      averageVisualEffectsRating,
      averageSoundRating,
      averageDirectingRating,
      averageEntertainmentRating
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the ratings.' });
  }
};
  
  


  module.exports = {
    addMovieRating,
    getMovieRatings
  };

