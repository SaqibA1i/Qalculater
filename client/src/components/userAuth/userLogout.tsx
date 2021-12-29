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
    clientId: process.env.REACT_APP_CLIENT_ID!
  });
  const { setAuthenticated } = useQalcContext()!;
  const logout = () => {
    setLoading(true);
    signOut();
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_PROXY! + "auth/logout",
      timeout: 10000, // 10 seconds timeout
      withCredentials: true
    })
      .then(async (res) => {
        console.log(res);
        setLoading(false);
        setAuthenticated(false);

        store.addNotification({
          title: "Logout",
          message: "You have successfully logged out",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        window.location.href = "/";
        // store.addNotification({
        //   title: "Logout",
        //   message: err.message,
        //   type: "danger",
        //   insert: "top",
        //   container: "top-center",
        //   animationIn: ["animate__animated", "animate__fadeIn"],
        //   animationOut: ["animate__animated", "animate__fadeOut"],
        //   dismiss: {
        //     duration: 9000,
        //     onScreen: true
        //   }
        // });
      });
  };

  return (
    <div>
      {!loading ? (
        <div className="logout-account-settings" onClick={logout}>
          <Lock size={30} color={"#fff"} />
          <h6>Logout</h6>
        </div>
      ) : (
        <SpinnerInfinity style={{ margin: "0 auto" }} size={100} />
      )}
    </div>
  );
}

export default UserLogout;
