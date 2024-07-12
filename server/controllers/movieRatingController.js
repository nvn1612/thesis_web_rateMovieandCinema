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
  const blacklist = ["ngu", "dốt"];
  const MIN_WORD_COUNT = 3;
  const containsBlacklistedWords = (text) => {
    return blacklist.some(word => text.toLowerCase().includes(word));
  };

  const hasMinimumRating = (ratings) => {
    return ratings.every(rating => rating >= 1);
  };
  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };
  if (containsBlacklistedWords(comment)) {
    return res.status(400).json({ error_code: 'BLACKLISTED_WORDS' });
  }
  if (countWords(comment) < MIN_WORD_COUNT) {
    return res.status(400).json({ error_code: 'COMMENT_TOO_SHORT' });
  }

  if (!hasMinimumRating([
    content_rating,
    acting_rating,
    visual_effects_rating,
    sound_rating,
    directing_rating,
    entertainment_rating
  ])) {
    return res.status(400).json({ error_code: 'MINIMUM_RATING_REQUIRED' });
  }

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
      return res.status(400).json({ error_code: 'ALREADY_RATED' });
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
    return res.status(500).json({ error: 'Có lỗi trong quá trình thực hiện đánh giá !.' });
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
      include: {
        movie_rating_likes: {
          select: {
            like_id: true,
          }
        }
      }
    });

  
    const userRatings = ratings.filter(rating => !rating.is_expert_rating);
    userRatings.sort((a, b) => {
      const likeCountA = a.movie_rating_likes.length;
      const likeCountB = b.movie_rating_likes.length;
      return likeCountB - likeCountA;
    });
    const expertRatings = ratings.filter(rating => rating.is_expert_rating);
    
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
  const { movie_id } = req.params; 

  if (!movie_id) {
    return res.status(400).json({ error: 'movie_id is required' });
  }

  try {
    const ratings = await prisma.movie_rating.findMany({
      where: {
        movie_id: parseInt(movie_id), 
      },
      include: {
        users: true, 
        movies: true 
      }
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

const getMovieBayesRatingById = async (req, res) => {
  const MIN_RATINGS_REQUIRED = 20; 
  const { movie_id } = req.params;
  
  try {
    const movie = await prisma.movies.findUnique({
      where: { movie_id: parseInt(movie_id) },
      include: {
        movie_rating: true,
      },
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    const allRatings = await prisma.movie_rating.findMany();
    const globalAverageRating = allRatings.reduce((sum, rating) => sum + rating.total_rating, 0) / allRatings.length || 0;

    const ratingsCount = movie.movie_rating.length;
    const averageRating = movie.movie_rating.reduce((sum, rating) => sum + rating.total_rating, 0) / ratingsCount || 0;

    const bayesAverageRating = ((ratingsCount * averageRating) + (MIN_RATINGS_REQUIRED * globalAverageRating)) / (ratingsCount + MIN_RATINGS_REQUIRED);

    return res.status(200).json({
      bayesAverageRating: parseFloat(bayesAverageRating.toFixed(2)),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the movie rating.' });
  }
};


const toggleMovieRatingLike = async (req, res) => {
  const { movie_rating_id } = req.params;
  let { user_id } = req.body;
  

  user_id = parseInt(user_id);

  try {

    const existingLike = await prisma.movie_rating_likes.findFirst({
      where: {
        movie_rating_id: parseInt(movie_rating_id),
        user_id,
      },
    });

    if (existingLike) {
     
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

const checkMovieRatingLike = async (req, res) => {
  const { movie_rating_id } = req.params;
  const { user_id } = req.query;
  
  try {
    const existingLike = await prisma.movie_rating_likes.findFirst({
      where: {
        movie_rating_id: parseInt(movie_rating_id),
        user_id: parseInt(user_id),
      },
    });

    res.status(200).json({ isLiked: !!existingLike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi kiểm tra trạng thái thích.' });
  }
};

const getMovieRatingLikeCount = async (req, res) => {
  const { movie_rating_id } = req.params;

  try {
    const likeCount = await prisma.movie_rating_likes.count({
      where: {
        movie_rating_id: parseInt(movie_rating_id, 10),
      },
    });

    return res.status(200).json({ likeCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the like count.' });
  }
};
const getTotalMovieRatings = async (req, res) => {
  try {
    const totalMovieRatings = await prisma.movie_rating.count();
    res.status(200).json({ totalMovieRatings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the total number of movie ratings.' });
  }
}

const searchMovieRatingsByUsername = async (req, res) => {
  const { username } = req.query;

  try {
    const users = await prisma.users.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        user_id: true,
        username: true,
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found with the given username.' });
    }

    const userIds = users.map(user => user.user_id);

    const ratings = await prisma.movie_rating.findMany({
      where: {
        user_id: {
          in: userIds,
        },
      },
      include: {
        users: true,
        movies: true,
      },
    });

    return res.status(200).json(ratings);
  } catch (error) {
    console.error('Error searching movie ratings by username:', error);
    return res.status(500).json({ error: 'An error occurred while searching for movie ratings.' });
  }
};

const getExpertRatings = async (req, res) => {
  const { movie_id } = req.params;
  if (!movie_id) {
    return res.status(400).json({ error: 'movie_id is required' });
  }
  try {
    const expertRatings = await prisma.movie_rating.findMany({
      where: {
        movie_id: parseInt(movie_id),
        is_expert_rating: true
      },
      include: {
        users: true, 
      },
    });

    return res.status(200).json(expertRatings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving expert ratings' });
  }
};

const getAudiRatings = async (req, res) => {
  const { movie_id } = req.params;
  if (!movie_id) {
    return res.status(400).json({ error: 'movie_id is required' });
  }
  try {
    const expertRatings = await prisma.movie_rating.findMany({
      where: {
        movie_id: parseInt(movie_id),
        is_expert_rating: false
      },
      include: {
        users: true, 
      },
    });

    return res.status(200).json(expertRatings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving expert ratings' });
  }
};
  module.exports = {
    addMovieRating,
    getMovieRatings,
    deleteMovieRating,
    getMovieRatingById,
    getMovieRatingsForAdmin,
    getMoviesWithBayesRating,
    toggleMovieRatingLike,
    checkMovieRatingLike,
    getMovieRatingLikeCount,
    getTotalMovieRatings,
    searchMovieRatingsByUsername,
    getExpertRatings,
    getAudiRatings,
    getMovieBayesRatingById
  };

