import React, { useEffect, useState } from 'react';

function Register() {
    const [loginMsg, setMsg] = useState("");
    function submit() {
        fetch('/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ "uname": "irs", "pw": "rest" })
        })
            .then((result) => result.json())
            .then((info) => { setMsg(info.msg); })
    }
    return (
        <div className="login-form">
            <h1>Register Page</h1>
            <div style={(loginMsg === "") ? ({ "display": "none" }) : ({ "display": "block" })} class="login-message-failure">
                {loginMsg}
            </div>
            <div id="login-submit">
                Enter Username:
                <br />
                <input type="text" id="reg-name" />
                <br />
                Enter Password:
                <br />
                <input id="reg-pass" type="password" />
                <br />
                <button class="login-submit" onClick={submit} >
                    Submit
                </button>
            </div>
        </div >
    )

}

export default Register;