const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        text: {
            type: String,
        },
        images: {
            type: Array
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
