const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addTheaterRating = async (req, res) => {
  const {
    user_id,
    theater_id,
    image_quality_rating,
    sound_quality_rating,
    seating_rating,
    theater_space_rating,
    customer_service_rating,
    ticket_price_rating,
    comment,
    is_expert_rating
  } = req.body;
  const blacklist = ["ngu", "dốt"];
  const containsBlacklistedWords = (text) => {
    return blacklist.some(word => text.toLowerCase().includes(word));
  };

  const hasMinimumRating = (ratings) => {
    return ratings.every(rating => rating >= 1);
  };

  if (containsBlacklistedWords(comment)) {
    return res.status(400).json({ error_code: 'BLACKLISTED_WORDS' });
  }

  if (!hasMinimumRating([
    image_quality_rating,
    sound_quality_rating,
    seating_rating,
    theater_space_rating,
    customer_service_rating,
    ticket_price_rating
  ])) {
    return res.status(400).json({ error_code: 'MINIMUM_RATING_REQUIRED' });
  }
  try {
    const existingRating = await prisma.theater_rating.findUnique({
      where: {
        user_id_theater_id: {
          user_id,
          theater_id,
        },
      },
    });

    if (existingRating) {
      return res.status(400).json({ error_code: 'ALREADY_RATED' });
    }

    const totalRating = (
      image_quality_rating +
      sound_quality_rating +
      seating_rating +
      theater_space_rating +
      customer_service_rating +
      ticket_price_rating
    ) / 6;

    const newRating = await prisma.theater_rating.create({
      data: {
        user_id,
        theater_id,
        image_quality_rating,
        sound_quality_rating,
        seating_rating,
        theater_space_rating,
        customer_service_rating,
        ticket_price_rating,
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

const deleteTheaterRating = async (req, res) => {
  const { theater_rating_id } = req.params;

  try {
    const deletedRating = await prisma.theater_rating.delete({
      where: { theater_rating_id: parseInt(theater_rating_id) },
    });

    return res.status(200).json({ message: 'Rating deleted successfully', deletedRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the rating.' });
  }
};


const getTheaterRatings = async (req, res) => {
    const { theater_id } = req.params;
    try {
      const theaterIdInt = parseInt(theater_id, 10);
      if (isNaN(theaterIdInt)) {
        return res.status(400).json({ error: 'Invalid theater_id parameter.' });
      }
      
      const ratings = await prisma.theater_rating.findMany({
        where: { theater_id: theaterIdInt
         },
        
      });
  
  
      const userRatings = ratings.filter(rating => !rating.is_expert_rating);
      const expertRatings = ratings.filter(rating => rating.is_expert_rating);

      userRatings.reverse();
      expertRatings.reverse();
  
      const totalUserImageQualityRatingSum = userRatings.reduce((sum, rating) => sum + rating.image_quality_rating, 0);
      const totalUserSoundQualityRatingSum = userRatings.reduce((sum, rating) => sum + rating.sound_quality_rating, 0);
      const totalUserSeatingRatingSum = userRatings.reduce((sum, rating) => sum + rating.seating_rating, 0);
      const totalUserTheaterSpaceRatingSum = userRatings.reduce((sum, rating) => sum + rating.theater_space_rating, 0);
      const totalUserCustomerServiceRatingSum = userRatings.reduce((sum, rating) => sum + rating.customer_service_rating, 0);
      const totalUserTicketPriceRatingSum = userRatings.reduce((sum, rating) => sum + rating.ticket_price_rating, 0);
      const totalUserRatingSum = userRatings.reduce((sum, rating) => sum + rating.total_rating, 0);
  
      const totalUserRatingsCount = userRatings.length;
  
      const averageUserImageQualityRating = totalUserRatingsCount > 0 ? parseFloat((totalUserImageQualityRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
      const averageUserSoundQualityRating = totalUserRatingsCount > 0 ? parseFloat((totalUserSoundQualityRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
      const averageUserSeatingRating = totalUserRatingsCount > 0 ? parseFloat((totalUserSeatingRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
      const averageUserTheaterSpaceRating = totalUserRatingsCount > 0 ? parseFloat((totalUserTheaterSpaceRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
      const averageUserCustomerServiceRating = totalUserRatingsCount > 0 ? parseFloat((totalUserCustomerServiceRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
      const averageUserTicketPriceRating = totalUserRatingsCount > 0 ? parseFloat((totalUserTicketPriceRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
      const averageUserRating = totalUserRatingsCount > 0 ? parseFloat((totalUserRatingSum / totalUserRatingsCount).toFixed(2)) : 0;
  
      const totalExpertImageQualityRatingSum = expertRatings.reduce((sum, rating) => sum + rating.image_quality_rating, 0);
      const totalExpertSoundQualityRatingSum = expertRatings.reduce((sum, rating) => sum + rating.sound_quality_rating, 0);
      const totalExpertSeatingRatingSum = expertRatings.reduce((sum, rating) => sum + rating.seating_rating, 0);
      const totalExpertTheaterSpaceRatingSum = expertRatings.reduce((sum, rating) => sum + rating.theater_space_rating, 0);
      const totalExpertCustomerServiceRatingSum = expertRatings.reduce((sum, rating) => sum + rating.customer_service_rating, 0);
      const totalExpertTicketPriceRatingSum = expertRatings.reduce((sum, rating) => sum + rating.ticket_price_rating, 0);
      const totalExpertRatingSum = expertRatings.reduce((sum, rating) => sum + rating.total_rating, 0);
  
      const totalExpertRatingsCount = expertRatings.length;
  
      const averageExpertImageQualityRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertImageQualityRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
      const averageExpertSoundQualityRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertSoundQualityRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
      const averageExpertSeatingRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertSeatingRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
      const averageExpertTheaterSpaceRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertTheaterSpaceRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
      const averageExpertCustomerServiceRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertCustomerServiceRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
      const averageExpertTicketPriceRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertTicketPriceRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;
      const averageExpertRating = totalExpertRatingsCount > 0 ? parseFloat((totalExpertRatingSum / totalExpertRatingsCount).toFixed(2)) : 0;

      const totalAverageRating = (averageExpertRating + averageUserRating) / 2;
      const totalNumberRating= totalExpertRatingsCount + totalUserRatingsCount;
      return res.status(200).json({
        userRatings,
        expertRatings,
        averageUserImageQualityRating,
        averageUserSoundQualityRating,
        averageUserSeatingRating,
        averageUserTheaterSpaceRating,
        averageUserCustomerServiceRating,
        averageUserTicketPriceRating,
        averageUserRating,
        totalUserRatingsCount,
        averageExpertImageQualityRating,
        averageExpertSoundQualityRating,
        averageExpertSeatingRating,
        averageExpertTheaterSpaceRating,
        averageExpertCustomerServiceRating,
        averageExpertTicketPriceRating,
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

  const getTheaterRatingById = async (req, res) => {
    const { theater_rating_id } = req.params;
    try {
      const theaterRatingIdInt = parseInt(theater_rating_id, 10);
      if (isNaN(theaterRatingIdInt)) {
        return res.status(400).json({ error: 'Invalid theater_rating_id parameter.' });
      }
      const rating = await prisma.theater_rating.findUnique({
        where: { 
          theater_rating_id: theaterRatingIdInt
        },
        include: {
          users: true,
          movie_theaters: true
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
  
  const getTheaterRatingsForAdmin = async (req, res) => {
    try {
      const ratings = await prisma.theater_rating.findMany();
  
      return res.status(200).json(ratings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving theater ratings.' });
    }
  }
  

 
  

  const getTheatersWithBayesRating = async (req, res) => {
    const MIN_RATINGS_REQUIRED = 20;
    try {
      const theaters = await prisma.movie_theaters.findMany({
        include: {
          theater_rating: true,
        },
      });
  
      const allRatings = theaters.flatMap(theater => theater.theater_rating);
      const globalAverageRating = allRatings.reduce((sum, rating) => sum + rating.total_rating, 0) / allRatings.length || 0;
  
      const theatersWithBayesRating = theaters
        .filter(theater => theater.theater_rating.length > 0)
        .map(theater => {
          const ratingsCount = theater.theater_rating.length;
          const averageRating = theater.theater_rating.reduce((sum, rating) => sum + rating.total_rating, 0) / ratingsCount || 0;
  
          const bayesAverageRating = ((ratingsCount * averageRating) + (MIN_RATINGS_REQUIRED * globalAverageRating)) / (ratingsCount + MIN_RATINGS_REQUIRED);
  
          return {
            theater_id: theater.theater_id,
            theater_name: theater.theater_name,
            ratingsCount,
            averageRating,
            minRatingsRequired: MIN_RATINGS_REQUIRED,
            globalAverageRating,
            bayesAverageRating: parseFloat(bayesAverageRating.toFixed(2)),
          };
        });
  
      return res.status(200).json(theatersWithBayesRating);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving theater ratings.' });
    }
  };
 
  const toggleTheaterRatingLike = async (req, res) => {
    const { theater_rating_id } = req.params;
    let { user_id } = req.body;
  
    user_id = parseInt(user_id);
  
    try {
      const existingLike = await prisma.theater_rating_likes.findFirst({
        where: {
          theater_rating_id: parseInt(theater_rating_id),
          user_id,
        },
      });
  
      if (existingLike) {
        await prisma.theater_rating_likes.delete({
          where: {
            like_id: existingLike.like_id,
          },
        });
  
        return res.status(200).json({ message: 'Đã bỏ thích thành công.' });
      } else {
        await prisma.theater_rating_likes.create({
          data: {
            theater_rating_id: parseInt(theater_rating_id),
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
  
  const checkTheaterRatingLike = async (req, res) => {
    const { theater_rating_id } = req.params;
    const { user_id } = req.query;
  
    try {
      const existingLike = await prisma.theater_rating_likes.findFirst({
        where: {
          theater_rating_id: parseInt(theater_rating_id),
          user_id: parseInt(user_id),
        },
      });
  
      res.status(200).json({ isLiked: !!existingLike });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi kiểm tra trạng thái thích.' });
    }
  };
  
  const getTheaterRatingLikeCount = async (req, res) => {
    const { theater_rating_id } = req.params;
  
    try {
      const likeCount = await prisma.theater_rating_likes.count({
        where: {
          theater_rating_id: parseInt(theater_rating_id, 10),
        },
      });
  
      return res.status(200).json({ likeCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy số lượng thích.' });
    }
  };

  

  
module.exports = {
  addTheaterRating,
  getTheaterRatings,
  deleteTheaterRating,
  getTheaterRatingById,
  getTheaterRatingsForAdmin,
  getTheatersWithBayesRating,
  getTheaterRatingLikeCount,
  toggleTheaterRatingLike,
  checkTheaterRatingLike
};
