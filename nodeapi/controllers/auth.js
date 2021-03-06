const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");

exports.signup = async (req, res) => {
  // check user
  const userExists = await User.findOne({
    email: req.body.email,
  });
  if (userExists)
    return res.status(403).json({
      error: "Email is taken!",
    });
  // create new user
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Signup Success!" });
};

exports.signin = (req, res) => {
  // find the user based on email
  const { _id, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    // if error or no user
    if (err || !user) {
      return res.status(404).json({
        error: "User with that email does not exist",
      });
    }
    // if use is found make sure email and password match
    // create authicate method in model and use here
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    // generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persis the token as 't' in cookie with expire date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client

    const { _id, name, email } = user;

    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    message: "Signout success!",
  });
};

exports.requireSignin = expressJwt({
  // if the token is valid, then express jwt appends the verififed user id in an auth key to the request object
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});
