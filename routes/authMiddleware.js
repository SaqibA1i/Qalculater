module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({ "status": 400, "msg": 'You are not logged in' });
    }
}
