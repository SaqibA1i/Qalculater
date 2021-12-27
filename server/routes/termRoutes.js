const express = require("express");
const User = require("../config/User");
const { verify, revoke } = require("../config/googleAuth");
const termRoutes = express();

/*
  Description: Gets all the data, terms, courses etc.

  INPUT -> Request body : {
    access_token : ...,
    termName : "2A"
  }
  
  OUTPUT -> Response body : {
    msg : ....,
    data: {"2A": {"ECE 205":{"credit":0.5,"data":[["A1",96,45],[..]]}}}
  }
*/

termRoutes.get("/get", (req, res) => {
  console.log("[Data Requested]");
  // AUTHENTICATING THE TOKEN SENT
  verify(req)
    .then((response) => {
      console.log("[Authentication Success] : ", response["sub"]);
      // Checking if user exists
      User.findOne({ googleId: response["sub"] }, function (err, user) {
        if (err) {
          console.log("[Error with DB]", err);
          res.locals.error = false;
        }
        // if no user was found create it
        if (!user) {
          console.log("[Creating User]");
          user = new User({
            googleId: response["sub"],
            displayName: response["name"],
            firstName: response["given_name"],
            lastName: response["family_name"],
            imgURL: response["picture"],
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
        let userInfo = {
          firstName: user.firstName,
          lastName: user.lastName,
          imgURL: user.imgURL,
          data: JSON.parse(user.data),
        };
        res.status(200).json({
          msg: "Data successfully fetched",
          data: JSON.parse(userInfo),
        });
      });
    })
    .catch((err) => {
      console.log("[Authentication Faliure] ", err.toString().split(",")[0]);
      res.locals.data = err.toString().split(",")[0];
      res.status(401).json({ msg: "Error retrieving data." });
    });
});
/*
  Description: Updates data. Any modifications to terms, courses
                assignments, etc. go through this route!

  INPUT -> Request body : {
    access_token : ...,
    termName : "2A"
  }
  
  OUTPUT -> Response body : {
    msg : ....
    data: {"2A": {}}
  }
*/
termRoutes.post("/update", (req, res) => {
  verify(req)
    .then((response) => {
      console.log("[Authentication Success] : ", response["sub"]);
      console.log("[Data Sent] : ", req.body.data != undefined);
      // Checking if user exists
      User.findOneAndUpdate(
        { googleId: response["sub"] },
        { data: JSON.stringify(req.body.data) },
        {
          new: true, // returns the updated USer
        }
      )
        .then((response) => {
          console.log("[Success] Data is updated");
          let userInfo = {
            firstName: response["firstName"],
            lastName: response["lastName"],
            imgURL: response["imgURL"],
            data: JSON.parse(response["data"]),
          };
          res.status(200).json({
            msg: "Data Updated",
            data: userInfo,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("[Authentication Faliure] ", err.toString().split(",")[0]);
      // res.locals.data = err.toString().split(",")[0];
      // res.locals.error = true;
      res.status(401).json({ msg: "Error retrieving data." });
    });
});

module.exports = termRoutes;
