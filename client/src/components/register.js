import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { endLoadingAnim, startLoadingAnim } from '../App';

import { useHistory } from 'react-router-dom'
// Nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function Register() {
    const [loginMsg, setMsg] = useState("");
    const history = useHistory();
    function submit() {
        let username = document.getElementById("reg-name").value.toLowerCase();
        let password = document.getElementById("reg-pass").value;
        if (username == "" || password == "") {
            NotificationManager.error("Empty Fields", "Error", 1000);
        }
        else if (password.length < 6) {
            NotificationManager.error("Password length must be 6 characters", "Too small", 2000);
        }
        else {
            let register = {
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
            startLoadingAnim();
            axios(register)
                .then((info) => {
                    history.push("/login");
                    NotificationManager.success("Successfully registered, now login", "", 1000);
                })
                .catch((err) => {
                    NProgress.done();
                    NotificationManager.error("user already exists", "Error", 1000);
                })

            endLoadingAnim();
        }

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