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

                res.redirect('/login');
            }
            else {
                res.send({ "msg": `The user by the name ${newUser.username} already exists!` })
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
/**
* -------------- GET ROUTES ----------------
*/

router.get('/', isAuth, (req, res, next) => {
    res.redirect('http://localhost:3000');
});

// When you visit http://localhost:5000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {


    // const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    // Enter Username:<br><input type="text" name="uname">\
    // <br>Enter Password:<br><input type="password" name="pw">\
    // <br><br><input type="submit" value="Submit"></form>';

    // res.send(form);
    res.redirect('http://localhost:3000/login');

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {
    res.redirect('http://localhost:3000/register');
});
/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it');
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
                    "data": user.data
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
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send({ "status": 200, "msg": `Login Successful` })
    console.log(req);
});

router.get('/login-failure', (req, res, next) => {
    res.send({ "msg": `The username or passeord entered are in correct, please try again` })
});

module.exports = router;