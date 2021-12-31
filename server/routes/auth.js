const express = require("express");
const verify = require("../config/googleAuth");
let User = require("../config/User");
const crypto = require("crypto");
const { encrypt, decrypt } = require("../config/crypto");

const router = express();
/*
  Description: Logs the User in and gets all the data, terms, courses etc.

  INPUT -> Request body : {
    access_token : ...
  }
  
  OUTPUT -> Response body : {
    msg : ....,
    data: {"2A": {"ECE 205":{"credit":0.5,"data":[["A1",96,45],[..]]}}}
  }
*/
router.post("/login", (req, res) => {
  console.log("jwt_token exists: ", req.cookies["jwt_token"] != undefined);
  console.log(
    "access_token exists: ",
    req.cookies["access_token"] != undefined
  );
  const ivString = crypto.randomBytes(16);

  verify(req)
    .then((response) => {
      console.log("[Authentication Success]: ", response["sub"]);
      // Checking if user exists
      User.findOne({ encGoogleId: response["sub"] }, function (err, user) {
        if (err) {
          console.log("[Error with DB]", err);
        }
        // if no user was found create it
        if (!user) {
          // encrypt the response data before saving it
          user = new User({
            encGoogleId: response["sub"],
            displayName: encrypt(response["name"], ivString),
            firstName: encrypt(response["given_name"], ivString),
            lastName: encrypt(response["family_name"], ivString),
            imgURL: encrypt(response["picture"], ivString),
            ivString: ivString.toString("hex"),
            data: encrypt("[]", ivString)
          });
          user.save((err) => {
            if (err) {
              console.log("[Error Saving User] : ", err);
            } else {
              console.log("[Success Creating User]", user.toString());
            }
          });
        } else {
          console.log("[User Already Exists]");
        }
        // Setting the response
        const ivStringFromDB = user.ivString;
        let userData = {
          firstName: decrypt({ content: user.firstName, iv: ivStringFromDB }),
          lastName: decrypt({ content: user.lastName, iv: ivStringFromDB }),
          imgURL: decrypt({ content: user.imgURL, iv: ivStringFromDB }),
          data: JSON.parse(decrypt({ content: user.data, iv: ivStringFromDB }))
        };
        console.log(userData);
        if (req.body.id_token != undefined) {
          res
            .status(200)
            .cookie("jwt_token", req.body.id_token, {
              maxAge: 86_400_000,
              httpOnly: true,
              sameSite: "none",
              secure: true
            })
            .cookie("access_token", req.body.access_token, {
              maxAge: 86_400_000,
              httpOnly: true,
              sameSite: "none",
              secure: true
            })
            .json({
              msg: "Login was Successfull",
              data: userData
            });
        } else {
          res.status(200).json({
            msg: "Login was Successfull",
            data: userData
          });
        }
      });
    })
    .catch((err) => {
      console.log("[Authentication Faliure] ", err.toString().split(",")[0]);
      let errorData = err.toString().split(",")[0];
      res.status(401).json({
        msg: "Error with logging in and / or retreiving data",
        data: errorData
      });
    });
});

router.post("/logout", async (req, res) => {
  console.log("[SUCCESS] Logged out Successfully");
  res.clearCookie("jwt_token");
  res.clearCookie("access_token");
  res.status(200).json({ msg: "Logged out successfully" });
});
module.exports = router;
