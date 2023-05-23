const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatarUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatarUser);
module.exports = router;
