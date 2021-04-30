const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const isAuth = require('./authMiddleware').isAuth;
const User = connection.models.User;
/**
 * -------------- POST ROUTES ----------------
 */

// make a post request to login with username and password
//     and the gets intercepted b the passport middleware!
//     validate it and return the done function and goes to
//     the next function
router.post('/login',
    passport.authenticate('local',
        { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pw);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.uname,
        hash: hash,
        salt: salt,
        admin: true
    });
    // Finds the user by that username and checks
    //      if it exists or not
    User.findOne({ username: newUser.username })
        .then((user) => {

            if (!user) {
                newUser.save()
                    .then((user) => {
                        console.log(user);
                    });

                res.send({ "status": 200, "msg": `The user by the name ${newUser.username} has been created!` })
            }
            else {
                res.send({ "status": 500, "msg": `A user by the name ${newUser.username} already exists!` })
            }
        })
        .catch((err) => {
            done(err);
        });

});

// receives the updated user marks data and stores in the database
router.post('/update', isAuth, (req, res, next) => {
    let userId = req.session.passport.user;
    User.findById(userId)
        .then((user) => {
            if (user != null) {
                user.data = req.body.data;
                user.save(); // updates the user in the db
                res.send({ "status": 200, "msg": "Successfully updated" });
            }
            else {
                res.send({ "status": 500, "msg": "The user doesnt exist" });
            }
        })
        .catch(err => done(err))
});

router.post('/updateTerm', isAuth, (req, res, next) => {
    let userId = req.session.passport.user;
    User.findById(userId)
        .then((user) => {
            if (user != null) {
                user.currTerm = req.body.currTerm;
                user.save(); // updates the user in the db
                res.send({ "status": 200, "msg": "Successfully updated" });
            }
            else {
                res.send({ "status": 500, "msg": "The user doesnt exist" });
            }
        })
        .catch(err => done(err))
});
/**
* -------------- GET ROUTES ----------------
*/

router.get('/', isAuth, (req, res, next) => {
    res.send({
        "status": 200,
        "msg": "You have successfully logged in"
    });
});

// getting all the mark data from the user
router.get('/userData', isAuth, (req, res, next) => {
    console.log("GET userData Success");
    // send users marks data
    let userId = req.session.passport.user;
    User.findById(userId)
        .then((user) => {
            if (user != null) {
                console.log("SUCCESS: user data sent successfully");
                res.send({
                    "status": 200,
                    "msg": "user data sent successfully",
                    "currTerm": user.currTerm,
                    "data": user.data,
                    "username": user.username
                });
            }
            else {
                console.log("ERROR: user data not sent successfully");
                res.send({
                    "status": 500,
                    "msg": "user data not sent successfully",
                    "data": "{}"
                });
            }
        })
        .catch(err => done(err))
})

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.send({ "status": 200, "msg": "You have logged out successfully" });
});

router.get('/login-success', (req, res, next) => {
    res.send({ "status": 200, "msg": `Login Successful` })
});

router.get('/login-failure', (req, res, next) => {
    res.send({ "msg": `The username or password entered are in correct, please try again` })
});

module.exports = router;