const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    try {

        const token =
            req.cookies.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({
                message: "Unauthorized Access!"
            });

        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decodedToken;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid or expired token",
            error: err.message
        });

    }
}

module.exports = authMiddleware;