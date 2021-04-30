import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';


// Nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function Login() {
    const [loginMsg, setMsg] = useState("");
    function submit() {
        let login = {
            url: '/login',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            data:
            {
                "uname": document.getElementById("uname").value.toLowerCase(),
                "pw": document.getElementById("pw").value
            }
        }
        NProgress.start();
        axios(login)
            .then((info) => {
                window.location.href = "/user"
            })
            .catch((err) => {
                NProgress.done();
                NotificationManager.warning("Incorrect username or password", "Try Again", 1000);
            })
    }
    return (
        <div className="login-form">
            <NotificationContainer />
            <p>
                Qalculater &trade;
            </p>
            <h1>
                Welcome
                <br />
                Back
            </h1>
            <div style={(loginMsg === "") ? ({ "display": "none" }) : ({ "display": "block" })} class="login-message-failure">
                {loginMsg}
            </div>
            <div id="login-submit">
                <input type="text" placeholder="Username" id="uname" />
                <input id="pw" placeholder="password" type="password" />
                <br />
                <button class="login-submit" onClick={submit} >
                    Login
                </button>
                <p>or</p>
                <button class="login-register" onClick={() => { window.location.href = "/register" }} >
                    Register
                </button>
            </div>
        </div >
    )

}

export default Login;