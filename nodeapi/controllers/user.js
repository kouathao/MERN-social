const _ = require("lodash");
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user; // adds profile object in req with user info
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action",
    });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    // handle errors
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    res.json({ users });
  }).select("name email updated created");
};

//export single user
exports.getUser = (req, res) => {
  // set hased password and salt as undefined
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// update user profile
exports.updateUser = (req, res, next) => {
  let user = req.profile;
  // console.log("Updated User:", user);
  user = _.extend(user, req.body); // extend - mutate the source object
  user.updated = Data.now();
  // save user in db
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    // console.log("user after update with formdata: ", user);
    res.json({ user });
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    res.json({ message: "User deleted!" });
  });
};
