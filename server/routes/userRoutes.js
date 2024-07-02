const express = require('express');
const { registerUser,activateUser,loginUser,forgotPassword,getUsers,getUser,createUser,deleteUser, updateUser,getSuspiciousUsers,
    getUserRatings
 } = require('../controllers/userControllers');

const router = express.Router();

router.post('/register', registerUser);
router.get('/activate/:token', activateUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

router.get('/getalluser', getUsers);
router.get('/getuser/:user_id', getUser);
router.post('/createuser', createUser); 
router.delete('/deleteuser/:id', deleteUser);
router.put('/updateuser/:user_id', updateUser);
router.get('/suspicious-users', getSuspiciousUsers)
router.get('/user-ratings/:user_id', getUserRatings);
module.exports = router;