const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    loginStatus,
    upgradeUser,
    sendAutomatedEmail,
    sendVerificationEmail,
            } = require('../controllers/userController');
const {
     protect, 
     adminOnly,
     authorOnly,
     } = require('../middleware/authMiddleware');


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/getUser', protect, getUser)
router.patch('/updateUser', protect, updateUser)

router.delete('/:id', protect, adminOnly ,deleteUser )
router.get('/getUsers', protect, authorOnly ,getUsers )
router.get('/loginStatus', loginStatus )
router.post('/upgradeUser', protect, adminOnly ,upgradeUser )
router.post('/sendAutomatedEmail', protect, sendAutomatedEmail )
router.post('/sendVerificationEmail', protect, sendVerificationEmail)



module.exports = router;