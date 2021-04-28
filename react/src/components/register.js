import React, { useEffect, useState } from 'react';

function Register() {
    const [loginMsg, setMsg] = useState("");
    function submit() {
        fetch('/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "uname": document.getElementById("reg-name").value.toLowerCase(),
                    "pw": document.getElementById("reg-pass").value
                })
        })
            .then((result) => result.json())
            .then((info) => {
                if (info.status == 200) {
                    window.location.href = "/login";
                }
                else {
                    setMsg(info.msg);
                };
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