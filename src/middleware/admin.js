function admin(req, res, next) {
    
    if (req.user.userRole == 1) {
      next();
    } else {
        return res.status(401).json({
            message : "Not Allow access this Module!!!"
        });
    }
}

module.exports = admin;