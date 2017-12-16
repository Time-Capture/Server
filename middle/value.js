module.exports = (req, res, next) => {
    if (!req.body.id && !req.body.password) {
        res.status(403).end();
    } else {
        next();
    }
}