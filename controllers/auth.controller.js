// dependencies
const router = require("express").Router();
const User = require("../models/user.model");

// routes
router.post("/register", async (req, res) => {
  const user = await new User({
    username: "Jeremiah",
    email: "jeremiahtaylor2021@gmail.com",
    password: "password",
  });

  await user.save();
  res.send("ok");
});

module.exports = router;
