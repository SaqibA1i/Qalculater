import React, { useEffect, useState } from 'react';
import $ from "jquery"
import './scss/marks-styler.scss';

import {
  Switch,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

// Nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// components
import Header from './components/header'
import Content from './components/content'
import Overview from './components/overview'
import Assessments from './components/assessments'
import Login from './components/login'
import Register from './components/register'

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function App() {
  const [data, setData] = useState({});
  const [totalAvg, setTotalAvg] = useState(0);
  const [selectedCourse, setSelected] = useState("");
  const [color, setColor] = useState("");
  const [assessTotal, setTotal] = useState({});
  const [authenticated, setAuth] = useState(false);

  const [currUser, setCurr] = useState("");

  const gpaScale = [
    { 0: "0.00" },
    { 56: "1.30" },
    { 60: "1.70" },
    { 63: "2.00" },
    { 67: "2.30" },
    { 70: "2.70" },
    { 73: "3.00" },
    { 77: "3.30" },
    { 80: "3.70" },
    { 85: "3.90" },
    { 90: "4.00" },
    { 100: "4.00" },
  ]
  useEffect(async () => {
    if (document.getElementById("header-add-course") != null) {
      NProgress.start();
      document.getElementById("header-add-course").classList.add("hide");
    }
    fetch('/userData', {
      method: "GET",
    })
      .then((result) => result.json())
      .then((info) => {
        if (info.status != 200) {
          NotificationManager.info(info.msg);
          setAuth(false);
          if (!window.location.href.includes("login") && !window.location.href.includes("register")) {
            window.location.href = 'login';
          }
        }
        else {
          NProgress.done();
          setCurr(info.username);
          document.getElementById("header-add-course").classList.remove("hide");
          
          setAuth(true);
          let data = JSON.parse(info.data);
          setData(data);
          let asTotal = {};
          let totalA = 0;
          for (let selected in data) {
            let total = 0;
            let courseCompletion = 0;
            let assessments = data[selected] != null ? data[selected] : [];
            assessments.map(assessment => {
              courseCompletion += assessment[2]
              total += ((assessment[1] / 100) * assessment[2]);
            })
            total /= courseCompletion;
            total *= 100;
            // set color
            let className = ""
            let newGpa = getGpa(total);
            if (newGpa >= 3.90) {
              className = "awesome";
            } else if (newGpa >= 3.70) {
              className = "good";
            } else if (newGpa >= 3.3) {
              className = "okay";
            } else {
              className = "bad";
            }
            asTotal[selected] = [total.toPrecision(4), className];
            if (selected == "ECE 109") {
              totalA += total * 0.5;
            }
            else {
              totalA += total;
            }
          }
          setTotal(asTotal);
          setTotalAvg((totalA / 5.5).toPrecision(4));
        }
      })

  }, data)

  function getGpa(percentage) {
    if (percentage == 100) {
      return "4.00";
    }
    for (let i = 0; i < gpaScale.length - 1; i++) {
      let firstKey = parseInt(Object.keys(gpaScale[i])); //56
      let secondKey = parseInt(Object.keys(gpaScale[i + 1]));//60
      if (percentage >= firstKey && percentage < secondKey) {
        return gpaScale[i][firstKey];
      }
    }
    return gpaScale[percentage];
  }
  function setSelHelper(course) {
    // loop through all courses to remove class
    for (let crse in data) {
      document.getElementById(crse).classList.remove("content-dipped");
    }
    document.getElementById(course).classList.add("content-dipped");
    setSelected(course);
  }


  function updateJson(json) {
    NProgress.start();
    document.getElementById("header-add-course").classList.add("hide");

    fetch('/update', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          "data": JSON.stringify(json),
        })
    })
      .then((result) => result.json())
      .then((info) => {
        if (info.status == 200) {
          NProgress.done();
          document.getElementById("header-add-course").classList.remove("hide");
          setData(json);
          let asTotal = {};
          let totalA = 0;
          for (let selected in data) {
            let total = 0;
            let courseCompletion = 0;
            let assessments = data[selected] != null ? data[selected] : [];
            assessments.map(assessment => {
              courseCompletion += assessment[2]
              total += ((assessment[1] / 100) * assessment[2]);
            })
            total /= courseCompletion;
            total *= 100;
            // set color
            let className = ""
            let newGpa = getGpa(total);
            if (newGpa >= 3.90) {
              className = "awesome";
            } else if (newGpa >= 3.70) {
              className = "good";
            } else if (newGpa >= 3.3) {
              className = "okay";
            } else {
              className = "bad";
            }
            asTotal[selected] = [total.toPrecision(4), className];
            if (selected == "ECE 109") {
              totalA += total * 0.5;
            }
            else {
              totalA += total;
            }
          }
          setTotal(asTotal);
          setTotalAvg((totalA / 5.5).toPrecision(4));
        }
        else {
          console.log(JSON.stringify(info))
        }
      })
  }
  return (
    <Router className="App" >
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user" path="/">
          <Header
            totalAvg={totalAvg}
            data={data}
            selected={selectedCourse}
            updateJson={updateJson}
            username={currUser}
          />
          <Content
            data={data}
            setSelHelper={setSelHelper}
            totalAvg={totalAvg}
            color={color}
            asTotal={assessTotal}
          />
          <Overview
            data={data}
            selected={selectedCourse}
            getGpa={getGpa}
            updateJson={updateJson}
          />
          <Assessments
            data={data}
            selected={selectedCourse}
            updateJson={updateJson}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
