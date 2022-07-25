const userController = require('../controllers/userController');

const router = require('express').Router();

//REGISTER (ADD A USER)
router.post('/register', userController.registerUser);

//LOGIN
router.post('/login', userController.loginUser);

// GET ALL USERS
router.get("/", userController.getAllUsers);

//GET A USER
router.get("/:id", userController.getAUser);

//UPDATE A USER
router.put("/:id", userController.updateUser);

//DELETE A USER
router.delete("/:id", userController.deleteUser);


module.exports = router;