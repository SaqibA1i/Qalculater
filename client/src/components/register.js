import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';

// Nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function Register() {
    const [loginMsg, setMsg] = useState("");
    function submit() {

        let login = {
            url: `${process.env.REACT_APP_SERVER}/register`,
            method: "POST",
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data:
            {
                "uname": document.getElementById("reg-name").value.toLowerCase(),
                "pw": document.getElementById("reg-pass").value
            }
        }
        axios(login)
            .then((info) => {
                window.location.href = "/login";
            })
            .catch((err) => {
                NProgress.done();
                NotificationManager.warning("user already exists", "Error", 1000);
            })

    }
    return (
        <div className="login-form">
            <NotificationContainer />
            <p>
                Qalculater &trade;
            </p>
            <h1>Create an <br /> Account</h1>
            <div style={(loginMsg === "") ? ({ "display": "none" }) : ({ "display": "block" })} class="login-message-failure">
                {loginMsg}
            </div>
            <div id="login-submit">
                <input type="text" placeholder="Username" id="reg-name" />
                <input id="reg-pass" placeholder="Password" type="password" />
                <button class="login-submit" onClick={submit} >
                    Register
                </button>
                <p>or</p>
                <button class="login-register" onClick={() => { window.location.href = "/login" }} >
                    Login
                </button>
            </div>
        </div >
    )

}

export default Register;