const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not Authorszed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payLoad;
    } catch (err) {
        res.status(401).json(err);
    }
    next();
}
module.exports = authentication;
