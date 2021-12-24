import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "1067048164987-se3afq5gi10qhdqdr3v67atuur4ggkim.apps.googleusercontent.com";

function UserLogout() {
  const onSuccess = () => {
    console.log("[Logout Succes]");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default UserLogout;
