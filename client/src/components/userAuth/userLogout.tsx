import React, { useState } from "react";
import { SpinnerInfinity } from "spinners-react";
import { store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";
import { useQalcContext } from "../../context/qalculaterContext";
import { Lock } from "react-bootstrap-icons";
import axios from "axios";
import { useGoogleLogout } from "react-google-login";
function UserLogout() {
  const [loading, setLoading] = useState<boolean>(false);
  const { signOut, loaded } = useGoogleLogout({
    clientId: process.env.REACT_APP_CLIENT_ID!,
  });
  const { setAuthenticated } = useQalcContext()!;
  const logout = () => {
    setLoading(true);
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_PROXY! + "auth/logout",
      timeout: 10000, // 10 seconds timeout
      withCredentials: true,
    })
      .then(async (res) => {
        console.log(res);
        signOut();
        setLoading(false);
        setAuthenticated(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="logout-account-settings" onClick={logout}>
        {!loading ? (
          <>
            <Lock size={30} color={"#fff"} />
            <h6>Logout</h6>
          </>
        ) : (
          <SpinnerInfinity style={{ margin: "0 auto" }} size={100} />
        )}
      </div>
    </div>
  );
}

export default UserLogout;
