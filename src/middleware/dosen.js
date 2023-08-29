function dosen(req, res, next) {

    if (req.user.userRole == 2) {
      next();
    } else {
        return res.status(401).json({
            message : "Module Dosen Only !!!"
        });
    }
}

module.exports = dosen;