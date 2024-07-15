const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { uploadPostImage } = require('../uploadMiddleware');

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        users: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve posts' });
  }
};

const searchPostsByTitle = async (req, res) => {
  const { title } = req.query;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        users: true,
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not search posts' });
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

const getExpertPosts = async (req, res) => {
  try {
    const expertPosts = await prisma.posts.findMany({
      where: {
        is_expert_post: true,
      },
      include: {
        users: true,
      },
    });
    res.json(expertPosts);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve expert posts' });
  }
};

const getAudPosts = async (req, res) => {
  try {
    const expertPosts = await prisma.posts.findMany({
      where: {
        is_expert_post: false,
      },
      include: {
        users: true,
      },
    });
    res.json(expertPosts);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve expert posts' });
  }
};

const createPost = async (req, res) => {
  uploadPostImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { user_id, title, content, is_movie_related, is_expert } = req.body;
    const imagePostPath = req.file ? req.file.path : null;

    try {

      const newPost = await prisma.posts.create({
        data: {
          user_id: user_id ? parseInt(user_id) : null,
          title,
          content,
          image_post: imagePostPath,
          is_movie_related: is_movie_related === 'true',
          is_expert_post: is_expert === 'true',
          is_moderated: false,
          created_at: new Date(),
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

const getEarliestPosts = async (req, res) => {
  try {
    const earliestPosts = await prisma.posts.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 3,
    });
    res.json(earliestPosts);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve earliest posts' });
  }
};

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.post_comments.findMany({
      where: { post_id: Number(postId) },
      include: {
        users: true,
      },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve comments' });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.posts.findUnique({
      where: { post_id: Number(postId) },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const deletedPost = await prisma.posts.delete({
      where: { post_id: Number(postId) },
    });

    if (post.image_post) {
      fs.unlinkSync(post.image_post);
      console.log(`Deleted file: ${post.image_post}`);
    }

    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete post' });
  }
};


const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const deletedComment = await prisma.post_comments.delete({
      where: { comment_id: Number(commentId) },
    });
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete comment' });
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.posts.findUnique({
      where: { post_id: Number(postId) },
      include: {
        users: true,
        post_comments: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve post' });
  }
};

const moderatePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const updatedPost = await prisma.posts.update({
      where: { post_id: Number(postId) },
      data: {
        is_moderated: true,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Could not moderate post' });
  }
};

const createComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  try {
    const existingPost = await prisma.posts.findUnique({
      where: { post_id: Number(postId) },
    });

    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const existingUser = await prisma.users.findUnique({
      where: { user_id: Number(userId) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newComment = await prisma.post_comments.create({
      data: {
        post_id: Number(postId),
        user_id: Number(userId),
        content,
        created_at: new Date(),
      },
      include: {
        users: true,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create comment' });
  }
};

const getModeratedPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        user_id: Number(userId),
        is_moderated: true,
      },
      include: {
        users: true,
      },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve moderated posts' });
  }
};

const getModeratedPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      where: {
        is_moderated: true,
      },
      include: {
        users: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve moderated posts' });
  }
};

const getUnmoderatedPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      where: {
        is_moderated: false,
      },
      include: {
        users: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve unmoderated posts' });
  }
};
const getTotalPosts = async (req, res) => {
  try {
    const totalPosts = await prisma.posts.count();
    res.status(200).json({ totalPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the total number of posts.' });
  }
}

module.exports = {
  getAllPosts,
  getMoviePosts,
  getTheaterPosts,
  getExpertPosts, 
  createPost,
  getCommentCountByPostId,
  getEarliestPosts,
  getCommentsByPostId,
  deletePost,
  deleteComment,
  getPostById,
  moderatePost,
  createComment,
  getModeratedPostsByUser,
  searchPostsByTitle,
  getAudPosts,
  getModeratedPosts,
  getUnmoderatedPosts,
  getTotalPosts
}
