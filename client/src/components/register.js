import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Register() {
    const [loginMsg, setMsg] = useState("");
    function submit() {

        let login = {
            url: 'https://qalculater-backend.herokuapp.com/register',
            method: "POST",
            headers: {
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
                console.log(info)
            })

    }
    return (
        <div className="login-form">
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