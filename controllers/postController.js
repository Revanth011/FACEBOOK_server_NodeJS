const Post = require("../models/Post");
const fs = require("fs");
require("dotenv").config();
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const createPost = async (req, res) => {
    try {
        const images = [];
        if (req.files) {
            const file = Object.values(req.files).flat();
            if (file.length > 1) return res.json({ message: "maximum file upload:1" });
            await cloudinary.v2.uploader.upload(file[0].tempFilePath, (err, result) => {
                if (err) {
                    return res.json({ message: err, status: 501 })
                }
                else {
                    images.push(result.secure_url);
                }
                fs.unlink(file[0].tempFilePath, (err) => { if (err) { console.log(err) } });
            });
        }
        const createdBy = req.user._id;
        const post = await Post.create({ text: req.body.text, images, createdBy });
        res.json({ post, status: 200 });
    } catch (err) {
        res.json({ message: err, status: 501 })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.user._id }).sort("-createdAt");
        res.json({ posts, status: 200 });
    } catch (err) {
        res.json({ message: err, status: 501 })
    }
}

module.exports = {
    createPost,
    getAllPosts
}