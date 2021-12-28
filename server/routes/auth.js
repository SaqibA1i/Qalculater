const express = require("express");
const { verify, revoke } = require("../config/googleAuth");
let User = require("../config/User");

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
  verify(req)
    .then((response) => {
      console.log("[Authentication Success]: ", response["sub"]);
      // Checking if user exists
      User.findOne({ googleId: response["sub"] }, function (err, user) {
        if (err) {
          console.log("[Error with DB]", err);
        }
        // if no user was found create it
        if (!user) {
          console.log("[Creating User]");
          user = new User({
            googleId: response["sub"],
            displayName: response["name"],
            firstName: response["given_name"],
            lastName: response["family_name"],
            imgURL: response["picture"]
          });
          user.save((err) => {
            if (err) {
              console.log("[Error Saving User] : ", err);
            } else {
              console.log("[Success Creating User]");
            }
          });
        } else {
          console.log("[User Already Exists]");
        }
        // Seting the local response
        let userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          imgURL: user.imgURL,
          data: JSON.parse(user.data)
        };
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
  try {
    let data = await revoke(req);
    if (data.status != 200) {
      throw data.response.error;
    }
    console.log("[SUCCESS] Logged out Successfully");
    res.clearCookie("jwt_token");
    res.clearCookie("access_token");
    res.status(data.status).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.log(" Logging out");
    res.status(400).json({ msg: "" + err });
  }
});
module.exports = router;
