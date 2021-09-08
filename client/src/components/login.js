import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

import { endLoadingAnim, startLoadingAnim } from "../App";
// Nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function Login() {
  const [loginMsg, setMsg] = useState("");
  const history = useHistory();
  function submit() {
    let login = {
      url: `${process.env.REACT_APP_SERVER}/login`,
      method: "POST",
      data: {
        uname: document.getElementById("uname").value.toLowerCase(),
        pw: document.getElementById("pw").value,
      },
      withCredentials: true,
    };
    startLoadingAnim();
    axios(login)
      .then((info) => {
        // history.push("/user");
        window.location.href = "/user";
        //NotificationManager.success("Successfully logged in", "", 1000);
      })
      .catch((err) => {
        endLoadingAnim();
        console.log(err);
        NotificationManager.warning(
          "Incorrect username or password",
          "Err",
          2000
        );
      });
  }
  return (
    <div className="login-form">
      <NotificationContainer />
      <p>Qalculater &trade;</p>
      <h1>
        Welcome
        <br />
        Back
        <br />
        <p>
          If using an <b>Apple</b> device please disable "Cross Site tracking"
          from the settings
        </p>
      </h1>
      <div
        style={loginMsg === "" ? { display: "none" } : { display: "block" }}
        class="login-message-failure"
      >
        {loginMsg}
      </div>
      <div id="login-submit">
        <input type="text" placeholder="Username" id="uname" />
        <input id="pw" placeholder="Password" type="password" />
        <br />
        <button class="login-submit" onClick={submit}>
          Login
        </button>
        <p>or</p>
        <button
          class="login-register"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
export default Login;
