import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [bubbles, setBubbles] = useState<any>([]);
  const { setUserInfo, setAuthenticated, setSelection } = useQalcContext()!;

  const onSuccess = (res: any) => {
    setAuthenticated(true);
    axios({
      method: "post",
      url: process.env.REACT_APP_SERVER_PROXY + "auth/login",

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
    setAuthenticated(false);
    store.addNotification({
      title: "Login",
      message: res.message,
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true
      }
    });
  };

  useEffect(() => {
    let tempBubbles = [];
    for (let i = 0; i < 100; i++) {
      tempBubbles.push(<div key={i} className="bubble"></div>);
    }
    setBubbles(tempBubbles);
  }, []);

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID!}
        buttonText="Login"
        onRequest={() => {
          console.log("requesting");
          setLoading(true);
        }}
        onAutoLoadFinished={(isLoggedIn) => {
          console.log("isLoggedIn", isLoggedIn);
          if (!isLoggedIn) {
            setLoading(false);
          }
        }}
        onSuccess={onSuccess}
        onFailure={onFaliure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <div className="login">
            <div className="top-section">
              <div className="bubble-container">
                <div className="bubble-wrap">{bubbles}</div>
              </div>
              <h1>
                Welcome to the grades app!
                <p>
                  <b>Note:</b> If using Apple devices make sure{" "}
                  <b style={{ border: 0 }}>"prevent cross-site tracking"</b> is
                  disabled for this site.
                </p>
              </h1>

              <svg
                id="wave"
                style={{ transform: "rotate(180deg)", transition: "0.3s" }}
                viewBox="0 0 1440 110"
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
                    <stop stopColor="rgba(44, 119, 255, 1)" offset="0%"></stop>
                    <stop
                      stopColor="rgba(97.563, 194.139, 227.362, 1)"
                      offset="100%"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  style={{ transform: "translate(0, 0px)", opacity: 1 }}
                  fill="url(#sw-gradient-0)"
                  d="M0,66L40,71.5C80,77,160,88,240,78.8C320,70,400,40,480,29.3C560,18,640,26,720,33C800,40,880,48,960,58.7C1040,70,1120,84,1200,78.8C1280,73,1360,48,1440,44C1520,40,1600,59,1680,71.5C1760,84,1840,92,1920,82.5C2000,73,2080,48,2160,33C2240,18,2320,15,2400,16.5C2480,18,2560,26,2640,29.3C2720,33,2800,33,2880,44C2960,55,3040,77,3120,82.5C3200,88,3280,77,3360,66C3440,55,3520,44,3600,33C3680,22,3760,11,3840,9.2C3920,7,4000,15,4080,25.7C4160,37,4240,51,4320,58.7C4400,66,4480,66,4560,56.8C4640,48,4720,29,4800,20.2C4880,11,4960,11,5040,16.5C5120,22,5200,33,5280,34.8C5360,37,5440,29,5520,31.2C5600,33,5680,44,5720,49.5L5760,55L5760,110L5720,110C5680,110,5600,110,5520,110C5440,110,5360,110,5280,110C5200,110,5120,110,5040,110C4960,110,4880,110,4800,110C4720,110,4640,110,4560,110C4480,110,4400,110,4320,110C4240,110,4160,110,4080,110C4000,110,3920,110,3840,110C3760,110,3680,110,3600,110C3520,110,3440,110,3360,110C3280,110,3200,110,3120,110C3040,110,2960,110,2880,110C2800,110,2720,110,2640,110C2560,110,2480,110,2400,110C2320,110,2240,110,2160,110C2080,110,2000,110,1920,110C1840,110,1760,110,1680,110C1600,110,1520,110,1440,110C1360,110,1280,110,1200,110C1120,110,1040,110,960,110C880,110,800,110,720,110C640,110,560,110,480,110C400,110,320,110,240,110C160,110,80,110,40,110L0,110Z"
                ></path>
              </svg>
            </div>
            <div className="bottom-section">
              {!loading ? (
                <button onClick={renderProps.onClick}>
                  <img src={googleIcon} />
                  Sign in
                </button>
              ) : (
                <SpinnerInfinity style={{ margin: "0 auto" }} size={100} />
              )}
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
