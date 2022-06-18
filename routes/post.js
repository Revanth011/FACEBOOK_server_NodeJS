const express = require("express");
const router = express.Router();
const {
    createPost,
    getAllPosts
} = require("../controllers/postController");

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);

module.exports = router;
