const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
require("./helpers/MDB");

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.get("/", (req, res) => res.send("Server"));
const auth = require("./routes/auth");
const post = require("./routes/post");
const authentication = require("./middleware/authMiddleware")

app.use("/auth/", auth);
app.use("/post/", authentication, post);

app.listen(process.env.PORT || 8000, () => console.log("Server Running"));
