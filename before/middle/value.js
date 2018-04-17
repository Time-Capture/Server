exports.check_user = (req, res, next) => {
    if (!req.body.id && !req.body.password) {
        res.status(401).end();
    } else {
        next();
    }
}
exports.check_token = (req, res, next) => {
    if (!req.body.token) {
        res.status(401).end();
    } else {
        next();
    }
}