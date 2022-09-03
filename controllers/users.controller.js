// dependencies
const router = require("express").Router();

// routes
router.get("/", (req, res) => {
  res.send("user route");
});

module.exports = router;
