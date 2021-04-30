import React, { useEffect, useState, useContext } from 'react';
import $ from "jquery"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
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

// context for the userData
const UserDataContext = React.createContext();

function App() {
  const [data, setData] = useState({});
  const [totalAvg, setTotalAvg] = useState(0);
  const [selectedCourse, setSelected] = useState("");
  const [color, setColor] = useState("");
  const [assessTotal, setTotal] = useState({});
  const [authenticated, setAuth] = useState(false);
  const [termName, setTerm] = useState("");
  const [allUserData, setUserData] = useState({});
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

  const calcAverages = (newData) => {
    // Following just calculates users class Average
    //  and stores it in a state varaible. The JSON
    //  object asTotal is {'courseName': 'courseAverage}
    let asTotal = {};
    let totalA = 0;
    let totalCredits = 0;

    for (let selected in newData) {
      let total = 0;
      let courseCompletion = 0;
      let assessments = [];
      try {
        assessments = newData[selected]["data"];

        // summing for all the assessments in the course
        assessments.map(assessment => {
          courseCompletion += assessment[2]
          total += ((assessment[1] / 100) * assessment[2]);
        })

        // if course completion is zero total is zero so only
        //    proceed if its not
        if (courseCompletion != 0) {
          totalCredits += newData[selected]["credit"];
          total = 100 * (total / courseCompletion);
          // set color
          let className = "";
          let newGpa = getGpa(total);
          // sets the colors according to 
          //    the course GPA
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
          totalA += total * newData[selected]["credit"];
        }
        else {
          asTotal[selected] = 0;
        }
      }
      catch (err) {
        console.log(`JSON STRUCTURE ERROR OR MISSING INFORMATION ${selected}: ` + err);
      }
    }
    setTotal(asTotal);
    setTotalAvg((totalA / totalCredits).toPrecision(4));
    console.log("Averags were succesfully calculated");
  }

  const getUserData = async () => {
    let newData = {};
    await fetch('https://qalculater-backend.herokuapp.com/userData')
      .then((result) => result.json())
      .then((info) => {
        if (info.status != 200) {
          NotificationManager.info(info.msg);
          setAuth(false);
          // The user is not authenticated so return to login window if its not already there
          if (!window.location.href.includes("login") && !window.location.href.includes("register")) {
            window.location.href = 'login';
          }
        }
        else {
          // The userData has been succeffuly fetched
          NProgress.done();
          setCurr(info.username);
          try {
            document.getElementById("header-add-course").classList.remove("hide");
          }
          catch(err){
            console.log("header-add-course doesnt exist")
          }

          setAuth(true);
          newData = JSON.parse(info.data);
          // checking if there is any content in the data
          if (Object.entries(newData).length == 0) {
            setTerm("");
            setUserData({});
          }
          else if (info.currTerm == null) {
            console.log(newData);
            // setting the first course in the list
            //    if there is not one set already
            updateTerm(Object.entries(newData)[0][0]);
            window.location.href = "/";
          }
          else {
            setTerm(info.currTerm);
            setUserData(newData);
            newData = newData[info.currTerm];
            calcAverages(newData);
          }
          console.log("user data was fetched!");
        }
      })
    return newData;
  }

  const setDataHelper = async () => {
    setData(await getUserData());
  }
  useEffect(() => {
    calcAverages(data);
  }, [data])

  useEffect(() => {
    try {
      document.getElementById("header-add-course").classList.add("hide");
      NProgress.start();
    }
    catch (err) {
      console.log("Cant hide the header icon as it doesnt exsit: " + err);
    }
    setDataHelper();
  }, [])

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
    setSelected(course);
  }

  function updateTerm(term) {
    setSelected("");
    NProgress.start();
    document.getElementById("header-add-course").classList.add("hide");
    let newData = allUserData;
    fetch('https://qalculater-backend.herokuapp.com/updateTerm', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          "currTerm": term,
        })
    })
      .then((result) => result.json())
      .then((info) => {
        if (info.status == 200) {
          NProgress.done();
          document.getElementById("header-add-course").classList.remove("hide");

          calcAverages(data);
          setTerm(term);
          setData(allUserData[term]);
        }
        else {
          console.log(JSON.stringify(info))
        }
      })
    console.log("The Term was updated");
  }

  function updateJson(json, bool = false) {
    NProgress.start();
    document.getElementById("header-add-course").classList.add("hide");
    let newData = allUserData;
    if (bool) {
      newData = json;
    }
    else {
      newData[termName] = json;
    }

    fetch('https://qalculater-backend.herokuapp.com//update', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          "data": JSON.stringify(newData),
        })
    })
      .then((result) => result.json())
      .then((info) => {
        if (info.status == 200) {
          NProgress.done();
          document.getElementById("header-add-course").classList.remove("hide");

          calcAverages(data);
          setData({ ...json });
          setUserData({ ...newData });
        }
        else {
          console.log(JSON.stringify(info))
        }
      })
    console.log("The user data was updated");
  }
  return (
    <Router className="App" >
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/">
          <UserDataContext.Provider value={{ data, updateJson, selectedCourse, setSelected, assessTotal, allUserData, termName, updateTerm }}>
            <Header
              currTerm={termName}
              totalAvg={totalAvg}
              username={currUser}
            />
            <Content
              setSelHelper={setSelHelper}
              asTotal={assessTotal}
            />
            <Overview
              getGpa={getGpa}
            />
            <Assessments />
          </UserDataContext.Provider>
          <NotificationContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export { UserDataContext };
export default App;
