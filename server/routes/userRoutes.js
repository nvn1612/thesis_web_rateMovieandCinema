const express = require('express');
const { registerUser,activateUser,loginUser,forgotPassword,getUsers,getUser,createUser,deleteUser, updateUser } = require('../controllers/userControllers');

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

module.exports = router;