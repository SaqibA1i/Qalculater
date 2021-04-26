import React, { useEffect, useState } from 'react';

function Login() {
    const [loginMsg, setMsg] = useState("");
    function submit() {
        fetch('/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "uname": document.getElementById("uname").value,
                    "pw": document.getElementById("pw").value
                })
        })
            .then((result) => result.json())
            .then((info) => {
                if (info.status == 200) {
                    window.location.href = "/user"
                }
                else {

                    setMsg(info.msg);
                }
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