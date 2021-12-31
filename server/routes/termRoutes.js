const express = require("express");
const User = require("../config/User");
const verify = require("../config/googleAuth");
const termRoutes = express();
const { encrypt, decrypt, hexToCrypto } = require("../config/crypto");

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
      console.log("[Authentication Success]");
      console.log("[Data Sent] : ", req.body.data != undefined);
      // Checking if user exists
      User.findOne({ encGoogleId: response["sub"] }).then((response2) => {
        User.findOneAndUpdate(
          { encGoogleId: response["sub"] },
          {
            data: encrypt(
              JSON.stringify(req.body.data),
              hexToCrypto(response2["ivString"])
            )
          },
          {
            new: true // returns the updated USer
          }
        )
          .then((response) => {
            console.log("[Success] Data is updated");
            let userInfo = {
              firstName: decrypt({
                content: response["firstName"],
                iv: response["ivString"]
              }),
              lastName: decrypt({
                content: response["lastName"],
                iv: response["ivString"]
              }),
              imgURL: decrypt({
                content: response["imgURL"],
                iv: response["ivString"]
              }),
              data: JSON.parse(
                decrypt({ content: response["data"], iv: response["ivString"] })
              )
            };
            res.status(200).json({
              msg: "Data Updated",
              data: userInfo
            });
          })
          .catch((err) => {
            console.log(err);
          });
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
