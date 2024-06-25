const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const addMovieRating = async (req, res) => {
//   const {
//     user_id,
//     movie_id,
//     content_rating,
//     acting_rating,
//     visual_effects_rating,
//     sound_rating,
//     directing_rating,
//     entertainment_rating,
//     comment,
//     is_expert_rating  // Thêm trường này để xác định loại đánh giá
//   } = req.body;

//   try {
//     // Kiểm tra xem người dùng đã đánh giá phim này chưa
//     const existingRating = await prisma.movie_rating.findUnique({
//       where: {
//         user_id_movie_id: {
//           user_id,
//           movie_id,
//         },
//       },
//     });

//     if (existingRating) {
//       return res.status(400).json({ error: 'User has already rated this movie.' });
//     }

//     // Tính toán total_rating
//     const totalRating = (
//       content_rating +
//       acting_rating +
//       visual_effects_rating +
//       sound_rating +
//       directing_rating +
//       entertainment_rating
//     ) / 6;

//     // Thêm đánh giá mới
//     const newRating = await prisma.movie_rating.create({
//       data: {
//         user_id,
//         movie_id,
//         content_rating,
//         acting_rating,
//         visual_effects_rating,
//         sound_rating,
//         directing_rating,
//         entertainment_rating,
//         total_rating: totalRating, 
//         comment,
//         is_expert_rating: is_expert_rating || false  // Đặt giá trị của is_expert_rating dựa vào input từ người dùng
//       },
//     });

//     return res.status(201).json(newRating);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while adding the rating.' });
//   }
// };



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
    is_expert_rating  // Thêm trường này để xác định loại đánh giá
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

    // Nếu is_expert_rating là false thì mới kiểm tra đánh giá
    if (!is_expert_rating) {
      // Lấy đánh giá của chuyên gia cho phim này
      const expertRatings = await prisma.movie_rating.findMany({
        where: {
          movie_id,
          is_expert_rating: true,
        },
      });

      // Kiểm tra xem có đánh giá của chuyên gia hay không
      if (expertRatings.length > 0) {
        const differenceThreshold = 1; // Ngưỡng chênh lệch cho phép
      
        let isAnyRatingValid = false; // Biến cờ để xác định xem có ít nhất một đánh giá hợp lệ hay không
      
        // So sánh đánh giá của người dùng với đánh giá của chuyên gia
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

          // Kiểm tra nếu tất cả sự chênh lệch đều nhỏ hơn hoặc bằng ngưỡng cho phép
          if (
            contentRatingDifference <= differenceThreshold &&
            actingRatingDifference <= differenceThreshold &&
            visualEffectsRatingDifference <= differenceThreshold &&
            soundRatingDifference <= differenceThreshold &&
            directingRatingDifference <= differenceThreshold &&
            entertainmentRatingDifference <= differenceThreshold
          ) {
            isAnyRatingValid = true; // Đánh giá hợp lệ
            break; // Không cần kiểm tra thêm nếu đã tìm thấy đánh giá hợp lệ
          }
        }
      
        // Nếu không có đánh giá nào hợp lệ, trả về lỗi
        if (!isAnyRatingValid) {
          return res.status(400).json({ error: 'Người dùng có dấu hiệu đánh giá giả mạo !' });
        }
      }
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
        is_expert_rating: is_expert_rating || false  // Đặt giá trị của is_expert_rating dựa vào input từ người dùng
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
    const movieIdInt = parseInt(movie_id, 10);
    if (isNaN(movieIdInt)) {
      return res.status(400).json({ error: 'Invalid movie_id parameter.' });
    }
    const ratings = await prisma.movie_rating.findMany({
      where: { movie_id: movieIdInt },
      include: {
        users: true
      }
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

