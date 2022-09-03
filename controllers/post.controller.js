const router = require("express").Router();

const Post = require("../models/post.model");

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("Can only delete posts you've made");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// like/ unlike post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Liked post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Unliked post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get post

// get timeline posts

module.exports = router;
