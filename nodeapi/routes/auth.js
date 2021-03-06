const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);

router.post("/signin", signin);

router.get("/signout", signout);

// get data from userID then make query to db and append to request object
// any route container :userId, our app will first exuect userById()
router.param("userId", userById);

module.exports = router;
