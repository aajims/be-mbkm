const logRequest = (req, res, next) => {
    console.log('route log request ke url : ', req.path);
    next();
}

module.exports = logRequest;