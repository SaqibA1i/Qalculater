import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { currSelection, User } from "../../TS types/Types";
import axios from "axios";
import { useQalcContext } from "../../context/qalculaterContext";
import googleIcon from "../../images/google.png";
import { SpinnerInfinity } from "spinners-react";
import { store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";
function UserLogin() {
  const [loading, setLoading] = useState<boolean>(false);

  const { setUserInfo, setAuthenticated, setSelection } = useQalcContext()!;
  let bubbles: any = [];
  const addBubbles = () => {
    for (let i = 0; i < 100; i++) {
      bubbles.push(<div key={i} className="bubble"></div>);
    }
    return bubbles;
  };
  const onSuccess = (res: any) => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_PROXY + "auth/login",
      timeout: 10000, // 10 seconds timeout
      withCredentials: true,
      data: {
        id_token: res.tokenObj.id_token,
        access_token: res.tokenObj.access_token
      }
    })
      .then((responseJson) => {
        let response: User = responseJson.data.data;
        // console.log(response);

        setAuthenticated(true);

        setUserInfo(response);
        // Deal with the Current Term and Course
        let currTerm: string | null = localStorage.getItem("currentTerm");
        let currCourse: string | null = localStorage.getItem("currentCourse");

        let tempSel: currSelection = {
          currTerm: currTerm !== null ? currTerm : "undefined",
          currCourse: currCourse !== null ? currCourse : "undefined"
        };

        if (currTerm === null && response.data.length !== 0) {
          // getting the first term in the data array
          tempSel.currTerm = Object.keys(response.data[0])[0];
          tempSel.currCourse = "undefined";
        } else if (response.data.length === 0) {
          tempSel.currTerm = "undefined";
          tempSel.currCourse = "undefined";
        }

        // local storage is either a term or its an undefined string
        setSelection(tempSel);
        setLoading(false);
        store.addNotification({
          title: "Login",
          message: "Success!",
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
        setLoading(false);
        console.log(err.toString());
        setAuthenticated(false);
        store.addNotification({
          title: "Login",
          message: JSON.stringify(err),
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        });
      });
  };

  const onFaliure = (res: any) => {
    setLoading(false);
    store.addNotification({
      title: "Login",
      message: JSON.stringify(res),
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  };
  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID!}
        buttonText="Login"
        onRequest={() => setLoading(true)}
        onSuccess={onSuccess}
        onFailure={onFaliure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <div className="login">
            <div className="top-section">
              <h1>Welcome to the grades app!</h1>
              <svg
                id="wave"
                style={{ transform: "rotate(180deg)", transition: "0.3s" }}
                viewBox="0 0 1440 100"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="sw-gradient-0"
                    x1="0"
                    x2="0"
                    y1="1"
                    y2="0"
                  >
                    <stop
                      stopColor="rgba(0, 89, 255, 0.8156862745098039)"
                      offset="0%"
                    ></stop>
                    <stop
                      stopColor="rgba(0, 178.689, 255, 0.8156862745098039)"
                      offset="100%"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  style={{ transform: "translate(0, 0px)", opacity: 1 }}
                  fill="url(#sw-gradient-0)"
                  d="M0,0L13.3,1.7C26.7,3,53,7,80,15C106.7,23,133,37,160,40C186.7,43,213,37,240,33.3C266.7,30,293,30,320,25C346.7,20,373,10,400,13.3C426.7,17,453,33,480,41.7C506.7,50,533,50,560,43.3C586.7,37,613,23,640,16.7C666.7,10,693,10,720,18.3C746.7,27,773,43,800,51.7C826.7,60,853,60,880,61.7C906.7,63,933,67,960,66.7C986.7,67,1013,63,1040,63.3C1066.7,63,1093,67,1120,61.7C1146.7,57,1173,43,1200,40C1226.7,37,1253,43,1280,40C1306.7,37,1333,23,1360,15C1386.7,7,1413,3,1440,11.7C1466.7,20,1493,40,1520,50C1546.7,60,1573,60,1600,55C1626.7,50,1653,40,1680,33.3C1706.7,27,1733,23,1760,26.7C1786.7,30,1813,40,1840,40C1866.7,40,1893,30,1907,25L1920,20L1920,100L1906.7,100C1893.3,100,1867,100,1840,100C1813.3,100,1787,100,1760,100C1733.3,100,1707,100,1680,100C1653.3,100,1627,100,1600,100C1573.3,100,1547,100,1520,100C1493.3,100,1467,100,1440,100C1413.3,100,1387,100,1360,100C1333.3,100,1307,100,1280,100C1253.3,100,1227,100,1200,100C1173.3,100,1147,100,1120,100C1093.3,100,1067,100,1040,100C1013.3,100,987,100,960,100C933.3,100,907,100,880,100C853.3,100,827,100,800,100C773.3,100,747,100,720,100C693.3,100,667,100,640,100C613.3,100,587,100,560,100C533.3,100,507,100,480,100C453.3,100,427,100,400,100C373.3,100,347,100,320,100C293.3,100,267,100,240,100C213.3,100,187,100,160,100C133.3,100,107,100,80,100C53.3,100,27,100,13,100L0,100Z"
                ></path>
              </svg>
            </div>
            <div className="bottom-section">
              <button onClick={renderProps.onClick}>
                {!loading ? (
                  <>
                    <img src={googleIcon} />
                    Sign in
                  </>
                ) : (
                  <SpinnerInfinity style={{ margin: "0 auto" }} size={100} />
                )}
              </button>
            </div>
          </div>
        )}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default UserLogin;
