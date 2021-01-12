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
  const [selectedCourse, setSelected] = useState("");
  const [courseAddBool, setCourseBool] = useState(false);

  useEffect(async () => {
    $.get("https://gitlab.com/api/v4/projects/23578539/repository/files/data%2Ejson/raw?ref=master", function (data) {
      setData(JSON.parse(data))
    });
  }, [])

  function setSelHelper(course) {
    console.log(course);
    document.getElementById(course).classList.add("selected")
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
      />
      <Overview
        data={data}
        selected={selectedCourse}
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
