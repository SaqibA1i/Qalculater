module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log({ "status":400,msg: 'You are not authorized to view this resource' });
        res.redirect("/login")
    }
}
