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

    let fake_rating = false;

    if (!is_expert_rating) {
      const expertRatings = await prisma.movie_rating.findMany({
        where: {
          movie_id,
          is_expert_rating: true,
        },
      });

      if (expertRatings.length > 0) {
        const differenceThreshold = 1;

        let isAnyRatingValid = false;

        for (const expertRating of expertRatings) {
          const contentRatingDifference = Math.abs(content_rating - expertRating.content_rating);
          const actingRatingDifference = Math.abs(acting_rating - expertRating.acting_rating);
          const visualEffectsRatingDifference = Math.abs(visual_effects_rating - expertRating.visual_effects_rating);
          const soundRatingDifference = Math.abs(sound_rating - expertRating.sound_rating);
          const directingRatingDifference = Math.abs(directing_rating - expertRating.directing_rating);
          const entertainmentRatingDifference = Math.abs(entertainment_rating - expertRating.entertainment_rating);

          console.log('Đánh giá của Chuyên gia:', expertRating);
          console.log('Đánh giá của Người dùng:', {
            content_rating,
            acting_rating,
            visual_effects_rating,
            sound_rating,
            directing_rating,
            entertainment_rating,
          });
          console.log('Sự khác biệt:', {
            contentRatingDifference,
            actingRatingDifference,
            visualEffectsRatingDifference,
            soundRatingDifference,
            directingRatingDifference,
            entertainmentRatingDifference,
          });

          if (
            contentRatingDifference <= differenceThreshold &&
            actingRatingDifference <= differenceThreshold &&
            visualEffectsRatingDifference <= differenceThreshold &&
            soundRatingDifference <= differenceThreshold &&
            directingRatingDifference <= differenceThreshold &&
            entertainmentRatingDifference <= differenceThreshold
          ) {
            isAnyRatingValid = true;
            break;
          }
        }

        if (!isAnyRatingValid) {
          fake_rating = true;
        }
      }
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
        fake_rating
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
        movie_id: movieIdInt,
        fake_rating: false 
      },
      // include: {
      //   users: true
      // }
    });
    const userRatings = ratings.filter(rating => !rating.is_expert_rating);
    const expertRatings = ratings.filter(rating => rating.is_expert_rating);

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
      totalAverageRating
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the ratings.' });
  }
};


const getFakeOrReportedMovieRatings = async (req, res) => {
  try {
    const ratings = await prisma.movie_rating.findMany({
      where: {
        OR: [
          { fake_rating: true },
          { reported: true }
        ]
      },
    });

    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving fake or reported ratings.' });
  }
};

const updateFakeandReportRating = async (req, res) => {
  const { movie_rating_id } = req.params;

  try {
    const updatedRating = await prisma.movie_rating.update({
      where: { movie_rating_id: parseInt(movie_rating_id) },
      data: { 
        fake_rating: false,
        reported: false,
      },
    });

    return res.status(200).json(updatedRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while updating the rating.' });
  }
};


const reportMovieRating = async (req, res) => {
  const { movie_rating_id } = req.params;

  try {
    const updatedRating = await prisma.movie_rating.update({
      where: { movie_rating_id: parseInt(movie_rating_id) },
      data: { reported: true },
    });

    return res.status(200).json(updatedRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while reporting the rating.' });
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
  
const getLeverMovieRating = async (req, res) => {
  try {
    const movieRatings = await prisma.movie_rating.groupBy({
      by: ['movie_id'],
      _avg: {
        total_rating: true,
      },
      where: {
        fake_rating: false,
        reported: false,
      },
    });

    const highRatedMovieIds = movieRatings
      .filter(movie => movie._avg.total_rating >= 8)
      .map(movie => movie.movie_id);

    const mediumRatedMovieIds = movieRatings
      .filter(movie => movie._avg.total_rating >= 5 && movie._avg.total_rating < 8)
      .map(movie => movie.movie_id);

    const lowRatedMovieIds = movieRatings
      .filter(movie => movie._avg.total_rating < 5)
      .map(movie => movie.movie_id);

    const highRatedMovies = await prisma.movies.findMany({
      where: {
        movie_id: {
          in: highRatedMovieIds,
        },
      },
    });

    const mediumRatedMovies = await prisma.movies.findMany({
      where: {
        movie_id: {
          in: mediumRatedMovieIds,
        },
      },
    });

    const lowRatedMovies = await prisma.movies.findMany({
      where: {
        movie_id: {
          in: lowRatedMovieIds,
        },
      },
    });

    return res.status(200).json({
      highRatedMovies,
      mediumRatedMovies,
      lowRatedMovies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the movie ratings.' });
  }
};

const deleteMovieRatingAndIncreaseSuspicion = async (req, res) => {
  const { movie_rating_id } = req.params;

  try {
    const deletedRating = await prisma.movie_rating.delete({
      where: { movie_rating_id: parseInt(movie_rating_id) },
    });

    await prisma.users.update({
      where: { user_id: deletedRating.user_id },
      data: { suspicion_level: { increment: 1 } },
    });

    return res.status(200).json({ message: 'Rating deleted successfully and suspicion level increased', deletedRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the rating and updating suspicion level.' });
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


  module.exports = {
    addMovieRating,
    getMovieRatings,
    deleteMovieRating,
    getFakeOrReportedMovieRatings,
    updateFakeandReportRating,
    reportMovieRating,
    getMovieRatingById,
    getLeverMovieRating,
    deleteMovieRatingAndIncreaseSuspicion,
    getMovieRatingsForAdmin
  };

