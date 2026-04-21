const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).json({ message: "No token provided" });
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();
    }
    catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}