const express = require('express');
const { getAllPosts,getMoviePosts,getTheaterPosts,createPost,getCommentCountByPostId,
    getLikeCountByPostId,getEarliestPosts

}

= require('../controllers/postControllers');
const router = express.Router();

router.get('/getallposts',getAllPosts);
router.get('/getmovieposts',getMoviePosts);
router.get('/gettheaterposts',getTheaterPosts);
router.post('/createpost',createPost);
router.get('/getcommentcount/:post_id',getCommentCountByPostId);
router.get('/getlikecount/:post_id',getLikeCountByPostId);
router.get('/getearliestposts',getEarliestPosts);
module.exports = router;