const { OAuth2Client, auth } = require("google-auth-library");
require("dotenv").config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("./User");

async function verify(req) {
  const ticket = await client.verifyIdToken({
    idToken:
      req.cookies["jwt_token"] != undefined
        ? req.cookies["jwt_token"]
        : req.body.id_token,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload;
}

async function revoke(req) {
  client.revokeCredentials;
  const accessRevoke = await client.revokeToken(req.cookies["access_token"]);
  return accessRevoke;
}
module.exports = { verify, revoke };
