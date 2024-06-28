const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uploadPostImage } = require('../uploadMiddleware');

const getAllPosts = async (req, res) => {
    try {
      const posts = await prisma.posts.findMany();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve posts' });
    }
  };

  const getMoviePosts = async (req, res) => {
    try {
      const moviePosts = await prisma.posts.findMany({
        where: {
            is_movie_related: true, 
        },
      });
      res.json(moviePosts);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve movie posts' });
    }
  };

  const getTheaterPosts = async (req, res) => {
    try {
      const theaterPosts = await prisma.posts.findMany({
        where: {
            is_movie_related: false, 
        },
      });
      res.json(theaterPosts);
    } catch (error) {
      res.status(500).json({ error: 'Could not retrieve theater posts' });
    }
  };

  const createPost = async (req, res) => {
    uploadPostImage(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'Error uploading files.' });
      }
  
      const { user_id, content, is_movie_related } = req.body;
      const imagePostPath = req.file ? req.file.path : null;
  
      try {
        const newPost = await prisma.posts.create({
          data: {
            user_id: user_id ? parseInt(user_id) : null,
            content,
            image_post: imagePostPath,
            is_movie_related: is_movie_related === 'true',
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
  
        res.status(201).json(newPost);
      } catch (error) {
        console.log(error);
  
        if (imagePostPath) {
          fs.unlinkSync(imagePostPath);
          console.log(`Deleted file: ${imagePostPath}`);
        }
  
        res.status(500).json({ error: 'Có lỗi xảy ra' });
      }
    });
  };

  

  const getCommentCountByPostId = async (req, res) => {
    const { post_id } = req.params;
    try {
        const count = await prisma.post_comments.count({
            where: { post_id: parseInt(post_id) },
        });
        res.json({ count });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Could not retrieve comment count' });
    }
};

const getLikeCountByPostId = async (req, res) => {
  const { post_id } = req.params;
  try {
      const count = await prisma.post_likes.count({
          where: { post_id: parseInt(post_id) },
      });
      res.json({ count });
  } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Could not retrieve like count' });
  }
}

const getEarliestPosts = async (req, res) => {
  try {
    const earliestPosts = await prisma.posts.findMany({
      orderBy: {
        created_at: 'asc',
      },
      take: 3,
    });
    res.json(earliestPosts);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve earliest posts' });
  }
};

module.exports = {
    getAllPosts,
    getMoviePosts,
    getTheaterPosts,
    createPost,
    getCommentCountByPostId,
    getLikeCountByPostId,
    getEarliestPosts,
};