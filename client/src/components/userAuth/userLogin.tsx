import React from "react";
import { GoogleLogin } from "react-google-login";
import { User } from "../../TS types/Types";
import { useQalcContext } from "../../context/qalculaterContext";
const clientId =
  "1067048164987-se3afq5gi10qhdqdr3v67atuur4ggkim.apps.googleusercontent.com";

function UserLogin() {
  const { setUserInfo } = useQalcContext();

  const onSuccess = (res: any) => {
    localStorage.setItem("profile", JSON.stringify(res.profileObj));
    let responseObj: any = res.profileObj;
    let newUser: User = {
      firstName: res.profileObj["name"],
      lastName: responseObj["familyName"],
      imgURL: responseObj["imageUrl"],
    };

    console.log("[Login Succes] currentUser:", newUser);
    console.log(res.tokenObj.id_token);
    setUserInfo!(newUser);
  };

  const onFaliure = (res: any) => {
    console.log("Login Faliure response:", res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFaliure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default UserLogin;
