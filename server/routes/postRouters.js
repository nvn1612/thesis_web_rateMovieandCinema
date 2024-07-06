const express = require('express');
const { getAllPosts, getMoviePosts, getTheaterPosts, createPost, getCommentCountByPostId,
    getEarliestPosts, getCommentsByPostId, deletePost, deleteComment, getPostById, moderatePost, createComment, getModeratedPostsByUser,
    searchPostsByTitle, getAudPosts, getExpertPosts,getModeratedPosts,getUnmoderatedPosts } = require('../controllers/postControllers');

const router = express.Router();

router.get('/getallposts', getAllPosts);
router.get('/getmovieposts', getMoviePosts);
router.get('/gettheaterposts', getTheaterPosts);
router.post('/createpost', createPost);
router.get('/getcommentcount/:post_id', getCommentCountByPostId);
router.get('/getearliestposts', getEarliestPosts);
router.get('/getcomments/:postId', getCommentsByPostId);
router.delete('/deletepost/:postId', deletePost);
router.delete('/deletecomment/:commentId', deleteComment);
router.get('/getpost/:postId', getPostById);
router.put('/moderatepost/:postId', moderatePost);
router.post('/createcomment', createComment);
router.get('/getmoderatedposts/:userId', getModeratedPostsByUser);
router.get('/searchposts', searchPostsByTitle);
router.get('/getaudposts', getAudPosts);
router.get('/getexpertposts', getExpertPosts);
router.get('/getmoderatedposts', getModeratedPosts);
router.get('/getunmoderatedposts', getUnmoderatedPosts);
module.exports = router;
