function adminMiddleware(req, res, next){

    try{

        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Access Denied! Only Admins can perform this action"
            });
        }

        next();

    } catch(err) {

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });

    }
}

module.exports = adminMiddleware;