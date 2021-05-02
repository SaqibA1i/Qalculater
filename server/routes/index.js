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
//     and the gets intercepted by the passport middleware!
//     validate it and return the done function and goes to
//     the next function

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(401).json({ msg: `username / password in correct` })
        };
        if (!user) {
            console.log("User doesnt exist")
            res.status(500).json({ msg: `User doesnt exist` })
        }
        else {
            req.logIn(user, async (err) => {
                if (err) throw err;
                req.session.save();
                await req.session.save();
                res.status(200).json({ msg: `Login Successful` })
                console.log("LOGIN success")
            });
        }
    })
        (req, res, next);
})

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

            console.log("Register success");
            if (!user) {
                newUser.data = "{}";
                newUser.currTerm = "";
                newUser.save()
                    .then((user) => {
                        console.log(user);
                    });

                res.status(200).json({ msg: `The user by the name ${newUser.username} has been created!` })
            }
            else {
                res.status(500).json({ msg: `A user by the name ${newUser.username} already exists!` })
            }
        })
        .catch((err) => {
            console.log(err);
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
                res.status(200).json({ msg: "Successfully updated" });
                console.log("UPDATE: ");
                console.log(user);
            }
            else {
                console.log("UPDATE: user does not exist");
                res.status(500).json({ msg: "The user doesnt exist" });
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
                res.status(200).json({ msg: "Successfully updated" });
            }
            else {

                res.status(500).json({ msg: "User doesnt exist" });
            }
        })
        .catch(err => done(err))
});
/**
* -------------- GET ROUTES ----------------
*/


// getting all the mark data from the data base
router.get('/data', async (req, res, next) => {
    console.log(req.session);
    if (await req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not logged in' });
        console.log('You are not logged in');
    }
}
    , (req, res, next) => {
        console.log("GET userData Success");
        // send users marks data
        let userId = req.session.passport.user;
        User.findById(userId)
            .then((user) => {
                if (user != null) {
                    console.log("SUCCESS: user data sent successfully");

                    res.status(200).json({
                        msg: "user data sent successfully",
                        currTerm: user.currTerm,
                        data: user.data,
                        username: user.username
                    });
                }
            })
            .catch((err) => {
                console.log("ERROR: user data not sent successfully");
                res.status(500).json({
                    msg: "user data not sent successfully",
                    data: "{}"
                });
            })
    })

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ msg: "You have logged out successfully" });
});


module.exports = router;