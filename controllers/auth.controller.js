// dependencies
const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

// routes
router.post("/register", async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    // create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    // save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
