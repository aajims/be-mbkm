
function mahasiswa(req, res, next) {

    if (req.user.id_role == '3') {
      next();
    } else {
        return res.status(401).json({
            message : "Module Mahasiswa Only !!!"
        });
    }
}

module.exports = mahasiswa;