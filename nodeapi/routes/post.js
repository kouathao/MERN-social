const express = require("express");
const {
  getPosts,
  createPosts,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
} = require("../controllers/post");
const { userById } = require("../controllers/user");

const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPosts,
  createPostValidator
);

router.get("/posts/by/:userId", requireSignin, postsByUser);

// update
router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// get data from userID then make query to db and append to request object
// any route container :userId, our app will first exuect userById()
router.param("userId", userById);
// any route container :userId, our app will first exuect postById()
router.param("postId", postById);

module.exports = router;
