const express = require('express');
const { getAllPosts,getMoviePosts,getTheaterPosts,createPost,getCommentsByPostId,} = require('../controllers/postControllers');
const router = express.Router();

router.get('/getallposts',getAllPosts);
router.get('/getmovieposts',getMoviePosts);
router.get('/gettheaterposts',getTheaterPosts);
router.post('/createpost',createPost);
// router.post('/addcomment',addComment);
router.get('/getcommentsbypostid/:post_id',getCommentsByPostId);
module.exports = router;