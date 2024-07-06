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
    is_expert_rating
  } = req.body;

  try {
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

    const totalRating = (
      content_rating +
      acting_rating +
      visual_effects_rating +
      sound_rating +
      directing_rating +
      entertainment_rating
    ) / 6;

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
        is_expert_rating: is_expert_rating || false, 
      },
    });

    return res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while adding the rating.' });
  }
};


const deleteMovieRating = async (req, res) => {
  const { movie_rating_id } = req.params;

  try {
    const deletedRating = await prisma.movie_rating.delete({
      where: { movie_rating_id: parseInt(movie_rating_id) },
    });

    return res.status(200).json({ message: 'Rating deleted successfully', deletedRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the rating.' });
  }
}



const getMovieRatings = async (req, res) => {
  const { movie_id } = req.params;
  try {
    const movieIdInt = parseInt(movie_id, 10);
    if (isNaN(movieIdInt)) {
      return res.status(400).json({ error: 'Invalid movie_id parameter.' });
    }
    const ratings = await prisma.movie_rating.findMany({
      where: { 
        movie_id: movieIdInt
     
      },
    });
    const userRatings = ratings.filter(rating => !rating.is_expert_rating);
    const expertRatings = ratings.filter(rating => rating.is_expert_rating);
    userRatings.reverse();
    expertRatings.reverse();

    const totalUserContentRatingSum = userRatings.reduce((sum, rating) => sum + rating.content_rating, 0);
    const totalUserActingRatingSum = userRatings.reduce((sum, rating) => sum + rating.acting_rating, 0);
    const totalUserVisualEffectsRatingSum = userRatings.reduce((sum, rating) => sum + rating.visual_effects_rating, 0);
    const totalUserSoundRatingSum = userRatings.reduce((sum, rating) => sum + rating.sound_rating, 0);
    const totalUserDirectingRatingSum = userRatings.reduce((sum, rating) => sum + rating.directing_rating, 0);
    const totalUserEntertainmentRatingSum = userRatings.reduce((sum, rating) => sum + rating.entertainment_rating, 0);
    const totalUserRatingSum = userRatings.reduce((sum, rating) => sum + rating.total_rating, 0);

    const totalUserRatingsCount = userRatings.length;

    const averageUserContentRating = totalUserRatingsCount > 0 ? parseFloat((totalUserContentRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
    const averageUserActingRating = totalUserRatingsCount > 0 ? parseFloat((totalUserActingRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
    const averageUserVisualEffectsRating = totalUserRatingsCount > 0 ? parseFloat((totalUserVisualEffectsRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
    const averageUserSoundRating = totalUserRatingsCount > 0 ? parseFloat((totalUserSoundRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
    const averageUserDirectingRating = totalUserRatingsCount > 0 ? parseFloat((totalUserDirectingRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
    const averageUserEntertainmentRating = totalUserRatingsCount > 0 ? parseFloat((totalUserEntertainmentRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
    const averageUserRating = totalUserRatingsCount > 0 ? parseFloat((totalUserRatingSum / totalUserRatingsCount).toFixed(2)) : 0;

    const totalExpertContentRatingSum = expertRatings.reduce((sum, rating) => sum + rating.content_rating, 0);
    const totalExpertActingRatingSum = expertRatings.reduce((sum, rating) => sum + rating.acting_rating, 0);
    const totalExpertVisualEffectsRatingSum = expertRatings.reduce((sum, rating) => sum + rating.visual_effects_rating, 0);
    const totalExpertSoundRatingSum = expertRatings.reduce((sum, rating) => sum + rating.sound_rating, 0);
    const totalExpertDirectingRatingSum = expertRatings.reduce((sum, rating) => sum + rating.directing_rating, 0);
    const totalExpertEntertainmentRatingSum = expertRatings.reduce((sum, rating) => sum + rating.entertainment_rating, 0);
    const totalExpertRatingSum = expertRatings.reduce((sum, rating) => sum + rating.total_rating, 0);

    const totalExpertRatingsCount = expertRatings.length;

    const averageExpertContentRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertContentRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
    const averageExpertActingRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertActingRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
    const averageExpertVisualEffectsRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertVisualEffectsRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
    const averageExpertSoundRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertSoundRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
    const averageExpertDirectingRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertDirectingRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
    const averageExpertEntertainmentRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertEntertainmentRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
    const averageExpertRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;

    const totalAverageRating = (averageExpertRating + averageUserRating) / 2;
    const totalNumberRating=totalExpertRatingsCount+totalUserRatingsCount;
    return res.status(200).json({
      userRatings,
      expertRatings,
      averageUserContentRating,
      averageUserActingRating,
      averageUserVisualEffectsRating,
      averageUserSoundRating,
      averageUserDirectingRating,
      averageUserEntertainmentRating,
      averageUserRating,
      totalUserRatingsCount,
      averageExpertContentRating,
      averageExpertActingRating,
      averageExpertVisualEffectsRating,
      averageExpertSoundRating,
      averageExpertDirectingRating,
      averageExpertEntertainmentRating,
      averageExpertRating,
      totalExpertRatingsCount,
      totalAverageRating,
      totalNumberRating
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the ratings.' });
  }
};






const getMovieRatingById = async (req, res) => {
  const { movie_rating_id } = req.params;
  try {
    const movieRatingIdInt = parseInt(movie_rating_id, 10);
    if (isNaN(movieRatingIdInt)) {
      return res.status(400).json({ error: 'Invalid movie_rating_id parameter.' });
    }
    const rating = await prisma.movie_rating.findUnique({
      where: { 
        movie_rating_id: movieRatingIdInt
      },
      include: {
        users: true,
        movies: true
      }
    });
    
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found.' });
    }

    return res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the rating.' });
  }
};
  



const getMovieRatingsForAdmin = async (req, res) => {
  try {
    const ratings = await prisma.movie_rating.findMany({
      where: {
        fake_rating: false,
      },
    });

    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving movie ratings.' });
  }
};


const getMoviesWithBayesRating = async (req, res) => {
  const MIN_RATINGS_REQUIRED = 20; 
  try {
    const movies = await prisma.movies.findMany({
      include: {
        movie_rating: true,
      },
    });


    const allRatings = movies.flatMap(movie => movie.movie_rating);
    const globalAverageRating = allRatings.reduce((sum, rating) => sum + rating.total_rating, 0) / allRatings.length || 0;

    const moviesWithBayesRating = movies
      .filter(movie => movie.movie_rating.length > 0) 
      .map(movie => {
        const ratingsCount = movie.movie_rating.length;
        const averageRating = movie.movie_rating.reduce((sum, rating) => sum + rating.total_rating, 0) / ratingsCount || 0;

        const bayesAverageRating = ((ratingsCount * averageRating) + (MIN_RATINGS_REQUIRED * globalAverageRating)) / (ratingsCount + MIN_RATINGS_REQUIRED);

        return {
          movie_id: movie.movie_id,
          name_movie: movie.name_movie,
          ratingsCount,
          averageRating,
          minRatingsRequired: MIN_RATINGS_REQUIRED,
          globalAverageRating,
          bayesAverageRating: parseFloat(bayesAverageRating.toFixed(2)),
        };
      });

    return res.status(200).json(moviesWithBayesRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving movie ratings.' });
  }
};


const toggleMovieRatingLike = async (req, res) => {
  const { movie_rating_id } = req.params;
  let { user_id } = req.body;
  
  // Chuyển đổi user_id thành kiểu Int
  user_id = parseInt(user_id);

  try {
    // Kiểm tra xem người dùng đã thích đánh giá này của người dùng khác chưa
    const existingLike = await prisma.movie_rating_likes.findFirst({
      where: {
        movie_rating_id: parseInt(movie_rating_id),
        user_id,
      },
    });

    if (existingLike) {
      // Nếu đã thích, xóa thích
      await prisma.movie_rating_likes.delete({
        where: {
          like_id: existingLike.like_id,
        },
      });

      return res.status(200).json({ message: 'Đã bỏ thích thành công.' });
    } else {
      await prisma.movie_rating_likes.create({
        data: {
          movie_rating_id: parseInt(movie_rating_id),
          user_id,
        },
      });

      return res.status(200).json({ message: 'Đã thích thành công.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi thực hiện thích/bỏ thích.' });
  }
};

  module.exports = {
    addMovieRating,
    getMovieRatings,
    deleteMovieRating,
    getMovieRatingById,
    getMovieRatingsForAdmin,
    getMoviesWithBayesRating,
    toggleMovieRatingLike
  };

