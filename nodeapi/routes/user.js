const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/users", allUsers);

router.get("/user/:userId", requireSignin, getUser);
// update profile
router.put("/user/:userId", requireSignin, updateUser);
// delete user
router.delete("/user/:userId", requireSignin, deleteUser);

// get data from userID then make query to db and append to request object
// any route container :userId, our app will first exuect userById()
router.param("userId", userById);

module.exports = router;
