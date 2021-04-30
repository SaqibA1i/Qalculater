import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
    const [loginMsg, setMsg] = useState("");
    function submit() {
        let login = {
            url: 'https://qalculater-backend.herokuapp.com/login',
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
        axios(login)
            .then((info) => {
                console.log(info)
            })
    }
    return (
        <div className="login-form">
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