import React, { useEffect, useState } from 'react';
import $ from "jquery"
import './marks-styler.css';

// Nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// components
import Header from './components/header'
import CourseAdder from './components/courseAdder'
import Content from './components/content'
import Overview from './components/overview'
import Adder from './components/adder'
import Assessments from './components/assessments'

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


function App() {
  const [data, setData] = useState({});
  const [totalAvg, setTotalAvg] = useState(0);
  const [selectedCourse, setSelected] = useState("");
  const [courseAddBool, setCourseBool] = useState(false);
  const gpaScale = [
    {0:"0.00"},
    {56: "1.30"},
    {60: "1.70"},
    {63: "2.00"},
    {67: "2.30"},
    {70: "2.70"},
    {73: "3.00"},
    {77: "3.30"},
    {80: "3.70"},
    {85: "3.90"},
    {90: "4.00"},
    {100: "4.00"},
  ]
  useEffect(async () => {
    $.get("https://gitlab.com/api/v4/projects/23578539/repository/files/data%2Ejson/raw?ref=master", function (data) {
      setData(JSON.parse(data))

    });
  }, [])

  function getGpa(percentage) {
    if(percentage == 100){
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
    console.log(course);
    // loop through all courses to remove class
    for (let course in data) {
      document.getElementById(course).classList = "content-course";
  }
    document.getElementById(course).classList = "content-dipped";
    setSelected(course);
  }

  function setCourseBoolHelper() {
    setCourseBool(!courseAddBool);
  }

  function updateJson(json) {
    NProgress.start();
    document.getElementById("header-add-course").classList.add("hide");
    setData(json);
    // Make a post request to the Java backend
    let ip = "192.168.0.49";
    const XHR = new XMLHttpRequest();
    let newForm = new FormData();
    newForm.append("dataJson", JSON.stringify(json));

    XHR.open('POST', "/update");
    XHR.send(newForm);
    XHR.onreadystatechange = function () {
      if (XHR.readyState == XMLHttpRequest.DONE) {
        NotificationManager.success(XHR.responseText);
        $.get("https://gitlab.com/api/v4/projects/23578539/repository/files/data%2Ejson/raw?ref=master", function (data) {
          setData(JSON.parse(data))
          NProgress.done();
          document.getElementById("header-add-course").classList.remove("hide");
        });
      }
    }
  }
  return (
    <div className="App">
      <Header
        setCourseBoolHelper={setCourseBoolHelper}
        
      />
      <CourseAdder
        courseAddBool={courseAddBool}
        updateJson={updateJson}
        data={data}
      />
      <Content
        data={data}
        setSelHelper={setSelHelper}
        totalAvg={totalAvg}
      />
      <Overview
        data={data}
        selected={selectedCourse}
        getGpa={getGpa}
      />
      <Adder
        data={data}
        selected={selectedCourse}
        updateJson={updateJson}
      />
      <Assessments
        data={data}
        selected={selectedCourse}
        updateJson={updateJson}
      />
    </div>
  );
}

export default App;
