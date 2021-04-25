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
            <h1>Login Page</h1>
            <div style={(loginMsg === "") ? ({ "display": "none" }) : ({ "display": "block" })} class="login-message-failure">
                {loginMsg}
            </div>
            <div id="login-submit">
                Enter Username:
                <br />
                <input type="text" id="uname" />
                <br />
                Enter Password:<br />
                <input id="pw" type="password" />
                <br />
                <button class="login-submit" onClick={submit} >
                    Submit
                </button>
            </div>
        </div >
    )

}

export default Login;