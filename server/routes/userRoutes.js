const express = require('express');
const { registerUser,activateUser,loginUser,forgotPassword,getUsers,getUser,createUser,deleteUser, updateUser,
    getUserRatings,resetPassword,searchUsersByUsername,getUnactiveUsers,getActiveUsers,getExpert,getAudience,getAdmin
 } = require('../controllers/userControllers');

const router = express.Router();

router.post('/register', registerUser);
router.get('/activate/:token', activateUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/getalluser', getUsers);
router.get('/getuser/:user_id', getUser);
router.post('/createuser', createUser); 
router.delete('/deleteuser/:id', deleteUser);
router.put('/updateuser/:user_id', updateUser);
router.get('/user-ratings/:user_id', getUserRatings);
router.get('/user-search', searchUsersByUsername);
router.get('/user-active',getActiveUsers);
router.get('/user-unactive',getUnactiveUsers);
router.get('/user-expert',getExpert);
router.get('/user-audience',getAudience);
router.get('/user-admin',getAdmin)

module.exports = router;